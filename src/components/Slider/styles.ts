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

interface StyleProps {
	highlightGreaterValues?: boolean
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
		'&.ant-slider': {
			'& .ant-slider-rail': {
				...commonSliderStyles,
				backgroundColor: ({ highlightGreaterValues }: StyleProps) =>
					sliderPalette[dark][
						highlightGreaterValues ? 'trackColor' : 'railColor'
					]
			},
			'& .ant-slider-track': {
				...commonSliderStyles,
				backgroundColor: ({ highlightGreaterValues }: StyleProps) =>
					sliderPalette[dark][
						highlightGreaterValues ? 'railColor' : 'trackColor'
					]
			},
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
				}
			}
		}
	}
})
