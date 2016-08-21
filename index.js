'use strict';
const path = require('path');
const fs = require('fs');
const userHome = require('user-home');
const pathExists = require('path-exists');
const pkgUp = require('pkg-up');
const pify = require('pify');
const del = require('del');
const plistTransform = require('./lib/plist-transform');

const fsP = pify(fs);
const workflowDir = path.join(userHome, 'Library/Application Support/Alfred 3/Alfred.alfredpreferences/workflows');

module.exports = () => {
	const cwd = process.cwd();

	return pathExists(workflowDir)
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
