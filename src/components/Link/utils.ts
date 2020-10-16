import { themedStyles, ThemeType } from '../assets/styles/themes'

export const generateLinkStyles = (themeType: ThemeType) => {
	const { base, hover } = themedStyles[themeType]

	return {
		'&.ant-typography': {
			'&:hover': {
				color: hover.color
			},
			color: base.color
		}
	}
}
