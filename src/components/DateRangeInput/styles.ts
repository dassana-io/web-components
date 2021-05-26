import { generateThemedIconBtnStyles } from '../IconButton/utils'
import { generateTimePanelColumnStyles } from '../TimeInput/utils'
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
		hover: { selected: { background: blacks['lighten-20'] } },
		prevNextMonth: blacks['lighten-20'],
		range: {
			background: dropdownStyles[dark].selected.background,
			color: blacks.base
		},
		selectedDays: {
			background: blacks['lighten-40'],
			color: whites.base,
			hover: { background: blacks['lighten-40'] }
		},
		weekHeader: blacks['lighten-60']
	},
	[light]: {
		hover: { selected: { background: blacks['lighten-80'] } },
		prevNextMonth: blacks['lighten-70'],
		range: {
			background: dropdownStyles[light].selected.background,
			color: blacks.base
		},
		selectedDays: {
			background: blacks['lighten-50'],
			color: whites.base,
			hover: { background: blacks['lighten-40'] }
		},
		weekHeader: blacks.base
	}
}

const generateDatePanelHeaderStyles = (themeType: ThemeType) => {
	const {
		base: { borderColor }
	} = themedStyles[themeType]

	return {
		'& .ant-picker-header': {
			'& button': generateThemedIconBtnStyles(themeType),
			borderBottomColor: borderColor
		}
	}
}

const generateDatePanelStyles = (themeType: ThemeType) => {
	const {
		base: { color },
		disabled
	} = themedStyles[themeType]

	const {
		hover,
		prevNextMonth,
		range,
		selectedDays,
		weekHeader
	} = datePanelPalette[themeType]

	const dashedBorderTopBottom = {
		borderBottom: `1px dashed ${selectedDays.background}`,
		borderTop: `1px dashed ${selectedDays.background}`
	}

	return {
		'& .ant-picker-date-panel': {
			...generateDatePanelHeaderStyles(themeType),
			'& .ant-picker-body': {
				'& .ant-picker-cell': {
					'&.ant-picker-cell-disabled': {
						'& .ant-picker-cell-inner': { color: disabled.color },
						'&::before': { background: disabled.backgroundColor }
					},
					'&:hover:not(.ant-picker-cell-in-view) .ant-picker-cell-inner, &:hover:not(.ant-picker-cell-selected):not(.ant-picker-cell-range-start):not(.ant-picker-cell-range-end):not(.ant-picker-cell-range-hover-start):not(.ant-picker-cell-range-hover-end) .ant-picker-cell-inner': {
						background: dropdownStyles[themeType].hover.background
					},
					color: prevNextMonth
				},
				'& .ant-picker-cell-in-view': {
					'&.ant-picker-cell-disabled': {
						'& .ant-picker-cell-inner': { color: disabled.color },
						'&::before': {
							background: disabled.backgroundColor
						}
					},
					'&.ant-picker-cell-end.ant-picker-cell-range-hover-edge-end.ant-picker-cell-range-hover-edge-end-near-range::after, &.ant-picker-cell-range-hover-edge-end:not(.ant-picker-cell-range-hover-edge-end-near-range)::after, &.ant-picker-cell-range-hover-end::after': {
						borderRight: `1px dashed ${selectedDays.background}`
					},
					'&.ant-picker-cell-in-range': {
						'&.ant-picker-cell-range-hover::before, &.ant-picker-cell-range-hover-start .ant-picker-cell-inner::after, &.ant-picker-cell-range-hover-end .ant-picker-cell-inner::after': {
							background: hover.selected.background
						}
					},
					'&.ant-picker-cell-in-range::before, &.ant-picker-cell-range-start:not(.ant-picker-cell-range-start-single)::before, &.ant-picker-cell-range-end:not(.ant-picker-cell-range-end-single)::before': {
						background: range.background
					},
					'&.ant-picker-cell-range-hover-end': {
						'&:not(.ant-picker-cell-in-range):not(.ant-picker-cell-range-start):not(.ant-picker-cell-range-end)::after, &.ant-picker-cell-range-start.ant-picker-cell-range-end.ant-picker-cell-range-start-near-hover::after, &.ant-picker-cell-range-end-single::after': dashedBorderTopBottom
					},
					'&.ant-picker-cell-range-hover-start': {
						'&:not(.ant-picker-cell-in-range):not(.ant-picker-cell-range-start):not(.ant-picker-cell-range-end)::after, &.ant-picker-cell-range-start.ant-picker-cell-range-end.ant-picker-cell-range-end-near-hover::after, &.ant-picker-cell-range-start-single::after': dashedBorderTopBottom
					},
					'&.ant-picker-cell-range-hover:not(.ant-picker-cell-in-range)::after': dashedBorderTopBottom,
					'&.ant-picker-cell-range-start.ant-picker-cell-range-hover::before, &.ant-picker-cell-range-end.ant-picker-cell-range-hover::before, &.ant-picker-cell-range-start:not(.ant-picker-cell-range-start-single).ant-picker-cell-range-hover-start::before, &.ant-picker-cell-range-end:not(.ant-picker-cell-range-end-single).ant-picker-cell-range-hover-end::before': {
						background: hover.selected.background
					},
					'&.ant-picker-cell-selected .ant-picker-cell-inner, &.ant-picker-cell-range-start .ant-picker-cell-inner, &.ant-picker-cell-range-end .ant-picker-cell-inner': {
						background: selectedDays.background
					},
					'&.ant-picker-cell-start.ant-picker-cell-range-hover-edge-start.ant-picker-cell-range-hover-edge-start-near-range::after, &.ant-picker-cell-range-hover-edge-start:not(.ant-picker-cell-range-hover-edge-start-near-range)::after, &.ant-picker-cell-range-hover-start::after': {
						borderLeft: `1px dashed ${selectedDays.background}`
					},
					'&.ant-picker-cell-today .ant-picker-cell-inner::before': {
						border: `1px solid ${disabled.color}`,
						borderRadius
					},
					color
				},
				'& .ant-picker-content': {
					'& th': {
						color: weekHeader
					},
					'& tr > .ant-picker-cell-in-view': {
						'&.ant-picker-cell-range-hover:first-child::after, &.ant-picker-cell-range-hover-end:first-child::after': {
							borderLeft: `1px dashed ${selectedDays.background}`
						},
						'&.ant-picker-cell-range-hover:last-child::after, &.ant-picker-cell-range-hover-start:last-child::after': {
							borderRight: `1px dashed ${selectedDays.background}`
						}
					}
				}
			}
		}
	}
}

