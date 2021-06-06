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
 * Critical CSS
 * @description Generate Inline CSS for the Above the fold optimization
 */

import jdev from '../../config.json'
import gulp from 'gulp'
import critical from 'critical'
import dataPages from '../../src/data/pages.json'

function criticalCss(cb) {
	dataPages.forEach((item) => {
		if (item.url == '/') {
			var fileHTML = 'index.html'
		} else {
			var fileHTML = item.url + '/index.html'
		}

		return critical.generate({
			inline: true,
			base: 'dist',
			src: fileHTML,
			target: {
				html: fileHTML,
				uncritical: 'assets/css/main.css',
			},
			minify: true,
			extract: true,
			dimensions: [
				{
					height: 200,
					width: 500,
				},
				{
					height: 900,
					width: 1200,
				},
			],
		})
	})
	cb()
}

export default criticalCss
