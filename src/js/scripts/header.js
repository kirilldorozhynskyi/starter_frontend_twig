/*
 * File: /src/js/scripts/header.js
 * Project: starter_frontend_twig
 * Version: 1.1.7
 * Created Date: Monday, June 12th 2023, 11:45:27
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Monday, June 12th 2023 11:50:31
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2023 justDev
 */

const hamburger = document.querySelector('#ham')
const header = document.querySelector('header')
const hamburgerButton = document.querySelector('.nav-top')
const hamburgerDrill = document.querySelector('.nav-drill')

if (hamburger) {
	function headerOpen() {
		hamburger.classList.toggle('nav-is-toggled')
		hamburgerDrill.classList.toggle('open')
		document.body.classList.toggle('modal-open')
	}
	hamburgerButton.addEventListener('click', headerOpen)
}
