import colors from 'components/assets/styles/colors'
import { ThemeType } from 'components/assets/styles/themes'

const { blacks, grays, whites } = colors

const { dark, light } = ThemeType

const togglePalette = {
	[dark]: {
		active: {
			primary: blacks['lighten-30'],
			secondary: grays.base
		},
		disabled: {
			primary: blacks['lighten-10'],
			secondary: blacks.base
		},
		inactive: {
			primary: blacks['lighten-10'],
			secondary: blacks['lighten-30']
		}
	},
	[light]: {
		active: { primary: blacks.base, secondary: whites.base },
		disabled: {
			primary: blacks['lighten-80'],
			secondary: grays.base
		},
		inactive: {
			primary: blacks['lighten-50'],
			secondary: whites.base
		}
	}
}

export const generateToggleStyles = (themeType: ThemeType) => {
	const { active, inactive, disabled } = togglePalette[themeType]

	return {
		'&.ant-switch': {
			'& .ant-click-animating-node': {
				borderColor: 'none !important',
				boxShadow: 'none !important'
			},
			'& .ant-switch-handle': {
				'&::before': {
					backgroundColor: inactive.secondary
				}
			},
			'&.ant-switch-checked': {
				'& .ant-switch-handle': {
					'&::before': {
						backgroundColor: active.secondary
					},
					left: 'calc(100% - 18px - 2px)'
				},
				backgroundColor: active.primary
			},
			'&.ant-switch-disabled': {
				'& .ant-switch-handle': {
					'&::before': {
						backgroundColor: disabled.secondary
					}
				},
				'&.ant-switch-checked .ant-switch-handle': {
					'&::before': {
						backgroundColor: disabled.secondary
					}
				},
				backgroundColor: disabled.primary,
				opacity: 1
			},
			'&.ant-switch-small.ant-switch-checked': {
				'& .ant-switch-handle': {
					left: 'calc(100% - 12px - 2px)'
				}
			},
			'&:focus': {
				boxShadow: 'none'
			},
			backgroundColor: inactive.primary
		}
	}
}
