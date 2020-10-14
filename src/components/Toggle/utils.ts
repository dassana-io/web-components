import { border } from 'components/assets/styles/styleguide'
import colors from 'components/assets/styles/colors'
import {
	themedStyles,
	themes,
	ThemeType
} from 'components/assets/styles/themes'

const { blacks, blues, whites } = colors

const { dark } = ThemeType

export const generateToggleStyles = (themeType: ThemeType) => {
	const palette = themes[themeType]
	const { base, disabled } = themedStyles[themeType]

	const activeHandleBgColor =
		themeType === dark ? blacks['lighten-80'] : whites.base

	const disabledHandleBgColor =
		themeType === dark ? blacks['lighten-30'] : whites['darken-5']

	const toggleActiveBgColor =
		themeType === dark ? blues['lighten-40'] : blues['lighten-50']

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
						backgroundColor: activeHandleBgColor
					},
					left: 'calc(100% - 18px - 1px)'
				},
				backgroundColor: toggleActiveBgColor,
				borderColor: toggleActiveBgColor
			},
			'&.ant-switch-disabled': {
				'& .ant-switch-handle': {
					'&::before': {
						backgroundColor: disabledHandleBgColor
					}
				},
				'&.ant-switch-checked .ant-switch-handle': {
					'&::before': {
						backgroundColor: disabledHandleBgColor
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
			border,
			borderColor: base.borderColor
		}
	}
}
