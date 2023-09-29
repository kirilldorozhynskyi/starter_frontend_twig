/*
 * File: /scripts/critical.js
 * Project: starter_frontend_twig
 * Version: 2.0.0
 * Created Date: Tuesday, July 19th 2022, 3:27:02
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Friday, September 29th 2023 12:17:03
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2023 justDev
 */

import * as criticalModule from 'critical'

import config from '../config.js'

const { buildDir, critical } = config

const criticalPlugin = () => {
	if (!critical.enable) return false
	return {
		name: 'critical-css',
		enforce: 'post',
		async generateBundle(_options, bundle) {
			const htmlFiles = Object.keys(bundle).filter((key) => key.endsWith('.html'))
			if (!htmlFiles) return
			for (const file of htmlFiles) {
				criticalModule.generate({
					inline: true,
					html: bundle[file].source,
					base: `${buildDir}/`,
					target: {
						html: bundle[file].fileName
					},
					ignore: {
						atrule: ['@font-face']
					}
				})
			}
		}
	}
}

export default criticalPlugin
