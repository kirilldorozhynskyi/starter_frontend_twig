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
import type { I18nOptions } from 'vue-i18n'

const supportedLocales = ['en', 'sk'] as const
const documentLocale = document.documentElement.lang.trim().toLowerCase()
const normalizedLocale = documentLocale.split('-')[0]
const activeLocale = supportedLocales.includes(normalizedLocale as (typeof supportedLocales)[number])
	? normalizedLocale
	: 'en'

const translate = {
	legacy: false,
	datetimeFormats: {
		en: en.datetimeFormats,
		sk: sk.datetimeFormats,
	},
	locale: activeLocale,
	messages: {
		en: en,
		sk: sk,
	},
} as I18nOptions

const i18nConfig = translate

export default i18nConfig
