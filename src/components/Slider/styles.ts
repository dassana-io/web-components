import { createUseStyles } from 'react-jss'
import { styleguide, ThemeType } from 'components/assets/styles'

const { dark } = ThemeType

const {
	colors: { blacks, blues, grays },
	flexJustifyCenter,
	spacing
} = styleguide

const commonSliderStyles = {
	borderRadius: '8px',
	height: 14
}

const sliderPalette = {
	[dark]: {
		handleColor: grays.base,
		railColor: blacks['lighten-30'],
		trackColor: blues.base
	}
}

export const useSliderStyles = createUseStyles({
	slider: {
		'& .ant-slider-dot': {
			display: 'none'
		},
		'& .ant-slider-handle': {
			border: 'none',
			height: 24,
			width: 24
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
		}
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
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
