import { createUseStyles } from 'react-jss'
import { styleguide } from 'components/assets/styles/styleguide'
import { ThemeType } from 'components/assets/styles/themes'
import { type ShortcutKey, type ShortcutKeyItem } from './types'

const { dark } = ThemeType

const {
	colors: { blacks },
	font,
	fontWeight,
	spacing
} = styleguide

export const predefinedKeysMap = {
	alt: '⌥',
	cmd: '⌘',
	ctrl: '⌃',
	enter: '↵',
	esc: '⎋',
	shift: '⇧'
}

export const getShortcutKeyItem = (shortcut: ShortcutKey): ShortcutKeyItem => {
	if (typeof shortcut !== 'string') {
		return shortcut
	} else {
		return {
			icon: predefinedKeysMap[shortcut],
			text: shortcut
		}
	}
}

export const useStyles = createUseStyles({
	icon: {
		color: blacks['lighten-30']
	},
	keyName: {
		...font.body,
		fontWeight: fontWeight.regular
	},
	label: {
		...font.label,
		fontWeight: fontWeight.light
	},
	shortcutMicrocopy: {
		display: 'inline-block',
		paddingLeft: spacing.m
	},
	wrapper: {
		color: blacks['lighten-50'],
		whiteSpace: 'nowrap'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $icon': {
				color: blacks['lighten-70']
			}
		}
	}
})