const generateTimePanelStyles = (themeType: ThemeType) => {
	const {
		base: { background }
	} = dropdownStyles[themeType]

	const {
		base: { borderColor, color }
	} = themedStyles[themeType]

	return {
		'& .ant-picker-time-panel': {
			'& .ant-picker-content': generateTimePanelColumnStyles(themeType),
			'& .ant-picker-header': {
				borderBottomColor: borderColor,
				color
			},
			background,
			borderLeftColor: borderColor
		}
	}
}

const generateCarrotStyles = (themeType: ThemeType) => {
	const {
		base: { background }
	} = dropdownStyles[themeType]

	return {
		'& .ant-picker-range-arrow': {
			'&:after': {
				background,
				border: `1px solid ${background}`
			},
			background
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
		'&.ant-picker-dropdown': {
			'& .ant-picker-range-wrapper': {
				...generateCarrotStyles(themeType),
				'& .ant-picker-panel-container': {
					'& .ant-picker-panels': {
						'& .ant-picker-panel': {
							...generateDatePanelStyles(themeType),
							...generateTimePanelStyles(themeType),
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
}

export const generateDateRangeInputStyles = (themeType: ThemeType) => {
	const {
		base: { color },
		disabled,
		focus,
		placeholder,
		hover
	} = themedStyles[themeType]

	const {
		base: { background, borderColor }
	} = inputPalette[themeType]

	return {
		'& .ant-picker-input': {
			'& > input': {
				'&::placeholder': {
					color: placeholder.color
				},
				color
			}
		},
		'&.ant-picker.ant-picker-range': {
			...generateActiveBarStyles(themeType),
			'& .ant-picker-separator': { color },
			'& .ant-picker-suffix': {
				color: disabled.color
			},
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
