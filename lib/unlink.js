/* eslint-disable indent */
'use strict';
const path = require('path');
const fs = require('fs');
const del = require('del');
const pify = require('pify');
const userHome = require('user-home');
const resolveAlfredPrefs = require('resolve-alfred-prefs');

const fsP = pify(fs);

const idRegexp = /<key>bundleid<\/key>[\s]*<string>(.*?)<\/string>/;

const alfred3 = [
	'Library/Application Support/Alfred 3/Workflow Data',
	'Library/Caches/com.runningwithcrayons.Alfred-3/Workflow Data'
];

const alfred = [
	'Library/Application Support/Alfred/Workflow Data',
	'Library/Caches/com.runningwithcrayons.Alfred/Workflow Data'
];

// Remove the symlink
const unlink = dir => del(path.join(dir), {force: true});

// Cleanup config and cache data
const cleanup = dir => fsP.readFile(path.join(dir, 'info.plist'), 'utf8')
    .then(content => idRegexp.exec(content)[1])
    .then(async bundleid => {
			const {version} = await resolveAlfredPrefs();

			return Promise.all(
				(version === 3 ? alfred3 : alfred).map(item => unlink(path.join(userHome, item, bundleid)))
			);
		});

module.exports = dir => cleanup(dir)
    .then(unlink(dir));
