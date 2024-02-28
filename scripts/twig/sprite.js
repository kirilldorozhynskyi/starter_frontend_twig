/*
 * File: /scripts/twig/sprite.js
 * Project: starter_frontend_twig
 * Version: 2.2.0
 * Created Date: Thursday, September 28th 2023, 16:54:21
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Wednesday, February 28th 2024 13:53:16
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2024 justDev
 */

const twigFunctionsSprite = (id, secondArgument) => {
	const path = process.env.NODE_ENV != 'development' ? '/assets/spritemap.svg' : ''
	return `<svg class="sprite-icon icon-${id}${
		secondArgument ? ' ' + secondArgument : ''
	}" aria-hidden="true" focusable="false"><use xlink:href="${path}#icon-${id}"></use></svg>`
}
export default twigFunctionsSprite

// return `<svg class="sprite-icon icon-${id}${secondArgument ? ' ' + secondArgument : ''}" aria-hidden="true" focusable="false">
// <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-${id}"></use>
// </svg>`
