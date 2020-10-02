import { fadeColor } from '../utils'
import { fieldErrorStyles } from '../assets/styles/styleguide'
import { dassanaBlues, dassanaGrays } from '../assets/styles/colors'
import {
	generateThemeVars,
	PaletteType,
	ThemesType
} from '../assets/styles/themes'

export const generateInputCSSVals = ({
	background,
	primary,
	text
}: PaletteType) => {
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
		boxShadow: `0px 0px 4px ${fadeColor(primary, 50)}`
	}

	const placeholder = {
		color: text.disabled
	}

	return { base, disabled, focus, hover, placeholder }
}

export const generateInputStyles = (themeType: ThemesType) => {
	const { base, disabled, focus, hover, placeholder } = generateInputCSSVals(
		generateThemeVars(themeType)
	)

	return {
		'&.ant-input': {
			'&::placeholder': {
				color: placeholder.color
			},
			'&:hover': {
				borderColor: hover.borderColor
			},
			backgroundColor: base.bgColor,
			borderColor: base.borderColor,
			color: base.color
		},
		'&.ant-input-disabled, &.ant-input[disabled]': {
			'&:hover': {
				borderColor: base.borderColor
			},
			backgroundColor: disabled.bgColor
		},
		'&.ant-input-focused, &.ant-input:focus': {
			borderColor: focus.borderColor,
			boxShadow: focus.boxShadow
		},
		'&.ant-input.error': fieldErrorStyles.error
	}
}
