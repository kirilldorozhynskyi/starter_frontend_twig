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
 * Automatic Deploy
 */

import gulp from 'gulp'
import copyLaunchTask from './copy-launch'
import copyFontsTask from './copy-fonts'
import rebuildJsTask from './rebuild-js'
import rebuildImagesTask from './rebuild-images'
import copyContentimagesTask from './copy-contentimages'
import compilerCssTask from './compile-css'
import compilerHtmlTask from './compile-html'
import minifyJsTask from './minify-js'
import minifyContentimagesTask from './minify-contentimages'
import minifyInlineimagesTask from './minify-inlineimages'
import minifyCssTask from './minify-css'
import clean from './clean'
import javascript from './javascript'
import launchRobots from './robots'
import copyMedia from './copy-media'
import copyCSS from './copy-css'
import buildFaviconTask from './build-favicons'
import copyJsTask from './copy-js'

const buildTask = gulp.series(
	clean,
	(cb) => {
		// Overwrite the Changed Check
		global.checkChanged = true
		cb()
	},
	compilerCssTask,
	compilerHtmlTask,
	gulp.parallel(
		copyLaunchTask,
		copyFontsTask,
		rebuildJsTask,
		javascript,
		rebuildImagesTask,
		copyContentimagesTask,
		launchRobots,
		copyMedia,
		buildFaviconTask,
		copyJsTask
	),
	gulp.series(minifyContentimagesTask, minifyInlineimagesTask, minifyCssTask, minifyJsTask, copyCSS)
)

export default buildTask
