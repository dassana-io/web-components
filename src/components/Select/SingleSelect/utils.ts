import { createUseStyles } from 'react-jss'
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

const { borderRadius } = styleguide

const generateThemedSelectedItemStyles = (themeType: ThemeType) => {
	const {
		base: { color }
	} = themedStyles[themeType]

	return {
		'&.ant-select-single .ant-select-selector .ant-select-selection-item > div:first-child':
			{
				paddingLeft: '0 !important'
			},
		'&.ant-select-single.ant-select-open .ant-select-selection-item': {
			color
		}
	}
}

const disabledClasses =
	'&.ant-select-disabled.ant-select-single:not(.ant-select-customize-input)'
const focusedClasses =
	'&.ant-select-focused:not(.ant-select-disabled).ant-select-single:not(.ant-select-customize-input) .ant-select-selector'

const generateErrorStyles = (themeType: ThemeType) => ({
	'&$error': {
		'&:hover > .ant-select-selector, & > .ant-select-selector': {
			...fieldErrorStyles.error,
			border: `1px solid ${themedStyles[themeType].error.borderColor}`
		},
		[focusedClasses]: {
			...fieldErrorStyles.error,
			border: `1px solid ${themedStyles[themeType].error.borderColor}`
		}
	}
})

export const generateSelectStyles = (
	theme: ThemeType,
	additionalStyles?: Record<string, string>,
	includeError = true
) => ({
	'& .ant-select': {
		borderRadius,
		...generateThemedSelectStyles(theme),
		...generateThemedSelectedItemStyles(theme),
		'& .ant-select-selector': {
			...generateThemedInputStyles(theme),
			borderRadius
		},
		...(includeError ? generateErrorStyles(theme) : {}),
		[disabledClasses]: generateThemedDisabledStyles(theme),
		[focusedClasses]: generateThemedFocusedStyles(theme, includeError),
		...additionalStyles
	}
})

export const useStyles = createUseStyles({
	container: ({ fullWidth, matchSelectedContentWidth }) => ({
		...generateSelectStyles(light, {
			minWidth: matchSelectedContentWidth || 'unset',
			width: matchSelectedContentWidth ? 'unset' : '100%'
		}),
		width:
			fullWidth || matchSelectedContentWidth ? '100%' : defaultFieldWidth
	}),
	dropdown: generateThemedDropdownStyles(light),
	error: {},
	hidden: {},
	option: {
		'&$hidden': { display: 'none' },
		...generateThemedOptionStyles(light)
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		...fieldErrorStyles['@global'],
		[`.${dark}`]: {
			'& $container': generateSelectStyles(dark),
			'& $dropdown': generateThemedDropdownStyles(dark),
			'& $option': generateThemedOptionStyles(dark)
		}
	}
})
