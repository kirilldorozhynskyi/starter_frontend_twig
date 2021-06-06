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
 * Copy SVG Images
 * @description Move all SVG Images (from vectorSingle-assets) to the .dist Folder
 */

import jdev from '../../config.json'
import gulp from 'gulp'
import gutil from 'gulp-util'
import gulpLoadPlugins from 'gulp-load-plugins'
import svgo from 'imagemin-svgo'

const $ = gulpLoadPlugins()

function copyVectorsTask() {
	return gulp
		.src(jdev.src.images.vectors + '**/*.svg')
		.pipe(global.checkChanged === true ? $.changed(jdev.dist.vectors) : gutil.noop())
		.pipe(
			$.imagemin([
				$.imagemin.svgo({
					plugins: jdev.minify.images.svgoPlugins,
				}),
			])
		)
		.pipe(gulp.dest(jdev.dist.vectors))
}

export default copyVectorsTask
