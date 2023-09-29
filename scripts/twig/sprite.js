/*
 * File: /scripts/twig/sprite.js
 * Project: starter_frontend_twig
 * Version: 2.0.0
 * Created Date: Thursday, September 28th 2023, 16:54:21
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Thursday, September 28th 2023 17:18:03
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2023 justDev
 */

const twigFunctionsSprite = (id) => {
	return `<svg class="sprite-icon icon-${id}" aria-hidden="true" focusable="false">
		<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-${id}"></use>
		</svg>`
}

export default twigFunctionsSprite
