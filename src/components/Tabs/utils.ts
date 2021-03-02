import { themedStyles, themes, ThemeType } from 'components/assets/styles'

export const generateThemedTabsListStyles = (themeType: ThemeType) => {
	const {
		base: { borderColor, color }
	} = themedStyles[themeType]

	return {
		borderBottomColor: borderColor,
		color
	}
}

export const generateThemedActiveTabStyles = (themeType: ThemeType) => {
	const { active } = themes[themeType].state

	return {
		borderBottomColor: active,
		color: active
	}
}
