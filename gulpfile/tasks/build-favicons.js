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
 * BuildFavicon
 * @description Build a set of Favicons
 */

import jdev from '../../config.json'
import webdev from '../../src/data/web_data.json'
import pkg from '../../package.json'

import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'

const $ = gulpLoadPlugins()

const webconfig = webdev
var envSiteUrl = process.env.SITE_URL
function buildFaviconTask() {
	return gulp
		.src(jdev.src.system + 'favicon.png')
		.pipe(
			$.favicons({
				appName: webconfig.site.title,
				appShortName: webconfig.site.title,
				appDescription: webconfig.site.description,
				developerName: pkg.author.name,
				developerURL: pkg.author.url,
				background: webconfig.options.favicon.themecolor,
				path: '',
				url: envSiteUrl,
				display: 'standalone',
				orientation: 'portrait',
				scope: '/',
				start_url: '/?homescreen=1',
				version: webconfig.globaVersion,
				logging: false,
				icons: {
					android: true,
					appleIcon: true,
					appleStartup: false,
					coast: false,
					favicons: true,
					firefox: true,
					opengraph: false,
					twitter: false,
					windows: false,
					yandex: false,
				},
			})
		)
		.pipe(gulp.dest(jdev.dist.assets + '/system/favicons/'))
}

export default buildFaviconTask
