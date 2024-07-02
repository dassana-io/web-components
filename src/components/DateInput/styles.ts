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
	colors: { blacks, blues, grays, whites }
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
		base: { borderColor, color },
		disabled
	} = themedStyles[themeType]

	const { prevNextMonth } = datePanelPalette[themeType]

	return {
		'& .ant-picker-cell-selected .ant-picker-cell-inner': {
			backgroundColor: blues.base,
			color: `${whites.base} !important`
		},
		'& .ant-picker-date-panel': {
			...generateDatePanelHeaderStyles(themeType),
			'& .ant-picker-body': {
				'& .ant-picker-cell': {
					'&.ant-picker-cell-disabled': {
						'& .ant-picker-cell-inner': { color: disabled.color },
						'&::before': { background: disabled.backgroundColor }
					},
					'&:hover:not(.ant-picker-cell-in-view) .ant-picker-cell-inner, &:hover:not(.ant-picker-cell-selected):not(.ant-picker-cell-range-start):not(.ant-picker-cell-range-end):not(.ant-picker-cell-range-hover-start):not(.ant-picker-cell-range-hover-end) .ant-picker-cell-inner':
						{
							background:
								dropdownStyles[themeType].hover.background
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
					'&.ant-picker-cell-selected .ant-picker-cell-inner': {
						backgroundColor: blues.base
					},
					'&.ant-picker-cell-today .ant-picker-cell-inner::before': {
						border: `1px solid ${disabled.color}`,
						borderRadius
					},
					color
				}
			}
		},
		'& .ant-picker-footer': {
			'& .ant-picker-today-btn': {
				color: blues.base,
				cursor: 'pointer'
			},
			borderTopColor: borderColor
		},
		'& .ant-picker-month-panel, .ant-picker-decade-panel, .ant-picker-year-panel':
			{
				'& .ant-picker-header-view, .ant-picker-cell-inner, .ant-picker-header-super-prev-btn, .ant-picker-header-super-next-btn':
					{
						color
					},
				'& .ant-picker-header-view:hover, .ant-picker-decade-btn:hover, .ant-picker-year-btn:hover, .ant-picker-month-btn:hover':
					{
						color: blues.base
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
		'&.ant-picker-dropdown': {
			'& .ant-picker-panel-container': {
				'& .ant-picker-panel': {
					'& th': {
						color
					},
					...generateDatePanelStyles(themeType),
					borderBottomColor: borderColor
				},
				background,
				boxShadow,
				color
			},
			zIndex: 99999
		}
	}
}

export const generateDateInputStyles = (themeType: ThemeType) => {
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
		'&.ant-picker': {
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
