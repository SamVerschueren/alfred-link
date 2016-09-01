#!/usr/bin/env node
'use strict';
const alfyLink = require('./');

// Check if installed with the `--global` flag
if (process.env.npm_config_global === 'true') {
	alfyLink().catch(err => {
		console.error(err);
		process.exit(1);
	});
}
