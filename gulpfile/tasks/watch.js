/*
 * Project: starter_frontend_twig
 * File: /gulpfile/tasks/watch.js
 * Version: 1.0.0
 * Created Date: Monday, February 15th 2021, 9:46:48
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Saturday, June 12th 2021 11:35:57
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2021 justDev
 * ------------------------------------
 * The Watch Tasks for SASS,
 * PUG or Twig, JS and activate BrowserSync
 */

import jdev from '../../config.json'
import gulp from 'gulp'
import watch from 'gulp-watch'
import path from 'path'
import compilerCssTask from './compile-css'
import compilerHtmlTask from './compile-html'
import copyContentimagesTask from './copy-contentimages'
import copyLaunchTask from './copy-launch'
import copyFontsTask from './copy-fonts'
import copyVectors from './copy-vectors'
import javascriptCopy from './javascript'
import rebuildImagesTask from './rebuild-images'

function watchTask(cb) {
	// Watch the SCSS Folder for changes - compile CSS
	gulp.watch([jdev.src.style + '**/**/*.scss', jdev.src.style + '**/**/*.sass'], { interval: 500 }, gulp.series(compilerCssTask))
	gulp.watch([jdev.src.template + '**/**/*.scss', jdev.src.style + '**/**/*.sass'], { interval: 500 }, gulp.series(compilerCssTask))
	gulp.watch([jdev.dist.wptheme + '**/**/**.scss', jdev.dist.wptheme + '**/**/**.sass'], { interval: 500 }, gulp.series(compilerCssTask))

	// Watch the Images
	gulp.watch('src/images/**/*').on('all', gulp.series(copyContentimagesTask))

	gulp.watch('src/images/**/*').on('all', gulp.series(rebuildImagesTask))

	gulp.watch('src/images/**/*').on('all', gulp.series(copyVectors))

	// Watch the JS
	gulp.watch('src/js/**/*').on('all', gulp.series(javascriptCopy))

	// Watch the Fonts
	gulp.watch('src/fonts/**/*').on('all', gulp.series(copyFontsTask))

	// Watch the System
	gulp.watch('src/.system/**/*').on('all', gulp.series(copyLaunchTask))

	// Watch the Structure
	gulp.watch([jdev.src.template + '**/**/*.{php,html,twig}', jdev.dist.wptheme + '**/**/*.{php,html,twig}'], { interval: 500 }, gulp.series(compilerHtmlTask))

	cb()
}

export default watchTask
