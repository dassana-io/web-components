import { themes, type ThemeType } from 'components/assets/styles'

export const generateThemedDropdownMenuSpinnerStyles = (theme: ThemeType) => ({
	color: themes[theme].text.primary
})
