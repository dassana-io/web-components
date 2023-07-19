import { themedStyles, type ThemeType } from 'components/assets/styles'

export const generateThemedBannerStyles = (themeType: ThemeType) => {
	const {
		base: { backgroundColor, color }
	} = themedStyles[themeType]

	return {
		backgroundColor,
		color
	}
}
