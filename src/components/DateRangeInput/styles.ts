import { generateTimePanelColumnStyles } from '../TimeInput/utils'
import { generateThemedIconBtnStyles } from '../IconButton/utils'
import {
	dropdownStyles,
	inputPalette,
	styleguide,
	themedStyles,
	ThemeType
} from 'components/assets/styles'

const {
	borderRadius,
	colors: { blacks, grays, whites }
} = styleguide

const { dark, light } = ThemeType

// ------------------------------------------

const activeBarPalette = {
	[dark]: {
		background: grays.base
	},
	[light]: {
		background: blacks.base
	}
}

const generateActiveBarStyles = (themeType: ThemeType) => {
	const { background } = activeBarPalette[themeType]

	return {
		'& .ant-picker-active-bar': { background }
	}
}

// ------------------------------------------

const datePanelPalette = {
	[dark]: {
		hover: { selected: { background: blacks['lighten-80'] } },
		range: { background: grays.base, color: blacks.base },
		selectedDays: {
			background: blacks['lighten-50'],
			color: whites.base,
			hover: { background: blacks['lighten-40'] }
		}
	},
	[light]: {
		hover: { selected: { background: blacks['lighten-80'] } },
		range: { background: grays.base, color: blacks.base },
		selectedDays: {
			background: blacks['lighten-50'],
			color: whites.base,
			hover: { background: blacks['lighten-40'] }
		}
	}
}

const generateDatePanelHeaderStyles = (themeType: ThemeType) => {
	return {
		'& .ant-picker-header': {
			color: 'red !important',
			'& button': generateThemedIconBtnStyles(themeType)
		}
	}
}

// #cbe6ff
// &.ant-picker-cell-range-start:not(.ant-picker-cell-range-start-single)::before, &.ant-picker-cell-range-end:not(.ant-picker-cell-range-end-single)::before
const generateDatePanelStyles = (themeType: ThemeType) => {
	const {
		base: { borderColor, color }
	} = themedStyles[themeType]

	const { hover, range, selectedDays } = datePanelPalette[themeType]

	return {
		'& .ant-picker-date-panel': {
			// ...generateDatePanelHeaderStyles(themeType),
			'& .ant-picker-cell-in-range.ant-picker-cell-range-hover-start .ant-picker-cell-inner::after, & .ant-picker-cell-in-range.ant-picker-cell-range-hover-end .ant-picker-cell-inner::after': {
				// background: `${range.background} !important`
				background: hover.selected.background
				// background: 'red !important'
			},
			'& .ant-picker-cell-in-view': {
				'&.ant-picker-cell-in-range.ant-picker-cell-range-hover::before, &.ant-picker-cell-range-start.ant-picker-cell-range-hover::before, &.ant-picker-cell-range-end.ant-picker-cell-range-hover::before, & .ant-picker-cell-range-start:not(.ant-picker-cell-range-start-single).ant-picker-cell-range-hover-start::before, &.ant-picker-cell-range-end:not(.ant-picker-cell-range-end-single).ant-picker-cell-range-hover-end::before, &.ant-picker-cell-in-range.ant-picker-cell-range-hover-start::before, &.ant-picker-cell-in-range.ant-picker-cell-range-hover-end::before': {
					// background: `${range.background} !important`
					background: hover.selected.background
					// background: 'red !important'
				},
				'&.ant-picker-cell-in-range::before, &.ant-picker-cell-range-start:not(.ant-picker-cell-range-start-single)::before, &.ant-picker-cell-range-end:not(.ant-picker-cell-range-end-single)::before': {
					background: range.background
				},
				'&.ant-picker-cell-selected .ant-picker-cell-inner, &.ant-picker-cell-range-start .ant-picker-cell-inner, &.ant-picker-cell-range-end .ant-picker-cell-inner': {
					background: selectedDays.background
				},
				color
			},
			'& .ant-picker-header': {
				borderBottomColor: borderColor
			}
		}
	}
}

export const generateDropdownStyles = (themeType: ThemeType) => {
	const {
		base: { background, boxShadow }
	} = dropdownStyles[themeType]

	const {
		base: { borderColor, color }
	} = themedStyles[themeType]
	return {
		'&.ant-picker-dropdown.ant-picker-dropdown-range > .ant-picker-range-wrapper': {
			'& .ant-picker-panel-container': {
				'& .ant-picker-panels': {
					'& .ant-picker-panel': {
						...generateDatePanelStyles(themeType),
						'& .ant-picker-time-panel': {
							'& .ant-picker-content': generateTimePanelColumnStyles(
								themeType
							),
							'& .ant-picker-header': {
								borderBottomColor: borderColor
							},
							background,
							borderLeftColor: borderColor
						},
						borderBottomColor: borderColor
					}
				},
				background,
				boxShadow,
				color
			}
		}
	}
}

export const generateDateRangeInputStyles = (themeType: ThemeType) => {
	const {
		base: { color },
		focus,
		hover
	} = themedStyles[themeType]

	const {
		base: { background, borderColor }
	} = inputPalette[themeType]

	return {
		'& .ant-picker-input': {
			'& > input': { color }
		},
		'&.ant-picker.ant-picker-range': {
			...generateActiveBarStyles(themeType),
			'&.ant-picker-focused, &:focus': {
				borderColor: focus.borderColor,
				boxShadow: 'none'
			},
			'&:hover': {
				borderColor: hover.borderColor,
				boxShadow: 'none'
			},
			background,
			borderColor,
			borderRadius
		}
	}
}

/* 
& .ant-picker-cell-in-view.ant-picker-cell-in-range.ant-picker-cell-range-hover::before, & .ant-picker-cell-in-view.ant-picker-cell-range-start.ant-picker-cell-range-hover::before, & .ant-picker-cell-in-view.ant-picker-cell-range-end.ant-picker-cell-range-hover::before, & .ant-picker-cell-in-view.ant-picker-cell-range-start:not(.ant-picker-cell-range-start-single).ant-picker-cell-range-hover-start::before, & .ant-picker-cell-in-view.ant-picker-cell-range-end:not(.ant-picker-cell-range-end-single).ant-picker-cell-range-hover-end::before
*/
