import { MultiSelectOption } from '.'
import React from 'react'
import { styleguide } from 'components/assets/styles'
import { Tag } from 'components'
import { tagPalette } from 'components/Tag/utils'
import { themedStyles, ThemeType } from '../assets/styles/themes'

const { dark, light } = ThemeType

const {
	colors: { blacks, grays, whites }
} = styleguide

interface MappedOptions {
	[value: string]: MultiSelectOption
}

export const mapOptions = (options: MultiSelectOption[]) => {
	const mappedOpts: MappedOptions = {}

	for (const option of options) {
		mappedOpts[option.value] = option
	}

	return mappedOpts
}

// ---------------------------

export const generateThemedTagStyles = (themeType: ThemeType) => {
	const { background, borderColor, color } = tagPalette[themeType]

	const { base, hover } = themedStyles[themeType]

	return {
		'& .ant-select-selection-item': {
			'& .ant-select-selection-item-remove': {
				'&:hover': {
					color: hover.color
				},
				color: base.color
			},
			background,
			borderColor,
			color
		}
	}
}

const selectPalette = {
	input: {
		[dark]: {
			base: {
				background: blacks['darken-40'],
				borderColor: blacks['lighten-20']
			},
			disabled: {
				background: blacks['darken-20'],
				borderColor: blacks['darken-20']
			}
		},
		[light]: {
			base: {
				background: whites.base,
				borderColor: blacks['lighten-80']
			},
			disabled: {
				background: whites.base,
				borderColor: grays.base
			}
		}
	}
}

export const generateThemedInputStyles = (themeType: ThemeType) => {
	const { background, borderColor } = selectPalette.input[themeType].base

	return {
		background,
		borderColor
	}
}
