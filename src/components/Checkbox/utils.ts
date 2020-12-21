import { styleguide } from 'components/assets/styles'
import { themedStyles, ThemeType } from '../assets/styles/themes'

const { dark, light } = ThemeType

const {
	colors: { blacks, grays, whites }
} = styleguide

const checkboxPalette = {
	[dark]: {
		checked: { background: whites.base, checkmark: blacks['lighten-30'] },
		unchecked: {
			background: blacks['darken-40'],
			borderColor: blacks['lighten-10']
		}
	},
	[light]: {
		checked: { background: blacks.base, checkmark: grays.base },
		unchecked: {
			background: whites.base,
			borderColor: blacks['lighten-80']
		}
	}
}

export const generateThemedCheckboxStyles = (themeType: ThemeType) => {
	const { checked, unchecked } = checkboxPalette[themeType]

	const {
		base: { color },
		disabled,
		focus,
		hover
	} = themedStyles[themeType]

	return {
		'&.ant-checkbox-wrapper': {
			'& .ant-checkbox-checked': {
				'& .ant-checkbox-input:focus + .ant-checkbox-inner': {
					borderColor: checked.background
				},
				'&.ant-checkbox-disabled': {
					'& .ant-checkbox-inner': {
						backgroundColor: disabled.backgroundColor,
						borderColor: `${unchecked.borderColor} !important`
					},
					'&:hover .ant-checkbox-inner, .ant-checkbox-inner': {
						'&::after': { borderColor: disabled.color }
					}
				},
				'&:after': { border: 'none' },
				'&:hover .ant-checkbox-inner, .ant-checkbox-inner': {
					'&::after': { borderColor: checked.checkmark },
					backgroundColor: checked.background,
					borderColor: checked.background
				}
			},
			'& .ant-checkbox-disabled .ant-checkbox-inner': {
				backgroundColor: disabled.backgroundColor,
				borderColor: `${unchecked.borderColor} !important`
			},
			'& .ant-checkbox-inner': {
				background: unchecked.background,
				borderColor: unchecked.borderColor
			},
			'& .ant-checkbox-input:focus + .ant-checkbox-inner': {
				borderColor: focus.borderColor
			},
			'& .ant-checkbox:hover .ant-checkbox-inner ': {
				borderColor: checked.background
			},
			'&:hover .ant-checkbox-inner': {
				borderColor: hover.borderColor
			},
			color
		}
	}
}
