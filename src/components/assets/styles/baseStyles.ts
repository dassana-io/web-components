import { ColorManipulationTypes, manipulateColor } from '../../utils'
import { dassanaBlues, dassanaGrays } from './colors'
import { Theme, themes, ThemesType } from './themes'

export const generateBaseStyles = ({ background, primary, text }: Theme) => {
	const base = {
		bgColor: background,
		borderColor: dassanaGrays[6],
		color: text.primary
	}

	const disabled = {
		bgColor: dassanaGrays[3],
		color: text.disabled
	}

	const hover = {
		borderColor: dassanaBlues[5]
	}

	const focus = {
		...hover,
		boxShadow: `0px 0px 4px ${manipulateColor(
			primary,
			50,
			ColorManipulationTypes.fade
		)}`
	}

	const placeholder = {
		color: text.disabled
	}

	return { base, disabled, focus, hover, placeholder }
}

const { dark, light } = ThemesType

export const generalColors = {
	[ThemesType.dark]: generateBaseStyles(themes[dark]),
	[ThemesType.light]: generateBaseStyles(themes[light])
}
