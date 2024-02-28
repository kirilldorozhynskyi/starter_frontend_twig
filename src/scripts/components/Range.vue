<template>
	<div :data-min="internalValue[0]" :data-max="internalValue[1]">
		<Slider
			v-model="internalValue"
			showTooltip="drag"
			:format="format"
			:min="min"
			:max="max"
			:merge="merge"
			:currentMin="currentMin"
			:currentMax="currentMax"
		/>

		<div class="d-flex align-items-center justify-content-between mt-1-half">
			<span class="text-dark fw-semibold">{{ info }}: {{ formatPrice(internalValue[0]) }} - {{ formatPrice(internalValue[1]) }}</span>

			<button class="btn btn-primary">{{ filter }}</button>
		</div>
	</div>
</template>

<script>
import Slider from '@vueform/slider'

export default {
	props: {
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: 100
		},
		currentMax: {
			type: [Number, Boolean],
			default: false
		},
		currentMin: {
			type: [Number, Boolean],
			default: false
		},
		currency: {
			type: String,
			default: '€'
		},
		info: {
			type: String,
			default: 'Price'
		},
		filter: {
			type: String,
			default: 'Filter'
		}
	},
	data() {
		return {
			internalValue: [this.currentMin ? this.currentMin : this.min, this.currentMax ? this.currentMax : this.max],
			merge: this.max / 4,
			format: {
				suffix: ` ${this.currency}`,
				decimals: 0,
				thousand: ' '
			}
		}
	},
	methods: {
		formatPrice(value) {
			const formattedNumber = `${value.toLocaleString('sk-SK')} ${this.currency}`
			return formattedNumber
		}
	},
	components: {
		Slider
	}
}
</script>
