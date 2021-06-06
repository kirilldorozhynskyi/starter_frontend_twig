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
 * Build Bitmap Sprite
 * @description Build the Bitmap Sprite File and the SCSS Map
 */

import jdev from '../../config.json'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'

const $ = gulpLoadPlugins()

function buildBitmapSpriteTask() {
	return gulp
		.src(jdev.src.images.bitmapSprite.files + '**/*.png')
		.pipe(
			$.if(
				'*.png',
				$.spritesmith({
					imgName: jdev.src.images.bitmapSprite.name,
					cssName: '_sprite-bitmap.scss',
					imgPath: jdev.dist.cssimgRoot + jdev.src.images.bitmapSprite.name,
					cssTemplate: jdev.src.system + 'tpl_bitmapsprite.scss',
				})
			)
		)
		.pipe($.if('*.png', gulp.dest(jdev.dist.cssimg), gulp.dest(jdev.src.style + 'maps/')))
}

export default buildBitmapSpriteTask
