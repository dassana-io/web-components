import { createUseStyles } from 'react-jss'
import Fuse from 'fuse.js'
import { MultiSelectProps } from './types'
import { SelectOption } from '../SingleSelect/types'
import sortBy from 'lodash/sortBy'
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

const filterOptions = (
	fuse: Fuse<SelectOption>,
	options: SelectOption[],
	value?: string
) => {
	if (!value) {
		return options
	}

	const filteredOptions = fuse
		.search(value)
		.map(({ item }: Fuse.FuseResult<SelectOption>): SelectOption => item)

	return filteredOptions
}

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
	option: generateThemedMSOptionStyles(light),
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
						'&.ant-select-disabled': generateThemedDisabledStyles(
							dark
						),
						...generateThemedSelectStyles(dark),
						...generateThemedTagStyles(dark),
						'& .ant-select-selector': {
							...generateThemedInputStyles(dark)
						},
						[focusedClasses]: generateThemedFocusedStyles(dark)
					}
				}
			},
			'& $dropdown': generateThemedDropdownStyles(dark),
			'& $option': generateThemedMSOptionStyles(dark)
		}
	}
})

export const groupOptions = (
	ungroupedOpts: SelectOption[],
	localValues: string[]
) => {
	const selected: SelectOption[] = []
	const unselected: SelectOption[] = []

	for (const opt of ungroupedOpts) {
		localValues.find(checkedVal => checkedVal === opt.value)
			? selected.push(opt)
			: unselected.push(opt)
	}

	return { selected, unselected }
}

const groupAndSortOptions = (
	ungroupedOpts: SelectOption[],
	localValues: string[]
) => {
	const { selected, unselected } = groupOptions(ungroupedOpts, localValues)

	return [
		...sortBy(selected, [option => option.text.toUpperCase()]),
		...sortBy(unselected, [option => option.text.toUpperCase()])
	]
}

// ----------------------------------------

interface GetSortedAndFilteredValuesArgs
	extends Pick<MultiSelectProps, 'onSearch' | 'options'> {
	fuse: Fuse<SelectOption>
	localValues: string[]
	searchTerm: string
}

export const getSortedAndFilteredValues = ({
	fuse,
	onSearch,
	options,
	localValues,
	searchTerm
}: GetSortedAndFilteredValuesArgs) => {
	const sortedValues = groupAndSortOptions(options, localValues)

	const sortedAndFilteredValues = onSearch
		? sortedValues
		: filterOptions(fuse, sortedValues, searchTerm)

	return sortedAndFilteredValues
}

// ----------------------------------------
