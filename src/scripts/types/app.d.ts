/*
 * File: /src/scripts/types/app.d.ts
 * Project: starter_frontend_twig
 * Version: 2.2.0
 * Created Date: Friday, September 29th 2023, 14:27:10
 * Author: Kirill Dorozhynskyi - kyrylo.dorozhynskyi@justdev.org
 * -----
 * Last Modified: Friday, April 12th 2024 15:45:51
 * Modified By: Kirill Dorozhynskyi
 * -----
 * Copyright (c) 2024 justDev
 */

import type { ComputedRef } from 'vue'
import type { ILazyLoadInstance } from 'vanilla-lazyload'

declare global {
	interface Window {
		bootstrap?: {
			Tooltip?: new (
				element: Element,
				options?: Record<string, unknown>
			) => {
				dispose: () => void
				update: () => void
			}
		}
	}

	export type Dictionary<T> = Record<string, T>
}

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		lazyLoad: ILazyLoadInstance
		scrollOffset: number | ComputedRef<number>
	}
}
