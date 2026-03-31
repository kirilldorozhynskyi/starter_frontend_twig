/*
 * File: /src/scripts/directives/clipboard.js
 * Project: ousa-fe
 * Version: 1.0.0
 * Created Date: Tuesday, June 18th 2024, 15:36:32
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Tuesday, June 18th 2024 15:54:05
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2024 justDev
 */

const clipboardDirective = {
	mounted(el) {
		el.__v_clipboard_handler = async () => {
			const options = el.__v_clipboard

			if (!options?.url) {
				return
			}

			try {
				await copyToClipboard(options.url)

				if (options.text) {
					showNotification(options.text, options.time ?? 3000)
				}
			} catch (error) {
				console.error('Error copying URL to clipboard: ', error)
			}
		}

		el.addEventListener('click', el.__v_clipboard_handler)
	},
	beforeMount(el, binding) {
		el.__v_clipboard = binding.value
	},
	updated(el, binding) {
		el.__v_clipboard = binding.value
	},
	beforeUnmount(el) {
		if (el.__v_clipboard_handler) {
			el.removeEventListener('click', el.__v_clipboard_handler)
		}

		delete el.__v_clipboard
		delete el.__v_clipboard_handler
	}
}

async function copyToClipboard(text) {
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(text)
		return
	}

	const textarea = document.createElement('textarea')
	textarea.value = text
	textarea.setAttribute('readonly', '')
	textarea.style.position = 'absolute'
	textarea.style.left = '-9999px'
	document.body.appendChild(textarea)
	textarea.select()
	document.execCommand('copy')
	document.body.removeChild(textarea)
}

function showNotification(message, time) {
	const notification = document.createElement('div')
	notification.className = 'clipboard'
	notification.textContent = message
	document.body.appendChild(notification)

	setTimeout(() => {
		notification.classList.add('show')
	}, 100)
	setTimeout(() => {
		notification.classList.remove('show')
		setTimeout(() => {
			document.body.removeChild(notification)
		}, 500)
	}, time)
}

export default clipboardDirective
