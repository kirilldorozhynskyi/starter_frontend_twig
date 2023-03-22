/*
 * File: /src/js/main.js
 * Project: starter_frontend_twig
 * Version: 1.1.6-3
 * Created Date: Sunday, June 6th 2021, 17:46:00
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Friday, March 3rd 2023 16:46:25
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2023 justDev
 * ------------------------------------
 * Global Js
 *
 */

// Import Partials

// Import Packages
import LazyLoad from 'vanilla-lazyload'
import AOS from 'aos'

var lazyLoadInstance = new LazyLoad({
	// Your custom settings go here
})

AOS.init({
	duration: 900,
	disable: 'phone',
	once: true
})
