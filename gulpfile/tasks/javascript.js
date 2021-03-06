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
 */

import webpackStream from 'webpack-stream'
import webpack2 from 'webpack'
import gulp from 'gulp'
import jdev from '../../config.json'
import named from 'vinyl-named'
import gulpLoadPlugins from 'gulp-load-plugins'

const $ = gulpLoadPlugins()

var envNode = process.env.NODE_ENV || 'development'
if (envNode === 'development') {
	var devTool = 'source-map'
} else {
	var devTool = false
}

let webpackConfig = {
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						compact: false,
					},
				},
			},
		],
	},
	devtool: devTool,
}

function javascript() {
	return gulp
		.src(jdev.src.jsEntryPoints.main)
		.pipe(named())
		.pipe($.sourcemaps.init())
		.pipe(webpackStream(webpackConfig, webpack2))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(jdev.dist.js))
}

export default javascript
