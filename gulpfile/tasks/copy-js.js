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
 * Copy JS
 * @description Copy Bower Files to 'dist/'. Use the JSON Array in the config.json [files:jsCopy]]
 */

import jdev from '../../config.json'
import gulp from 'gulp'
import gutil from 'gulp-util'
import gulpLoadPlugins from 'gulp-load-plugins'
import browserSync from 'browser-sync'

const $ = gulpLoadPlugins()

function copyJsTask(cb) {
	jdev.files.jsscripts.forEach((item) => {
		return gulp
			.src(jdev.src.scripts + item.src)
			.pipe(global.checkChanged === true ? $.changed(jdev.dist.scripts + item.dest) : gutil.noop())
			.pipe(
				browserSync.reload({
					stream: true,
				})
			)
			.pipe(gulp.dest(jdev.dist.scripts + item.dest))
	})
	cb()
}

export default copyJsTask
