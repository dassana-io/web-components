import colors from 'components/assets/styles/colors'
import { themes, ThemeType } from '../assets/styles/themes'

const { blues } = colors

export const generateLinkStyles = (themeType: ThemeType) => {
	const palette = themes[themeType]

	return {
		'&.ant-typography': {
			'&:hover': {
				color: blues['lighten-60']
			},
			color: palette.primary
		}
	}
}
