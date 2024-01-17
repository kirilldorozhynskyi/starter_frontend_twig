/*
 * File: /scripts/twig/sprite.js
 * Project: starter_frontend_twig
 * Version: 2.1.1
 * Created Date: Thursday, September 28th 2023, 16:54:21
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Wednesday, January 17th 2024 20:34:09
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2024 justDev
 */

const twigFunctionsSprite = (id, secondArgument) => {
	return `<svg class="sprite-icon icon-${id}${secondArgument ? ' ' + secondArgument : ''}" aria-hidden="true" focusable="false">
	  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-${id}"></use>
	</svg>`
}
export default twigFunctionsSprite
