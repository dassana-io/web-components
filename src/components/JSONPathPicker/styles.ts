import { createUseStyles } from 'react-jss'
import { styleguide, themedStyles, ThemeType } from '../assets/styles'

const {
	colors: { oranges },
	spacing
} = styleguide

const { light, dark } = ThemeType
const styles = {
	container: {
		color: themedStyles[light].base.color,
		// eslint-disable-next-line sort-keys
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
		background: oranges.base,
		cursor: 'pointer',
		display: 'inline-block',
		height: 10,
		width: 10
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': {
				color: themedStyles[dark].base.color
			}
		}
	}
}

export const useStyles = createUseStyles(styles)

export type Classes = Record<keyof typeof styles, string>
