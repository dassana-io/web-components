import { styleguide, themedStyles, ThemeType } from '../assets/styles'

const { spacing } = styleguide

export const generateAccordionPanelStyles = (themeType: ThemeType) => {
	const { base } = themedStyles[themeType]

	const borderStyles = `1px solid ${base.borderColor}`

	return {
		'&:first-of-type': {
			borderTop: borderStyles
		},
		borderBottom: borderStyles,
		color: base.color,
		padding: spacing.m
	}
}
