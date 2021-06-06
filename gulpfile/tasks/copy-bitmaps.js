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
 * Copy Bitmaps
 * @description Move all Bitmap Images (from bitmapSingle-assets) to the .dist Folder
 */

import jdev from '../../config.json'
import gulp from 'gulp'
import copyImages from '../lib/copyImages'

function copyBitmapsTask(cb) {
	// Call the Function
	copyImages(jdev.src.images.bitmaps, jdev.dist.bitmaps)
	cb()
}

export default copyBitmapsTask
