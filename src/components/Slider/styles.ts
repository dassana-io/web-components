import { createUseStyles } from 'react-jss'
import { styleguide, themes, ThemeType } from 'components/assets/styles'

const { dark, light } = ThemeType

const {
	colors: { blacks, blues, grays },
	flexJustifyCenter,
	font,
	spacing
} = styleguide

const commonSliderStyles = {
	borderRadius: '8px',
	height: 10
}

const sliderPalette = {
	[dark]: {
		handleColor: grays.base,
		railColor: blacks['lighten-30'],
		trackColor: blues.base
	}
}

export const useSliderStyles = createUseStyles({
	minMaxLabel: {
		...font.body,
		color: themes[light].text.primary
	},
	slider: {
		'& .ant-slider-dot': {
			display: 'none'
		},
		'& .ant-slider-handle': {
			border: 'none',
			borderRadius: 8,
			height: 20,
			width: 10
		},
		'& .ant-slider-mark-text': {
			'&:before': {
				...flexJustifyCenter,
				content: '"|"'
			},
			top: spacing['s+'],
			whiteSpace: 'nowrap'
		},
		'& .ant-slider-rail': {
			...commonSliderStyles
		},
		'& .ant-slider-track': {
			...commonSliderStyles
		},
		'&.ant-slider': {
			padding: '2px 0'
		}
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $minMaxLabel': {
				color: themes[dark].text.primary
			},
			'& $slider': {
				'& .ant-slider-handle': {
					backgroundColor: sliderPalette[dark].handleColor
				},
				'& .ant-slider-mark-text': {
					color: sliderPalette[dark].railColor
				},
				'& .ant-slider-rail': {
					backgroundColor: sliderPalette[dark].railColor
				},
				'& .ant-slider-track': {
					backgroundColor: sliderPalette[dark].trackColor
				}
			}
		}
	}
})
