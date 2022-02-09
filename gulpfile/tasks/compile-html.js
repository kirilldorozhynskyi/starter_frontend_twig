/*
 * File: /gulpfile/tasks/compile-html.js
 * Project: starter_frontend_twig
 * Version: 1.1.4
 * Created Date: Sunday, May 30th 2021, 22:46:47
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Wednesday, February 9th 2022 22:29:33
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2021 justDev
 * ------------------------------------
 * Template Compiler
 */

import jdev from '../../config.json'
import gulp from 'gulp'
import gutil from 'gulp-util'
import gulpLoadPlugins from 'gulp-load-plugins'
import errorHandler from '../lib/errorHandler'
import yargs from 'yargs'
import imgRetina from '../plugins/gulp-responsive-imgz-ignore'
import htmlbeautify from 'gulp-html-beautify'
import htmlmin from 'gulp-htmlmin'
import dataPages from '../../src/data/pages.json'
import webdev from '../../src/data/web_data.json'

var rename = require('gulp-rename')
var fs = require('fs')

require('dotenv').config()

const args = yargs.argv
const $ = gulpLoadPlugins()

var envNode = process.env.NODE_ENV || 'development'
var envProxy = process.env.BS_PROXY || false
var envCompiler = process.env.HTML_COMPILER || true
var envSiteUrl = process.env.SITE_URL
var cms = process.env.CMS || false

if (envProxy === false) {
	var htmlCompiler = true
} else if (envCompiler === false && envNode === 'development') {
	var htmlCompiler = true
} else {
	var htmlCompiler = false
}

function compilerHtmlTask(cb) {
	if (htmlCompiler) {
		const webconfig = webdev
		dataPages.forEach((item) => {
			const data = {
				environment: envNode,
				dataPages: dataPages,
				site: webconfig.site,
				options: webconfig.options,
				page: item,
				siteURL: envSiteUrl,
				assetsImg: '/' + jdev.templatePath.contentimage,
				cms: cms,
				siteVersiov: webconfig.version
			}
			return gulp
				.src('./src/template/page_templates/' + item.template + '.twig')
				.pipe(
					$.twig({
						data: data,
						useFileContents: true,
						functions: [
							{
								name: 'source',
								func: function (path) {
									var content = 'content'
									content = fs.readFileSync('dist' + path).toString()
									return content
								}
							},
							{
								name: '__',
								func: function (text, domaine) {
									return text
								}
							},
							{
								name: 'Image',
								func: function (text) {
									return text
								}
							},
							{
								name: 'sprite',
								func: function (icon, format) {
									return "<svg class='sprite-icon " + format + "'><use xlink:href='/assets/img/symbol-sprite.svg#" + icon + "'></use></svg>"
								}
							}
						]
					})
				)
				.pipe(
					rename(function (opt) {
						if (item.template === '404') {
							opt.basename = item.template
							return opt
						} else {
							opt.basename = opt.basename.replace(item.template, 'index')
							return opt
						}
					})
				)
				.pipe(
					htmlbeautify({
						indent_char: ' ',
						indent_size: 2,
						max_preserve_newlines: 2
					})
				)
				.pipe(
					process.env.HTML_MINIFY === 'true' && envNode !== 'development'
						? $.htmlmin({
								collapseWhitespace: true,
								removeComments: true
						  })
						: $.htmlmin()
				)
				.pipe(
					imgRetina({
						suffix: {
							'1x': '',
							'2x': '@2x',
							'480w': '@2x'
						}
					})
				)
				.pipe(gulp.dest(jdev.dist.base + item.url))
		})
	}
	cb()
}

export default compilerHtmlTask
