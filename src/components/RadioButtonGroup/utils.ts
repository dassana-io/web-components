import { styleguide } from 'components/assets/styles/styleguide'
import { themedStyles, ThemeType } from 'components/assets/styles/themes'

const {
	borderRadius,
	colors: { blacks, grays }
} = styleguide

const { dark, light } = ThemeType

export const radioButtonGroupPalette = {
	[dark]: {
		active: { color: grays.base },
		base: {
			background: blacks['darken-40'],
			borderColor: blacks['lighten-10'],
			color: themedStyles[dark].base.color
		}
	},
	[light]: {
		active: { color: blacks.base },
		base: {
			background: grays.base,
			borderColor: blacks['lighten-60'],
			color: themedStyles[light].base.color
		}
	}
}

export const generateRadioButtonGroupStyles = (themeType: ThemeType) => {
	const {
		active,
		base: { background, borderColor, color }
	} = radioButtonGroupPalette[themeType]

	return {
		'&.ant-radio-group': {
			'& .ant-radio-button-wrapper': {
				'&.ant-radio-button-wrapper-checked': {
					'&:not([class*="ant-radio-button-wrapper-disabled"]).ant-radio-button-wrapper:first-child':
						{ borderRightColor: borderColor },
					backgroundColor: borderColor,
					color: active.color
				},
				'&:focus-within': { boxShadow: 'none' },
				'&:hover': {
					'&:not([class*="ant-radio-button-wrapper-disabled"])': {
						color: active.color
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
		borderRadius: borderRadius,
		display: 'flex',
		margin: '0 1px'
	}
}
