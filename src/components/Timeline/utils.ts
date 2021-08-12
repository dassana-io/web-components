import { TimelineState } from './types'
import { styleguide, themedStyles, ThemeType } from '../assets/styles'

const { dark, light } = ThemeType
const {
	borderRadius,
	colors: { blacks }
} = styleguide

const separatorPalette = {
	[dark]: {
		base: blacks['lighten-20']
	},
	[light]: {
		base: blacks['lighten-80']
	}
}

export const getHeaderBorderRadius = ({ state }: { state: TimelineState }) => {
	const borderBottomRadius =
		state === TimelineState.collapsed ? borderRadius : 0

	return `${borderRadius}px ${borderRadius}px ${borderBottomRadius}px ${borderBottomRadius}px`
}

export const generateThemedChevronStyles = (themeType: ThemeType) => {
	const { base } = separatorPalette[themeType]

	return {
		color: base
	}
}

export const generateThemedConnectorStyles = (themeType: ThemeType) => {
	const { base } = separatorPalette[themeType]

	return {
		background: base
	}
}

export const generateThemedWrapperStyles = (themeType: ThemeType) => {
	const {
		base: { color }
	} = themedStyles[themeType]

	return {
		color: color
	}
}

export const generateThemedTimelineItemStyles = (themeType: ThemeType) => {
	const {
		base: { borderColor, color }
	} = themedStyles[themeType]

	return {
		border: `1px solid ${borderColor}`,
		color: color
	}
}

export const sharedTimelineItemStyles = {
	borderRadius,
	flexGrow: 1,
	height: '100%'
}
