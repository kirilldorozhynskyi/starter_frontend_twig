/*
 * File: /scripts/twig/svg.js
 * Project: starter_frontend_twig
 * Version: 2.2.8
 * Created Date: Tuesday, May 14th 2024, 19:25:41
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Wednesday, May 29th 2024 21:50:00
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2024 justDev
 */

const twigFunctionsSvg = (img, classes = '') => {
	const path = '/assets/images'
	const src = path + img.src

	return `<object width="${img.width}" height="${img.height}" aria-label="${img.title}" class="${classes}" lazy type="image/svg+xml" data-src="${src}"></object>`
}
export default twigFunctionsSvg
