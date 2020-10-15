import colors from 'components/assets/styles/colors'
import {
	themedStyles,
	themes,
	ThemeType
} from 'components/assets/styles/themes'

const { blacks, whites } = colors

const { dark, light } = ThemeType

const togglePalette = {
	[dark]: {
		active: blacks['lighten-80'],
		disabled: blacks['lighten-30']
	},
	[light]: {
		active: whites.base,
		disabled: whites['darken-5']
	}
}

export const generateToggleStyles = (themeType: ThemeType) => {
	const palette = themes[themeType]
	const { base, disabled } = themedStyles[themeType]

	return {
		'&.ant-switch': {
			'& .ant-click-animating-node': {
				borderColor: 'none !important',
				boxShadow: 'none !important'
			},
			'& .ant-switch-handle': {
				'&::before': {
					backgroundColor: palette.state.inactive
				},
				left: 1,
				top: 1
			},
			'&.ant-switch-checked': {
				'& .ant-switch-handle': {
					'&::before': {
						backgroundColor: togglePalette[themeType].active
					},
					left: 'calc(100% - 18px - 1px)'
				},
				backgroundColor: palette.primary,
				borderColor: palette.primary
			},
			'&.ant-switch-disabled': {
				'& .ant-switch-handle': {
					'&::before': {
						backgroundColor: togglePalette[themeType].disabled
					}
				},
				'&.ant-switch-checked .ant-switch-handle': {
					'&::before': {
						backgroundColor: togglePalette[themeType].disabled
					}
				},
				backgroundColor: disabled.backgroundColor,
				borderColor: base.borderColor,
				opacity: 1
			},
			'&.ant-switch-small.ant-switch-checked': {
				'& .ant-switch-handle': {
					left: 'calc(100% - 12px - 1px)'
				}
			},
			'&:focus': {
				boxShadow: 'none'
			},
			backgroundColor: base.backgroundColor,
			border: `1px solid ${base.borderColor}`
		}
	}
}
