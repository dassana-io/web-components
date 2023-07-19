import { type ReactNode } from 'react'
import { styleguide, themedStyles, themes, ThemeType } from '../assets/styles'

const {
	colors: { blacks, grays }
} = styleguide

const { light, dark } = ThemeType

export interface CommonMenuProps {
	classes?: string[]
	children: ReactNode
	name: string
}

export const commonListStyles = {
	'& > li': {
		display: 'block',
		listStyleType: 'none'
	},
	marginBlockEnd: 0,
	marginBlockStart: 0,
	paddingInlineStart: 0
}

const menuItemPalette = {
	[dark]: {
		activeBg: blacks['darken-40'],
		hoverBg: blacks['darken-20']
	},
	[light]: {
		activeBg: grays.base,
		hoverBg: grays['lighten-40']
	}
}

export const generateThemedMenuItemStyles = (themeType: ThemeType) => {
	const {
		base: { color }
	} = themedStyles[themeType]

	const { hoverBg } = menuItemPalette[themeType]

	return {
		'&:hover': {
			backgroundColor: hoverBg
		},
		color
	}
}

export const generateThemedMenuItemActiveStyles = (themeType: ThemeType) => {
	const {
		state: { active }
	} = themes[themeType]

	const { activeBg } = menuItemPalette[themeType]

	return {
		'&:hover': { backgroundColor: activeBg },
		backgroundColor: activeBg,
		borderRightColor: active,
		color: active
	}
}
