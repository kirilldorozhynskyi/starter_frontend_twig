/*
 * File: /scripts/twig/image.js
 * Project: starter_frontend_twig
 * Version: 2.0.2
 * Created Date: Thursday, September 28th 2023, 17:20:01
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Wednesday, October 4th 2023 18:32:03
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2023 justDev
 */

const twigFunctionsImage = (img) => {
	const path = '/assets/images/'

	const pictureClass = img.pictureClass ?? 'picture'
	const image = img.image

	// TODO: breakpoints
	// const breakpoints = img.breakpoints

	const webpImage = image.webp ? `<source data-srcset="${path}${image.src}.webp 1x,  ${path}${image.src_2x ?? image.src}.webp 2x" />` : ''
	const defaultImage = image.webp ? `<source data-srcset="${path}${image.src}.${image.ext} 1x, ${path}${image.src_2x ?? image.src}.${image.ext} 2x" />` : ''

	return `<picture class="${pictureClass}">
	${webpImage}
	${defaultImage}
	<img alt="${image.alt ?? 'alt text'}"
		lazy
		class="${image.class ? image.class : ''}"
		src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8IQkAAa8A48opxD0AAAAASUVORK5CYII="
		data-srcset="${path}${image.src}.${image.ext} 1x, ${path}${image.src_2x ?? image.src}.${image.ext} 2x" width="${image.width ?? ''}" height="${
		image.height ?? ''
	}" />
	</picture>`
}

export default twigFunctionsImage
