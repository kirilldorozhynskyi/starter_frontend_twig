/*
 * File: /gulpfile/tasks/uploud-archive.js
 * Project: starter_frontend_twig
 * Version: 1.1.0
 * Created Date: Monday, October 18th 2021, 12:37:16
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Monday, October 18th 2021 18:57:20
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2021 justDev
 * ------------------------------------
 * uploud-archive.js
 */

import gulp from 'gulp'
var exec = require('gulp-exec')
var path = require('path')

import webdev from '../../src/data/web_data.json'
const BB_USER = process.env.BB_USER
const BB_PASS = process.env.BB_PASS
const BB_REPO = process.env.BB_REPO

const file = 'build_' + webdev.version + '.zip'

function uploudArchive(cd) {
	var options = {
		continueOnError: false, // default = false, true means don't emit error event
		pipeStdout: false // default = false, true means stdout is written to file.contents
	}

	return gulp
		.src('./build/' + file)
		.pipe(
			exec(
				(file) => `curl -s -u ${BB_USER}:${BB_PASS} -X POST https://api.bitbucket.org/2.0/repositories/${BB_REPO}/downloads -F files=@'${file.path}'`,
				options
			)
		)
}

export default uploudArchive
