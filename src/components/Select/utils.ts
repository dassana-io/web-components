import { createUseStyles } from 'react-jss'
import {
	defaultFieldWidth,
	fieldErrorStyles,
	styleguide
} from '../assets/styles/styleguide'
import { themedStyles, ThemeType } from '../assets/styles/themes'

const { dark, light } = ThemeType

const {
	borderRadius,
	colors: { blacks, grays, whites },
	flexAlignCenter,
	fontWeight
} = styleguide

const selectPalette = {
	[dark]: {
		base: {
			background: blacks['darken-40']
		},
		input: {
			default: {
				borderColor: blacks['lighten-20']
			},
			disabled: {
				background: blacks['darken-20']
			}
		},
		option: {
			hover: {
				background: blacks['lighten-10']
			},
			selected: {
				background: blacks['lighten-30'],
				color: whites.base
			}
		}
	},
	[light]: {
		base: {
			background: whites.base
		},
		input: {
			default: {
				borderColor: blacks['lighten-80']
			},
			disabled: {
				background: grays['lighten-70']
			}
		},
		option: {
			hover: {
				background: grays['lighten-40']
			},
			selected: {
				background: grays.base,
				color: blacks.base
			}
		}
	}
}

export const generateThemedDisabledStyles = (themeType: ThemeType) => {
	const {
		disabled: { color, borderColor }
	} = themedStyles[themeType]

	const { background } = selectPalette[themeType].input.disabled
	return {
		'& .ant-select-arrow': { color },
		'& .ant-select-selector': {
			background,
			borderColor,
			color
		}
	}
}

export const generateThemedDropdownStyles = (themeType: ThemeType) => {
	const { background } = selectPalette[themeType].base

	return { background }
}

export const generateThemedFocusedStyles = (themeType: ThemeType) => {
	const { focus } = themedStyles[themeType]

	return {
		borderColor: focus.borderColor,
		boxShadow: 'none'
	}
}

export const generateThemedInputStyles = (themeType: ThemeType) => {
	const { background } = selectPalette[themeType].base
	const { borderColor } = selectPalette[themeType].input.default

	return {
		background,
		borderColor
	}
}

export const generateThemedOptionStyles = (themeType: ThemeType) => {
	const {
		base: { color }
	} = themedStyles[themeType]

	const { hover, selected } = selectPalette[themeType].option

	return {
		'&.ant-select-item-option': {
			'&.ant-select-item-option-active': {
				background: hover.background
			},
			'&.ant-select-item-option-selected': {
				background: selected.background,
				color: selected.color,
				fontWeight: fontWeight.regular
			},
			color,
			fontWeight: fontWeight.light
		}
	}
}

export const generateThemedSelectStyles = (themeType: ThemeType) => {
	const {
		base: { color },
		hover,
		placeholder
	} = themedStyles[themeType]

	return {
		'& .ant-select-arrow': { color },
		'& .ant-select-selection-placeholder': { color: placeholder.color },
		'&:not(.ant-select-disabled):hover .ant-select-selector': {
			borderColor: hover.borderColor
		},
		color,
		fontWeight: fontWeight.light
	}
}

const generateThemedSelectedItemStyles = (themeType: ThemeType) => {
	const {
		base: { color }
	} = themedStyles[themeType]

	return {
		'&.ant-select-single.ant-select-open .ant-select-selection-item': {
			color
		}
	}
}

const disabledClasses =
	'&.ant-select-disabled.ant-select-single:not(.ant-select-customize-input)'
const focusedClasses =
	'&.ant-select-focused:not(.ant-select-disabled).ant-select-single:not(.ant-select-customize-input) .ant-select-selector'

export const useStyles = createUseStyles({
	container: ({ fullWidth, matchSelectedContentWidth }) => ({
		'& .ant-select': {
			borderRadius,
			...generateThemedSelectStyles(light),
			...generateThemedSelectedItemStyles(light),
			'& .ant-select-selector': {
				...generateThemedInputStyles(light),
				borderRadius
			},
			'&$error > .ant-select-selector': {
				border: `1px solid ${themedStyles[light].error.borderColor}`
			},
			[disabledClasses]: generateThemedDisabledStyles(light),
			[focusedClasses]: generateThemedFocusedStyles(light),
			minWidth: matchSelectedContentWidth
				? matchSelectedContentWidth
				: 'unset',
			width: matchSelectedContentWidth ? 'unset' : '100%'
		},
		width:
			fullWidth || matchSelectedContentWidth ? '100%' : defaultFieldWidth
	}),
	dropdown: generateThemedDropdownStyles(light),
	error: { ...fieldErrorStyles.error },
	icon: {
		...flexAlignCenter,
		paddingRight: 7.5
	},
	option: {
		...flexAlignCenter,
		...generateThemedOptionStyles(light)
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		...fieldErrorStyles['@global'],
		[`.${dark}`]: {
			'& $container': {
				'& .ant-select': {
					...generateThemedSelectStyles(dark),
					...generateThemedSelectedItemStyles(dark),
					'& .ant-select-selector': {
						...generateThemedInputStyles(dark)
					},
					'&$error > .ant-select-selector': {
						border: `1px solid ${themedStyles[dark].error.borderColor}`
					},
					[disabledClasses]: generateThemedDisabledStyles(dark),
					[focusedClasses]: generateThemedFocusedStyles(dark)
				}
			},
			'& $dropdown': generateThemedDropdownStyles(dark),
			'& $option': generateThemedOptionStyles(dark)
		}
	}
})