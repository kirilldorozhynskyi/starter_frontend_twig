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
 * Build SVG Sprite File
 * @description Build an SVG Vector Sprite and a Map file
 */

import jdev from '../../config.json'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import svgo from 'imagemin-svgo'

const $ = gulpLoadPlugins()

function buildVectorSpriteTask() {
	return gulp
		.src(jdev.src.images.vectorSprite.files + '**/*.svg')
		.pipe(
			$.imagemin([
				$.imagemin.svgo({
					plugins: jdev.minify.images.svgoPlugins,
				}),
			])
		)
		.pipe(
			$.svgSprite({
				shape: {
					dimension: {
						// Set maximum dimensions
						maxWidth: jdev.src.images.vectorSprite.maxWidth,
						maxHeight: jdev.src.images.vectorSprite.maxHeight,
					},
					spacing: {
						// Add padding
						padding: jdev.src.images.vectorSprite.padding,
					},
					dest: jdev.dist.vectors,
				},
				mode: {
					view: {
						// Activate the «view» mode
						sprite: jdev.dist.cssimg + jdev.src.images.vectorSprite.name,
						dest: '.',
						bust: false,
						prefix: '%%svg',
						render: {
							scss: {
								template: jdev.src.system + 'tpl_svgsprite.scss',
								dest: jdev.src.style + 'maps/_sprite-svg.scss',
							},
						},
					},
					symbol: {
						sprite: jdev.src.images.vectorSprite.symbolName,
						dest: jdev.dist.cssimg,
					},
				},
			})
		)
		.pipe(gulp.dest('./'))
}

export default buildVectorSpriteTask
