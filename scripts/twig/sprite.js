/*
 * File: /scripts/twig/sprite.js
 * Project: starter_frontend_twig
 * Version: 2.2.8
 * Created Date: Thursday, September 28th 2023, 16:54:21
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Tuesday, May 28th 2024 15:29:25
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2024 justDev
 */

const twigFunctionsSprite = (id, classes) => {
	const path = process.env.NODE_ENV != 'development' ? '/assets/spritemap.svg' : ''
	return `<svg class="sprite-icon icon-${id}${
		classes ? ' ' + classes : ''
	}" aria-hidden="true" focusable="false"><use xlink:href="${path}#icon-${id}"></use></svg>`
}
export default twigFunctionsSprite
