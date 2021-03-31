import { themedStyles, ThemeType } from '../assets/styles'

export const generateTimelinePanelStyles = (themeType: ThemeType) => {
	const { base } = themedStyles[themeType]

	const borderStyles = `1px solid ${base.borderColor}`

	return {
		'&:first-of-type': {
			borderTop: borderStyles
		},
		borderBottom: borderStyles,
		color: base.color
	}
}
