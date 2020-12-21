import { styleguide } from 'components/assets/styles'
import { themedStyles, ThemeType } from '../assets/styles/themes'

const { dark, light } = ThemeType

const {
	colors: { blacks, grays }
} = styleguide

const tagPalette = {
	[dark]: {
		background: blacks['lighten-10'],
		borderColor: blacks['lighten-50'],
		color: blacks['lighten-80']
	},
	[light]: {
		background: blacks['lighten-80'],
		borderColor: grays.base,
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
