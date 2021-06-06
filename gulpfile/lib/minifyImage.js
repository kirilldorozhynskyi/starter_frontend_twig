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
 * Combined Image Minify Function
 */

import jdev from '../../config.json'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import pngquant from 'imagemin-pngquant'
import svgo from 'imagemin-svgo'
import jpegCompress from 'imagemin-jpeg-recompress'

const $ = gulpLoadPlugins()

const minifyImages = (srcfiles, distfiles) => {
	gulp
		.src(['!' + srcfiles + 'system/**', srcfiles + '/**', '!' + srcfiles + jdev.src.images.vectorSprite.symbolName])
		.pipe(
			$.imagemin([
				$.imagemin.gifsicle({ interlaced: jdev.minify.images.interlaced }),
				$.imagemin.optipng({
					optimizationLevel: jdev.minify.images.optimizationLevel,
				}),
				$.imagemin.svgo({
					plugins: jdev.minify.images.svgoPlugins,
				}),
			])
		)
		.pipe(gulp.dest(distfiles))
}

export default minifyImages
