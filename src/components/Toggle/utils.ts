import colors from 'components/assets/styles/colors'
import { ThemeType } from 'components/assets/styles/themes'

const { blacks, blues, grays, whites } = colors

const { dark, light } = ThemeType

const togglePalette = {
	[dark]: {
		active: {
			primary: blues.base,
			secondary: blacks['lighten-80']
		},
		disabled: {
			primary: blacks['lighten-10'],
			secondary: blacks['lighten-20']
		},
		focus: {
			primary: blacks['lighten-10'],
			secondary: blacks.base
		},
		inactive: {
			primary: blacks['lighten-10'],
			secondary: blacks['lighten-30']
		}
	},
	[light]: {
		active: { primary: blues.base, secondary: whites.base },
		disabled: {
			primary: blacks['lighten-80'],
			secondary: grays.base
		},
		focus: {
			primary: blacks['lighten-80'],
			secondary: grays.base
		},
		inactive: {
			primary: blacks['lighten-80'],
			secondary: whites.base
		}
	}
}

export const generateToggleStyles = (themeType: ThemeType) => {
	const { active, inactive, focus, disabled } = togglePalette[themeType]

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
				'&:focus': {
					boxShadow: `0 0 0 3px ${focus.primary}`
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
				'&:hover': {
					boxShadow: `0 0 0 3px ${focus.secondary}`
				},
				boxShadow: `0 0 0 3px ${focus.secondary}`
			},
			backgroundColor: inactive.primary
		}
	}
}
