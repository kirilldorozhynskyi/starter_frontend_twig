/*
 * File: /gulpfile/lib/copyImages.js
 * Project: starter_frontend_twig
 * Version: 1.1.10
 * Created Date: Monday, February 15th 2021, 9:46:48
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Tuesday, September 5th 2023 19:44:44
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2023 justDev
 * ------------------------------------
 * Combined Image Copy Function
 */

import jdev from '../../config.json'
import gulp from 'gulp'
import gutil from 'gulp-util'
import gulpLoadPlugins from 'gulp-load-plugins'
import svgo from 'imagemin-svgo'
import jpegCompress from 'imagemin-jpeg-recompress'

const $ = gulpLoadPlugins()

const copyImages = (srcfiles, distfiles) => {
	gulp
		.src(srcfiles + '**/*.{png,jpeg,jpg,gif,webp,svg}')
		.pipe(global.checkChanged === true ? $.changed(jdev.dist.bitmaps) : gutil.noop())
		.pipe(gulp.dest(distfiles))
}

export default copyImages
