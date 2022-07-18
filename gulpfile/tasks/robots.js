/*
 * File: /gulpfile/tasks/robots.js
 * Project: starter_frontend_twig
 * Version: 1.1.6-0
 * Created Date: Monday, February 15th 2021, 9:46:48
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Monday, July 18th 2022 17:35:43
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2021 justDev
 * ------------------------------------
 * Robots txt
 */

import jdev from '../../config.json'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
var rename = require('gulp-rename')

const $ = gulpLoadPlugins()
var envNode = process.env.NODE_ENV || 'development'
var compiler = process.env.HTML_COMPILER || 'true'
var envSiteUrl = process.env.SITE_URL

function launchRobots() {
	console.log()
	const data = {
		environment: envNode,
		siteURL: envSiteUrl
	}

	if (compiler === 'true') {
		return gulp
			.src('./src/.system/robots.twig')
			.pipe(
				$.twig({
					data: data
				})
			)
			.pipe(
				rename(function (path) {
					path.extname = '.txt'
				})
			)
			.pipe(gulp.dest(jdev.dist.base))
	} else {
		return gulp.src('./src/.system/robots.twig')
	}
}

export default launchRobots
