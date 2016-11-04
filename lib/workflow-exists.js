'use strict';
const fs = require('fs');
const path = require('path');
const pify = require('pify');

const fsP = pify(fs);

const nameRegex = /<key>name<\/key>[\s]*<string>(.*?)<\/string>/;

// Extract the workflow name from the `info.plist`
const readName = workflowPath => fsP.readFile(path.join(workflowPath, 'info.plist'), 'utf8')
	.then(contents => nameRegex.exec(contents)[1])
	.catch(err => {
		if (err.code === 'ENOENT') {
			return undefined;
		}

		throw err;
	});

// Get the workflow name and optional `package.json` data
const getWorkflow = p => readName(p)
	.then(name => {
		let pkg;

		try {
			pkg = require(path.join(p, 'package.json'));	// eslint-disable-line import/no-dynamic-require
		} catch (err) { }

		return {
			path: p,
			name,
			pkg
		};
	});

// Retrieve all the data from the installed workflows
const getInstalledWorkflows = dir => fsP.readdir(dir)
	.then(workflows => Promise.all(workflows.map(wf => getWorkflow(path.join(dir, wf)))));

module.exports = (pkgName, workflowPath, workflowsDir) => readName(workflowPath)
	.then(name => {
		return getInstalledWorkflows(workflowsDir)
			.then(workflows => workflows.filter(x => x.name === name && x.pkg && x.pkg.name !== pkgName));
	})
	.then(workflows => {
		if (workflows.length !== 0) {
			throw new Error(`A workflow with the name \`${workflows[0].name}\` already exists at \`${workflows[0].path}\`.`);
		}
	});
