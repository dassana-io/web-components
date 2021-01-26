import { createUseStyles } from 'react-jss'
import { MultipleChoiceItemConfig } from './types'
import { styleguide, ThemeType } from 'components/assets/styles'

const { dark, light } = ThemeType

const {
	borderRadius,
	colors: { blacks, grays, whites },
	font,
	flexAlignCenter,
	flexCenter,
	spacing,
	fontWeight
} = styleguide

export const getInitialSelectedValue = (defaultSelected?: string) =>
	defaultSelected ? defaultSelected : ''

export const getInitialSelectedValues = (defaultSelected?: string[]) => {
	if (!defaultSelected) return {}

	const selectedKeysObj: Record<string, boolean> = {}

	defaultSelected.forEach(key => {
		selectedKeysObj[key] = true
	})

	return selectedKeysObj
}

export const getSelectedValuesArr = (
	items: MultipleChoiceItemConfig[],
	selectedKeys: Record<string, boolean>
) => items.filter(item => !!selectedKeys[item.value]).map(item => item.value)

export const isEnglishAlphabet = (str: string) =>
	str.length === 1 && /[a-z]/i.test(str)

/* ------ MultipleChoice Container Styles ------ */

export const gridGap = spacing.m

const generateContainerStyles = ({
	itemsCount,
	singleColumnItemsCount
}: {
	itemsCount: number
	singleColumnItemsCount: number
}) => {
	let styles = {}

	if (itemsCount > singleColumnItemsCount) {
		styles = {
			gridAutoFlow: 'row',
			gridGap,
			gridTemplateColumns: `calc(50% - ${gridGap / 2}px) calc(50% - ${
				gridGap / 2
			}px)`
		}
	}

	return styles
}

export const useStyles = createUseStyles({
	container: ({ items, singleColumnItemsCount }) => ({
		...generateContainerStyles({
			itemsCount: items.length,
			singleColumnItemsCount
		}),
		'&:focus': { outline: 'none' },
		backgroundColor: 'transparent',
		display: 'grid',
		overflow: 'auto',
		width: '100%'
	})
})

/* -x-x-x-x-x- MultipleChoiceItem Styles -x-x-x-x-x- */

const multipleChoiceItemPalette = {
	[dark]: {
		active: {
			border: blacks['lighten-30']
		},
		base: {
			background: blacks['darken-20'],
			border: blacks['lighten-10'],
			text: blacks['lighten-80']
		},
		hover: { background: blacks.base }
	},
	[light]: {
		active: {
			border: blacks['lighten-60']
		},
		base: {
			background: whites.base,
			border: blacks['lighten-80'],
			text: blacks['lighten-30']
		},
		hover: { background: grays['lighten-70'] }
	}
}

const keyPalette = {
	[dark]: {
		active: {
			background: whites.base,
			border: whites.base,
			text: blacks.base
		},
		base: {
			background: blacks['darken-40'],
			border: blacks['darken-40'],
			text: blacks['lighten-50']
		}
	},
	[light]: {
		active: {
			background: blacks['lighten-30'],
			border: blacks['lighten-30'],
			text: whites.base
		},
		base: {
			background: grays['lighten-40'],
			border: blacks['lighten-70'],
			text: blacks['lighten-30']
		}
	}
}

const generateThemedKeyStyles = (themeType: ThemeType) => {
	const {
		base: { background, border, text }
	} = keyPalette[themeType]

	return {
		background,
		borderColor: border,
		color: text
	}
}

const generateThemedMCItemStyles = (themeType: ThemeType) => {
	const {
		active,
		base: { background, border, text },
		hover
	} = multipleChoiceItemPalette[themeType]

	return {
		'&$activeItem': {
			'& $key': {
				background: keyPalette[themeType].active.background,
				borderColor: keyPalette[themeType].active.border,
				color: keyPalette[themeType].active.text
			},
			borderColor: active.border
		},
		'&$focused': {
			background: hover.background,
			borderColor: active.border,
			outline: 'none'
		},
		'&:focus': {
			outline: 'none'
		},
		'&:hover': {
			background: hover.background
		},
		background,
		borderColor: border,
		color: text
	}
}

export const itemHeight = 40
const keyDimension = 22

export const useMultipleChoiceItemStyles = createUseStyles({
	activeItem: {},
	checkmark: {
		position: 'absolute',
		right: spacing.s
	},
	focused: {},
	key: {
		...flexCenter,
		...font.label,
		...generateThemedKeyStyles(light),
		border: '1px solid',
		borderRadius: 2,
		fontWeight: fontWeight.regular,
		height: keyDimension,
		marginRight: spacing.s,
		minWidth: keyDimension,
		textAlign: 'center',
		width: keyDimension
	},
	label: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap'
	},
	multipleChoiceItem: {
		...flexAlignCenter,
		...font.body,
		...generateThemedMCItemStyles(light),
		'&:last-of-type': { marginBottom: 0 },
		border: '1px solid',
		borderRadius,
		cursor: 'pointer',
		fontWeight: fontWeight.light,
		height: itemHeight,
		marginBottom: ({ itemsCount, singleColumnItemsCount }) =>
			itemsCount > singleColumnItemsCount ? 0 : gridGap,
		minWidth: 100,
		padding: spacing.s,
		paddingRight: spacing.l, // to account for width of check mark
		position: 'relative'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $key': generateThemedKeyStyles(dark),
			'& $multipleChoiceItem': generateThemedMCItemStyles(dark)
		}
	}
})

/* -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x- */
