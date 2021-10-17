/*
 * File: /gulpfile/tasks/browsersync.js
 * Project: starter_frontend_twig
 * Version: 1.0.0
 * Created Date: Sunday, May 30th 2021, 22:46:47
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Tuesday, October 12th 2021 20:15:33
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2021 justDev
 * ------------------------------------
 * Browser Sync
 * @description Refresh the Browser after File Change.
 */

import jdev from '../../config.json'
import gulp from 'gulp'
import browserSync from 'browser-sync'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackSettings from '../../webpack/webpack.dev.babel'

const bundler = webpack(webpackSettings)

if (process.env.BS_PROXY !== 'false') {
	var envBrowserSyncProxy = process.env.BS_PROXY
}

function browserSyncTask(cb) {
	// Build a condition when Proxy is active
	let bsProxy
	let bsServer

	// Condition for Proxy
	if (envBrowserSyncProxy) {
		bsProxy = {
			target: envBrowserSyncProxy,
			ws: true
		}
		bsServer = false
	} else {
		bsProxy = false
		bsServer = {
			baseDir: jdev.dist.browserSyncDir
		}
	}

	// Browser Sync
	browserSync.init({
		debugInfo: true,
		watchTask: true,
		proxy: bsProxy,
		middleware: [
			webpackDevMiddleware(bundler, {
				quiet: true,
				logLevel: 'warn',
				publicPath: webpackSettings.output.publicPath,
				stats: {
					colors: true
				}
			}),
			webpackHotMiddleware(bundler, {
				log: () => {}
			})
		],

		ghostMode: {
			clicks: true,
			scroll: true,
			links: true,
			forms: true
		},

		logLevel: 'info',

		notify: {
			styles: [
				'padding: 8px 16px;',
				'position: fixed;',
				'font-size: 12px;',
				'font-weight: bold',
				'z-index: 9999;',
				'top: inherit',
				'border-radius: 0',
				'right: 0;',
				'bottom: 0;',
				'color: #f4f8f9;',
				'background-color: #026277;',
				'text-transform: uppercase'
			]
		},

		server: bsServer,
		https: process.env.BS_HTTPS,
		open: true,
		files: [
			`${jdev.dist.js}**/*.js`,
			`${jdev.dist.base}**/**/**.{php,html}`,
			`${jdev.dist.cssimg}**/*.{jpg,gif,png,svg}`,
			`${jdev.dist.contentimage}**/*.{jpg,gif,png,svg}`,
			`${jdev.dist.base}**/assets/img/system/**`,
			`${jdev.dist.fonts}**/**`,
			`${jdev.dist.wptheme}**/**/**.{php,html,twig}`
		]
	})
	cb()
}

export default browserSyncTask
