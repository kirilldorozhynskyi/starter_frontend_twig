/*
 * File: /gulpfile/tasks/browsersync.js
 * Project: starter_frontend_twig
 * Version: 1.0.0
 * Created Date: Monday, February 15th 2021, 9:46:48
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Sunday, June 6th 2021 22:49:16
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2021 justDev
 * ------------------------------------
 * Copy Launch Files
 * @description Copy the Default Build Files to distribution
 */

import jdev from '../../config.json'
import gulp from 'gulp'
import gutil from 'gulp-util'
import gulpLoadPlugins from 'gulp-load-plugins'
import browserSync from 'browser-sync'

const $ = gulpLoadPlugins()

if (process.env.HTML_COMPILER === 'false') {
	var htaccess = false
}

function copyLaunchTask(cb) {
	jdev.files.launch.forEach((item) => {
		if (htaccess !== false && item.src !== '.htaccess') {
			return gulp
				.src(jdev.src.system + item.src)
				.pipe(global.checkChanged === true ? $.changed(jdev.dist.base + item.dest) : gutil.noop())
				.pipe(
					browserSync.reload({
						stream: true,
					})
				)
				.pipe(gulp.dest(jdev.dist.base + item.dest))
		} else {
			return gulp
		}
	})
	cb()
}

export default copyLaunchTask
