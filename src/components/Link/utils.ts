import { styleguide } from 'components/assets/styles/styleguide'
import { themedStyles, ThemeType } from 'components/assets/styles/themes'

const { fontWeight } = styleguide

export const generateLinkStyles = (themeType: ThemeType) => {
	const { base, hover } = themedStyles[themeType]

	return {
		'&.ant-typography': {
			'&:hover, &:focus': {
				color: hover.color,
				fontWeight: fontWeight.regular
			},
			color: base.color,
			fontWeight: fontWeight.light,
			transition: 'all 0.3s'
		}
	}
}
