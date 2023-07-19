import { styleguide } from 'components/assets/styles/styleguide'
import {
	themedStyles,
	themes,
	ThemeType
} from 'components/assets/styles/themes'

const {
	borderRadius,
	colors: { blacks, grays, whites }
} = styleguide

const { dark, light } = ThemeType

export const radioButtonGroupPalette = {
	[dark]: {
		active: { background: blacks['lighten-10'], color: grays.base },
		base: {
			background: blacks['darken-40'],
			borderColor: blacks['lighten-10'],
			color: themedStyles[dark].base.color,
			hoverColor: grays.base
		}
	},
	[light]: {
		active: { background: blacks.base, color: grays.base },
		base: {
			background: whites.base,
			borderColor: grays.base,
			color: blacks['lighten-50'],
			hoverColor: blacks['lighten-30']
		}
	}
}

export const generateRadioButtonGroupStyles = (themeType: ThemeType) => {
	const {
		active,
		base: { background, borderColor, color, hoverColor }
	} = radioButtonGroupPalette[themeType]

	return {
		'&.ant-radio-group': {
			'& .ant-radio-button-wrapper': {
				'&.ant-radio-button-wrapper-checked': {
					'&:not([class*="ant-radio-button-wrapper-disabled"]).ant-radio-button-wrapper:first-child':
						{ borderRightColor: borderColor },
					backgroundColor: active.background,
					color: active.color
				},

				'&.ant-radio-button-wrapper-disabled': {
					background: themes[themeType].state.disabled.background
				},

				'&:focus-within': { boxShadow: 'none' },
				'&:hover': {
					'&:not([class*="ant-radio-button-wrapper-disabled"]):not([class*="ant-radio-button-wrapper-checked"])':
						{
							color: hoverColor
						}
				},
				'&:not(:first-child)::before': { backgroundColor: borderColor },
				background,
				borderColor,
				color
			},
			color
		},
		'&.ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover':
			{ borderColor }
	}
}

export const generateRadioSkeletonStyles = (themeType: ThemeType) => {
	const { loading } = themedStyles[themeType]

	return {
		border: `1px solid ${loading.borderColor}`,
		borderRadius,
		display: 'flex',
		margin: '0 1px'
	}
}
