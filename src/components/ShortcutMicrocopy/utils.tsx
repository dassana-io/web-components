import { createUseStyles } from 'react-jss'
import { styleguide } from 'components/assets/styles/styleguide'
import { ThemeType } from 'components/assets/styles/themes'
import { ShortcutKey, ShortcutKeyItem } from './types'

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

export const getShortcutKeyItem = (shortcut: ShortcutKey) => {
	const item: ShortcutKeyItem = {} as ShortcutKeyItem

	item.text = typeof shortcut === 'string' ? shortcut : shortcut.text

	item.icon =
		typeof shortcut === 'string'
			? predefinedKeysMap[shortcut]
			: shortcut.icon

	return item
}

export const useStyles = createUseStyles({
	icon: {
		color: blacks['lighten-30']
	},
	keyName: {
		...font.body,
		fontWeight: fontWeight.regular
	},
	label: { ...font.label, fontWeight: fontWeight.light },
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