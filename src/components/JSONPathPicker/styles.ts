import { createUseStyles } from 'react-jss'
import { styleguide, themedStyles, ThemeType } from '../assets/styles'

const { spacing } = styleguide

const styles = {
	container: {
		'& li': {
			listStyle: 'none',
			margin: 0,
			padding: 0
		}
	},
	jsonObj: {
		paddingLeft: spacing.l
	},
	pathPickerIcon: {
		display: 'inline-block',
		width: 10,
		height: 10,
		background: 'red',
		cursor: 'pointer'
	}
}

export const useStyles = createUseStyles(styles)

export type Classes = Record<keyof typeof styles, string>
