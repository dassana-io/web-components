import { border, borderRadius } from 'components/assets/styles/styleguide'
import { themedStyles, ThemeType } from 'components/assets/styles/themes'

export const generateRadioSkeletonStyles = (themeType: ThemeType) => {
	const { loading } = themedStyles[themeType]

	return {
		border,
		borderColor: loading.border,
		borderRadius: borderRadius,
		display: 'flex',
		margin: '0 1px'
	}
}
