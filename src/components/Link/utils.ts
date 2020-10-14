import colors from 'components/assets/styles/colors'
import { ThemeType } from '../assets/styles/themes'

const { blues } = colors

const { dark } = ThemeType

export const generateLinkStyles = (themeType: ThemeType) => {
	const linkColor =
		themeType === dark ? blues['lighten-40'] : blues['lighten-30']

	return {
		'&.ant-typography': {
			'&:hover': {
				color: blues['lighten-50']
			},
			color: linkColor
		}
	}
}
