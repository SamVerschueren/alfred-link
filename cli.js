#!/usr/bin/env node
'use strict';
const alfyLink = require('./');

alfyLink().catch(err => {
	console.error(err);
	process.exit(1);
});
