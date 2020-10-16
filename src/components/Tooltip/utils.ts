import colors from 'components/assets/styles/colors'
import { styleguide } from 'components/assets/styles/styleguide'
import { ThemeType } from 'components/assets/styles/themes'

const { blacks, whites } = colors

const { borderRadius } = styleguide

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
					'& > .ant-tooltip-arrow-content': {
						backgroundColor: background,
						boxShadow: 'none'
					},
					backgroundColor: 'none'
				},
				'& > .ant-tooltip-inner': {
					backgroundColor: background,
					borderRadius,
					color: whites.base,
					fontWeight: 300
				}
			}
		}
	}
}
