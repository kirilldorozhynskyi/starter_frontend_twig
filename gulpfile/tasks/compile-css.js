/*
 * Project: starter_frontend_twig
 * File: /gulpfile/tasks/compile-css.js
 * Version: 1.0.0
 * Created Date: Monday, February 15th 2021, 9:46:48
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Sunday, June 6th 2021 22:49:16
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2021 justDev
 * ------------------------------------
 * CSS Compiler Task
 */

import jdev from '../../config.json'
import gulp from 'gulp'
import gutil from 'gulp-util'
import browserSync from 'browser-sync'
import gulpLoadPlugins from 'gulp-load-plugins'
import errorHandler from '../lib/errorHandler'
import yargs from 'yargs'
import api from 'stylelint'
import sassGlob from 'gulp-sass-glob'

const args = yargs.argv
const $ = gulpLoadPlugins()

var envNode = process.env.NODE_ENV || 'development'

const compilerCssTask = (cb) => {
	gulp
		.src([jdev.src.style + '**/*.scss', jdev.src.style + '**/*.sass'])
		.pipe(envNode === 'development' ? $.sourcemaps.init() : gutil.noop())

		.pipe(sassGlob())
		.pipe($.sass({}).on('error', errorHandler))
		.pipe($.postcss(jdev))
		.pipe(
			envNode === 'development'
				? $.size({
						title: '>>> CSS File Size: ',
				  })
				: gutil.noop()
		)
		.pipe(
			browserSync.reload({
				stream: true,
			})
		)
		.pipe(envNode === 'development' ? $.sourcemaps.write('.') : gutil.noop())
		.pipe(gulp.dest(jdev.dist.css))
	cb()
}

export default compilerCssTask
