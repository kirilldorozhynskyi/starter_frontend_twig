/*
 * File: /src/scripts/util/translate.ts
 * Project: starter_frontend_twig
 * Version: 2.2.8
 * Created Date: Wednesday, August 14th 2024, 16:24:48
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Wednesday, August 14th 2024 16:33:00
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2024 justDev
 */

import en from './lang/en'
import sk from './lang/sk'

const translate = {
	datetimeFormats: {
		en: en.datetimeFormats,
		sk: sk.datetimeFormats,
	},
	locale: document.documentElement.lang || 'en',
	messages: {
		en: en.default,
		sk: sk.default,
	},
}

export default translate
