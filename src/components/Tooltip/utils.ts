import { styleguide } from 'components/assets/styles/styleguide'
import { ThemeType } from 'components/assets/styles/themes'

const { borderRadius, colors, font } = styleguide
const { blacks, whites } = colors

const { dark, light } = ThemeType

const tooltipPalette = {
	[dark]: {
		background: blacks['lighten-10']
	},
	[light]: {
		background: blacks.base
	}
}

export const generateTooltipStyles = (themeType: ThemeType) => {
	const { background } = tooltipPalette[themeType]

	return {
		'& .ant-tooltip': {
			'& > .ant-tooltip-content': {
				'& > .ant-tooltip-arrow': {
					display: 'none'
				},
				'& > .ant-tooltip-inner': {
					...font.label,
					backgroundColor: background,
					borderRadius,
					color: whites.base,
					fontWeight: 300
				}
			}
		}
	}
}
