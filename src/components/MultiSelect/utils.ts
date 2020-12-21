import { styleguide } from 'components/assets/styles'
import { tagPalette } from 'components/Tag/utils'
import { themedStyles, ThemeType } from '../assets/styles/themes'

const { dark, light } = ThemeType

const {
	colors: { blacks, grays, whites }
} = styleguide

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
	[dark]: {
		base: {
			background: blacks['darken-40']
		},
		input: {
			default: {
				borderColor: blacks['lighten-20']
			},
			disabled: {
				background: blacks['darken-20'],
				borderColor: blacks['darken-20']
			}
		},
		option: {
			hover: {
				background: blacks['lighten-10']
			},
			selected: {
				background: blacks['lighten-30'],
				color: whites.base
			}
		}
	},
	[light]: {
		base: {
			background: whites.base
		},
		input: {
			default: {
				borderColor: blacks['lighten-80']
			},
			disabled: {
				background: whites.base,
				borderColor: grays.base
			}
		},
		option: {
			hover: {
				background: grays['lighten-40']
			},
			selected: {
				background: grays.base,
				color: blacks.base
			}
		}
	}
}

export const generateThemedInputStyles = (themeType: ThemeType) => {
	const { background } = selectPalette[themeType].base
	const { borderColor } = selectPalette[themeType].input.default

	return {
		background,
		borderColor
	}
}

export const generateThemedDropdownStyles = (themeType: ThemeType) => {
	const { background } = selectPalette[themeType].base
	return { background }
}

export const generateThemedOptionStyles = (themeType: ThemeType) => {
	const {
		base: { color }
	} = themedStyles[themeType]

	const { hover, selected } = selectPalette[themeType].option

	return {
		'&.ant-select-item-option': {
			'&.ant-select-item-option-active': {
				background: hover.background
			},
			'&.ant-select-item-option-selected': {
				background: selected.background,
				color: selected.color
			},
			color
		}
	}
}
