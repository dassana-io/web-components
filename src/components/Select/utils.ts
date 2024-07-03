import {
	dropdownStyles,
	inputPalette,
	themedStyles,
	type ThemeType
} from '../assets/styles/themes'
import { fieldErrorStyles, styleguide } from '../assets/styles/styleguide'

const { fontWeight } = styleguide

export const generateThemedDisabledStyles = (themeType: ThemeType) => {
	const {
		base: { borderColor },
		disabled: { background, color }
	} = inputPalette[themeType]

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
	const {
		disabled: { color }
	} = themedStyles[themeType]

	const {
		base: { background, boxShadow }
	} = dropdownStyles[themeType]

	return {
		'&.ant-select-dropdown-empty .ant-select-item-empty, .ant-select-item-empty':
			{
				color
			},
		background,
		boxShadow
	}
}

export const generateThemedFocusedStyles = (
	themeType: ThemeType,
	includeError = true
) => {
	const { focus } = themedStyles[themeType]

	const themedFocusStyles: Record<string, any> = {
		borderColor: focus.borderColor,
		boxShadow: 'none'
	}

	if (includeError) {
		themedFocusStyles['&$error'] = {
			...fieldErrorStyles.error,
			border: `1px solid ${themedStyles[themeType].error.borderColor}`
		}
	}

	return themedFocusStyles
}

export const generateThemedInputStyles = (themeType: ThemeType) => {
	const {
		base: { color }
	} = themedStyles[themeType]

	const {
		base: { background, borderColor }
	} = inputPalette[themeType]

	return {
		'& .ant-select-selection-search > .ant-select-selection-search-input': {
			color
		},
		background,
		borderColor,
		color
	}
}

export const generateThemedOptionStyles = (themeType: ThemeType) => {
	const {
		base: { color },
		disabled
	} = themedStyles[themeType]

	const { hover, selected } = dropdownStyles[themeType]

	return {
		'&.ant-select-item-option': {
			'&.ant-select-item-option-active': {
				background: hover.background
			},
			'&.ant-select-item-option-disabled': {
				color: disabled.color
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

export const tooltipStyles = {
	'&.ant-tooltip': {
		'& > .ant-tooltip-content > .ant-tooltip-inner': {
			overflowWrap: 'normal'
		},
		maxWidth: 'unset',
		zIndex: 9999
	}
}
