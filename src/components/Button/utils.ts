import { themedStyles, themes, ThemeType } from '../assets/styles/themes'

export const generateButtonStyles = (themeType: ThemeType) => {
	const palette = themes[themeType]
	const { base, disabled } = themedStyles[themeType]

	const baseButtonStyles = {
		borderColor: base.borderColor,
		borderRadius: 4,
		color: base.color
	}

	return {
		'&.ant-btn': {
			'&:hover': {
				borderColor: palette.hover,
				color: palette.hover
			},
			backgroundColor: base.backgroundColor,
			...baseButtonStyles
		},
		'&.ant-btn-disabled, &.ant-btn[disabled]': {
			'&:hover': {
				backgroundColor: disabled.backgroundColor,
				borderColor: disabled.backgroundColor,
				color: disabled.color
			},
			backgroundColor: disabled.backgroundColor,
			borderColor: disabled.backgroundColor,
			color: disabled.color
		},
		'&.ant-btn-focused, &.ant-btn:focus': {
			borderColor: palette.hover,
			color: base.color
		},
		'&.ant-btn-primary': {
			...baseButtonStyles
		}
	}
}
