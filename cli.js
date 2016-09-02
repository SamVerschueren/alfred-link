#!/usr/bin/env node
'use strict';
const alfyLink = require('./');

if (process.env.npm_config_global === '') {
	// Prevent linking if the script was part of a non-global npm (install) command
	process.exit(0);
}

alfyLink().catch(err => {
	console.error(err);
	process.exit(1);
});
