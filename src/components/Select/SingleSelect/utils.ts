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
	option: {
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
