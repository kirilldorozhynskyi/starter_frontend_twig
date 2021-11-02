/*
 * File: /Users/kirill/justDev/Development/justDev/justDev/justdev_starters/starter_frontend_twig/gulpfile/tasks/build-archive.js
 * Project: starter_frontend_twig
 * Version: 1.1.0
 * Created Date: Sunday, October 17th 2021, 12:10:34
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Wednesday, October 20th 2021 17:47:06
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2021 justDev
 * ------------------------------------
 * Build archive
 * @description Build the archive version
 */

import gulp from 'gulp'
import webdev from '../../src/data/web_data.json'

import zip from 'gulp-zip'

function buildArchive(cb) {
	return gulp
		.src('dist/**')
		.pipe(zip('build_' + webdev.version + '.zip'))
		.pipe(gulp.dest('build'))
}
export default buildArchive
