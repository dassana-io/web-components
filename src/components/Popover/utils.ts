import { styleguide } from 'components/assets/styles/styleguide'
import { ColorManipulationTypes, manipulateColor } from '../utils'
import { themedStyles, ThemeType } from 'components/assets/styles/themes'

const {
	borderRadius,
	colors: { blacks, whites },
	fontWeight
} = styleguide

const { dark, light } = ThemeType

const { fade } = ColorManipulationTypes

const popoverPalette = {
	[dark]: {
		accent: manipulateColor(blacks['darken-40'], 72, fade),
		background: blacks['lighten-10'],
		text: {
			title: blacks['lighten-80']
		}
	},
	[light]: {
		accent: manipulateColor(blacks['lighten-30'], 72, fade),
		background: whites.base,
		text: {
			title: blacks.base
		}
	}
}

export const generatePopoverStyles = (themeType: ThemeType) => {
	const { base } = themedStyles[themeType]
	const { accent, background, text } = popoverPalette[themeType]

	return {
		'& .ant-popover': {
			'& > .ant-popover-content': {
				'& > .ant-popover-arrow': {
					boxShadow: 'none',
					display: 'none'
				},
				'& > .ant-popover-inner': {
					'& > .ant-popover-inner-content': {
						color: base.color,
						fontWeight: fontWeight.light,
						padding: 0
					},
					'& > .ant-popover-title': {
						borderBottomColor: base.borderColor,
						color: text.title,
						fontWeight: fontWeight.light
					},
					backgroundColor: background,
					borderRadius,
					boxShadow: 'none',
					color: base.color,
					fontWeight: fontWeight.light
				}
			},
			filter: `drop-shadow(0px 2px 8px ${accent})`
		}
	}
}
