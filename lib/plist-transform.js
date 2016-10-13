'use strict';
const path = require('path');
const fs = require('fs');
const plist = require('plist');
const Case = require('change-case');
const pify = require('pify');

const fsP = pify(fs);

// Fixes some inconsistencies when running `plist.parse`
// https://github.com/TooTallNate/plist.js/issues/75
const fix = obj => {
	for (const key of Object.keys(obj)) {
		const val = obj[key];

		if (val === null || val === undefined) {
			obj[key] = '';
		} else if (Array.isArray(val)) {
			obj[key] = val.map(fix);
		} else if (typeof val === 'object') {
			obj[key] = fix(val);
		}
	}

	return obj;
};

module.exports = (dir, pkg) => {
	const file = path.join(dir, 'info.plist');

	return fsP.readFile(file, 'utf8')
		.then(content => {
			const data = fix(plist.parse(content));
			data.version = pkg.version || '';
			data.description = pkg.description || '';
			data.webaddress = pkg.homepage || pkg.author.url || '';
			data.createdby = pkg.author.name || '';

			if (!data.name) {
				const name = pkg.name.replace(/^alfred-/, '');
				data.name = pkg.config.name || Case.title(name) || '';
			}

			if (!data.bundleid) {
				const bundleid = ['com', data.createdby, data.name].map(each =>
					each.replace(/\s+/g, '').toLowerCase()); // Case.param(each));
				data.bundleid = pkg.config.bundleid || bundleid.join('.') || '';
			}

			data.category = data.category || pkg.config.category || '';
			data.variables = data.variables || pkg.config.variables || {};

			if (!data.readme && pkg.config.readme === true) {
				data.readme = pkg.readme;
			} else {
				data.readme = data.readme || pkg.config.readme || ''; // data.description
			}

			return fsP.writeFile(file, plist.build(data));
		});
};
