/*
 * File: /scripts/fixCss.js
 * Project: starter_frontend_twig
 * Version: 2.0.0
 * Created Date: Friday, September 29th 2023, 11:40:21
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Friday, September 29th 2023 12:03:31
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2023 justDev
 */

import config from '../config.js'

const { fonts } = config

const fixCSSPlugin = () => {
	return {
		name: 'fix-css',
		enforce: 'post',
		async generateBundle(_options, bundle) {
			const cssFiles = Object.keys(bundle).filter((key) => key.endsWith('.css'))
			if (!cssFiles) return
			for (const file of cssFiles) {
				bundle[file].source = bundle[file].source.replaceAll(fonts.fix, fonts.prod)
			}
		}
	}
}

export default fixCSSPlugin
