/*
 * Project: starter_frontend_twig
 * File: /gulpfile/tasks/default.js
 * Version: 1.0.0
 * Created Date: Monday, February 15th 2021, 9:46:48
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Saturday, June 12th 2021 12:06:08
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2021 justDev
 * ------------------------------------
 * Default gulp Task 'gulp'
 * watch the working dirs - activates the compilers and refresh the browser
 */

import gulp from 'gulp'
import watchTask from './watch'
import browserSyncTask from './browsersync'
import copyLaunchTask from './copy-launch'
import copyFontsTask from './copy-fonts'
import javascript from './javascript'
import rebuildImagesTask from './rebuild-images'
import copyContentimagesTask from './copy-contentimages'
import compilerCssTask from './compile-css'
import compilerHtmlTask from './compile-html'
import clean from './clean'
import launchRobots from './robots'
import copyMedia from './copy-media'
import copyCSS from './copy-css'
import buildFaviconTask from './build-favicons'
import copyJsTask from './copy-js'

const defaultTask = gulp.series(
	clean,
	(cb) => {
		// Overwrite the Changed Check
		global.checkChanged = true
		cb()
	},
	gulp.parallel(copyLaunchTask, copyFontsTask, javascript, rebuildImagesTask, copyContentimagesTask, launchRobots, copyMedia, buildFaviconTask, copyJsTask),
	gulp.series(compilerCssTask, compilerHtmlTask, watchTask),
	gulp.series(browserSyncTask, copyCSS)
)

export default defaultTask