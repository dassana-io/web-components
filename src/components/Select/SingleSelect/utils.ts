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
			...generateErrorStyles(light),
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
			'& $container': {
				'& .ant-select': {
					...generateThemedSelectStyles(dark),
					...generateThemedSelectedItemStyles(dark),
					'& .ant-select-selector': {
						...generateThemedInputStyles(dark)
					},
					...generateErrorStyles(dark),
					[disabledClasses]: generateThemedDisabledStyles(dark),
					[focusedClasses]: generateThemedFocusedStyles(dark)
				}
			},
			'& $dropdown': generateThemedDropdownStyles(dark),
			'& $option': generateThemedOptionStyles(dark)
		}
	}
})
