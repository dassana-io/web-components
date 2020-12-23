import { createUseStyles } from 'react-jss'
import { tagPalette } from 'components/Tag/utils'
import {
	defaultFieldWidth,
	fieldErrorStyles,
	styleguide
} from '../assets/styles/styleguide'
import {
	generateThemedDisabledStyles,
	generateThemedDropdownStyles,
	generateThemedFocusedStyles,
	generateThemedInputStyles,
	generateThemedOptionStyles,
	generateThemedSelectStyles
} from 'components/Select/utils'
import { themedStyles, ThemeType } from '../assets/styles/themes'

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

const focusedClasses =
	'&.ant-select-focused:not(.ant-select-disabled) .ant-select-selector'

export const useStyles = createUseStyles({
	checkbox: { marginRight: spacing.s },
	container: ({ fullWidth, matchSelectedContentWidth }) => ({
		'& .ant-select': {
			'&$error > .ant-select-selector': {
				border: `1px solid ${themedStyles[light].error.borderColor}`
			},
			'&.ant-select-multiple': {
				'&.ant-select-disabled': generateThemedDisabledStyles(light),
				...generateThemedSelectStyles(light),
				...generateThemedTagStyles(light),
				'& .ant-select-selector': {
					...generateThemedInputStyles(light),
					borderRadius
				},
				[focusedClasses]: generateThemedFocusedStyles(light)
			},
			minWidth:
				matchSelectedContentWidth &&
				typeof matchSelectedContentWidth === 'number'
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
		...flexAlignCenter,
		...generateThemedOptionStyles(light)
	},
	searchBar: {
		margin: 3 * spacing.xs,
		width: `calc(100% - ${6 * spacing.xs}px)`
	},
	tag: {
		marginRight: spacing.xs
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		...fieldErrorStyles['@global'],
		[`.${dark}`]: {
			'& $container': {
				'& .ant-select': {
					'&$error > .ant-select-selector': {
						border: `1px solid ${themedStyles[dark].error.borderColor}`
					},
					'&.ant-select-multiple': {
						...generateThemedSelectStyles(dark),
						...generateThemedTagStyles(dark),
						'& .ant-select-selector': {
							...generateThemedInputStyles(dark)
						},
						'&.ant-select-disabled': generateThemedDisabledStyles(
							dark
						)
					}
				},
				'.ant-select-disabled.ant-select-multiple': generateThemedDisabledStyles(
					dark
				),
				[focusedClasses]: generateThemedFocusedStyles(dark)
			},
			'& $dropdown': generateThemedDropdownStyles(dark),
			'& $option': generateThemedOptionStyles(dark)
		}
	}
})
