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
 * Rebuild all Images
 * Copy to distribution, build Sprites
 */

import gulp from 'gulp'
import copyBitmapsTask from './copy-bitmaps'
import copyVectorsTask from './copy-vectors'
import buildBitmapSpriteTask from './build-bitmapsprite'
import buildVectorSpriteTask from './build-vectorsprite'
import buildSymbolCleanupTask from './build-symbolCleanup'

const rebuildImagesTask = gulp.series(gulp.parallel(copyBitmapsTask, copyVectorsTask, buildBitmapSpriteTask, buildVectorSpriteTask), buildSymbolCleanupTask)

export default rebuildImagesTask
