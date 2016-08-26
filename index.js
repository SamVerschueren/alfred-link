'use strict';
const path = require('path');
const fs = require('fs');
const pathExists = require('path-exists');
const pkgUp = require('pkg-up');
const pify = require('pify');
const del = require('del');
const resolveAlfredPrefs = require('resolve-alfred-prefs');
const plistTransform = require('./lib/plist-transform');

const fsP = pify(fs);

module.exports = () => {
	const cwd = process.cwd();

	let workflowDir;

	return resolveAlfredPrefs()
		.then(prefs => {
			workflowDir = path.join(prefs, 'workflows');

			return pathExists(workflowDir);
		})
		.then(exists => {
			if (!exists) {
				throw new Error(`Workflow directory \`${workflowDir}\` does not exist`);
			}

			return pkgUp(cwd);
		})
		.then(filePath => {
			const pkg = require(filePath);

			const src = path.dirname(filePath);
			const dest = path.join(workflowDir, pkg.name);

			return plistTransform(path.dirname(filePath), pkg)
				.then(() => del(dest, {force: true}))
				.then(() => fsP.symlink(src, dest));
		});
};
