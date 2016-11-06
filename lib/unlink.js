'use strict';
const path = require('path');
const del = require('del');

module.exports = (workflowDir, pkg) => del(path.join(workflowDir, pkg.name), {force: true});
