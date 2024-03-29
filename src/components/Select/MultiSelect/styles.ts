import { createUseStyles } from 'react-jss'
import { tagPalette } from '../../Tag/utils'
import {
	defaultFieldWidth,
	fieldErrorStyles,
	styleguide
} from '../../assets/styles/styleguide'
import {
	generateThemedDisabledStyles,
	generateThemedDropdownStyles,
	generateThemedFocusedStyles,
	generateThemedInputStyles,
	generateThemedOptionStyles,
	generateThemedSelectStyles
} from '../utils'
import { themedStyles, ThemeType } from '../../assets/styles/themes'

const { dark, light } = ThemeType

const { borderRadius, flexAlignCenter, fontWeight, spacing } = styleguide

const generateThemedTagStyles = (themeType: ThemeType) => {
	const { background, borderColor, color } = tagPalette[themeType]

	const { base, hover } = themedStyles[themeType]

	return {
		'& .ant-select-selection-item': {
			'& .ant-select-selection-item-remove': {
				'&:hover': {
					color: hover.color
				},
				color: base.color
			},
			background,
			borderColor,
			color,
			fontWeight: fontWeight.light
		}
	}
}

export const generateThemedMSOptionStyles = (themeType: ThemeType) => {
	const optionClasses = '&.ant-select-item-option'

	const optionStyles = generateThemedOptionStyles(themeType)[optionClasses]

	return {
		[optionClasses]: {
			'& .ant-select-item-option-content': { ...flexAlignCenter },
			'&.ant-select-item-option-active':
				optionStyles['&.ant-select-item-option-active'],
			'&.ant-select-item-option-selected': {
				...optionStyles['&.ant-select-item-option-selected'],
				background: 'transparent'
			},
			color: optionStyles.color,
			fontWeight: optionStyles.fontWeight
		}
	}
}

const focusedClasses =
	'&.ant-select-focused.ant-select-multiple:not(.ant-select-disabled) .ant-select-selector'

export const useDropdownStyles = createUseStyles({
	searchBar: {
		margin: 3 * spacing.xs,
		width: `calc(100% - ${6 * spacing.xs}px)`
	}
})

const generateErrorStyles = (themeType: ThemeType) => ({
	'&$error': {
		'&:hover > div.ant-select-selector, & > .ant-select-selector': {
			border: `1px solid ${themedStyles[themeType].error.borderColor}`
		}
	}
})

export const useStyles = createUseStyles({
	checkbox: { marginRight: spacing.s },
	container: ({ fullWidth, matchSelectedContentWidth }) => ({
		'& .ant-select': {
			'&.ant-select-multiple': {
				...generateErrorStyles(light),
				'&.ant-select-disabled': generateThemedDisabledStyles(light),
				...generateThemedSelectStyles(light),
				...generateThemedTagStyles(light),
				'& .ant-select-selector': {
					'& .ant-select-selection-overflow': {
						display: 'flex',
						flexWrap: matchSelectedContentWidth ? 'nowrap' : 'wrap'
					},
					'&:after': { width: 0 },
					...generateThemedInputStyles(light),
					borderRadius
				},
				[focusedClasses]: generateThemedFocusedStyles(light)
			},
			minWidth: matchSelectedContentWidth || 'unset',
			width: matchSelectedContentWidth ? 'unset' : '100%'
		},
		width:
			fullWidth || matchSelectedContentWidth ? '100%' : defaultFieldWidth
	}),
	dropdown: generateThemedDropdownStyles(light),
	error: { ...fieldErrorStyles.error },
	option: generateThemedMSOptionStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		...fieldErrorStyles['@global'],
		[`.${dark}`]: {
			'& $container': {
				'& .ant-select': {
					'&.ant-select-multiple': {
						...generateErrorStyles(dark),
						'&.ant-select-disabled':
							generateThemedDisabledStyles(dark),
						...generateThemedSelectStyles(dark),
						...generateThemedTagStyles(dark),
						'& .ant-select-selector': {
							...generateThemedInputStyles(dark)
						},
						[focusedClasses]: generateThemedFocusedStyles(dark)
					}
				}
			},
			'& $dropdown': {
				...generateThemedDropdownStyles(dark),
				'& .ant-select-item': {
					...generateThemedMSOptionStyles(dark)
				}
			},
			'& $option': generateThemedMSOptionStyles(dark)
		}
	}
})
