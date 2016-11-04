'use strict';
const fs = require('fs');
const path = require('path');

module.exports = (workflowPath, dir) => {
	const info = fs.readFileSync(path.join(workflowPath, 'info.plist'));

	console.log(info);

	return Promise.resolve();
};
