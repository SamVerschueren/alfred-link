'use strict';
const path = require('path');
const pathExists = require('path-exists');
const readPkgUp = require('read-pkg-up');
const resolveAlfredPrefs = require('resolve-alfred-prefs');
const sudoBlock = require('sudo-block');
const plistTransform = require('./lib/plist-transform');
const link = require('./lib/link');

// Prevent running as `sudo`
sudoBlock();

module.exports = opts => {
	const options = Object.assign({
		transform: true
	}, opts);

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

			return readPkgUp(cwd);
		})
		.then(result => {
			const pkg = result.pkg;
			const filePath = result.path;

			const src = path.dirname(filePath);
			const dest = path.join(workflowDir, pkg.name);

			if (!options.transform) {
				return link(src, dest);
			}

			return plistTransform(path.dirname(filePath), pkg)
				.then(() => link(src, dest));
		});
};
