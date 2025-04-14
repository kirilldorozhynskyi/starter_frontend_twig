/*
 * File: /src/scripts/util/i18n.ts
 * Project: starter_frontend_twig
 * Version: 3.0.0
 * Created Date: Wednesday, August 14th 2024, 16:24:20
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Friday, April 11th 2025 13:44:05
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2025 justDev
 */

import en from './lang/en.json'
import sk from './lang/sk.json'

const translate = {
	legacy: false,
	datetimeFormats: {
		en: en.datetimeFormats,
		sk: sk.datetimeFormats,
	},
	locale: document.documentElement.lang || 'en',
	messages: {
		en: en,
		sk: sk,
	},
}

const i18nConfig = translate

export default i18nConfig
