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
 * Starting Task for the first Build off the Project Structure
 */

import gulp from 'gulp'
import sassdocGenerateTask from './sassdoc-generate'
import copyLaunchTask from './copy-launch'
import copyFontsTask from './copy-fonts'
import rebuildJsTask from './rebuild-js'
import rebuildImagesTask from './rebuild-images'
import copyContentimagesTask from './copy-contentimages'
import compilerCssTask from './compile-css'
import compilerHtmlTask from './compile-html'
import clean from './clean'

const initTask = gulp.series(
	clean,
	(cb) => {
		// Overwrite the Changed Check
		global.checkChanged = false
		cb()
	},
	sassdocGenerateTask,
	gulp.parallel(copyLaunchTask, copyFontsTask, rebuildJsTask, rebuildImagesTask, copyContentimagesTask),
	gulp.parallel(compilerCssTask, compilerHtmlTask)
)

export default initTask
