/*
 * File: /scripts/twig/svg.js
 * Project: sart
 * Version: 1.0.0
 * Created Date: Tuesday, May 14th 2024, 19:25:41
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Tuesday, May 14th 2024 19:31:43
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2024 justDev
 */

const twigFunctionsSvg = (img, classes = '') => {
	const path = '/assets/images/'
	const src = path + img

	return `<object class="${classes}" lazy type="image/svg+xml" data-src="${src}"></object>`
}
export default twigFunctionsSvg
