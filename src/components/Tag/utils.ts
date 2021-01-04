import { styleguide } from 'components/assets/styles'
import { themedStyles, ThemeType } from '../assets/styles/themes'

const { dark, light } = ThemeType

const {
	colors: { blacks, grays }
} = styleguide

export const tagPalette = {
	[dark]: {
		background: blacks.base,
		borderColor: blacks['lighten-30'],
		color: blacks['lighten-60']
	},
	[light]: {
		background: grays.base,
		borderColor: blacks['lighten-80'],
		color: blacks.base
	}
}

export const generateThemedTagStyles = (themeType: ThemeType) => {
	const { background, borderColor, color } = tagPalette[themeType]

	const { base, hover } = themedStyles[themeType]

	return {
		'&.ant-tag': {
			'& .ant-tag-close-icon': {
				'&:hover': {
					color: hover.color
				},
				color: base.color
			},
			'&:hover': {
				opacity: 'unset'
			},
			background,
			borderColor,
			color,
			cursor: 'auto'
		}
	}
}
