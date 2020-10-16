import { styleguide, themedStyles, ThemeType } from 'components/assets/styles'

const { blacks } = styleguide.colors

const { dark, light } = ThemeType

const buttonPalette = {
	[dark]: {
		color: blacks['lighten-30'],
		disabledBgColor: blacks.base,
		hoverColor: blacks['lighten-50'],
		primaryBackgroundColor: blacks['lighten-30'],
		primaryDisabledBgColor: blacks['lighten-10'],
		primaryDisabledTextColor: blacks['darken-20'],
		primaryHoverBgColor: blacks['lighten-40']
	},
	[light]: {
		color: blacks['lighten-30'],
		disabledBgColor: blacks['lighten-90'],
		hoverColor: blacks['darken-20'],
		primaryBackgroundColor: blacks.base,
		primaryDisabledBgColor: blacks['lighten-90'],
		primaryDisabledTextColor: blacks['lighten-80'],
		primaryHoverBgColor: blacks['lighten-50']
	}
}

export const generateButtonStyles = (themeType: ThemeType) => {
	const { base, disabled } = themedStyles[themeType]

	const {
		color,
		disabledBgColor,
		hoverColor,
		primaryBackgroundColor,
		primaryDisabledBgColor,
		primaryDisabledTextColor,
		primaryHoverBgColor
	} = buttonPalette[themeType]

	const baseButtonStyles = {
		borderColor: base.borderColor,
		borderRadius: 4,
		color
	}

	const activeStyles = {
		borderColor: hoverColor,
		color: hoverColor
	}

	return {
		'&.ant-btn': {
			'&:hover': activeStyles,
			backgroundColor: base.backgroundColor,
			...baseButtonStyles,
			'&.ant-btn-primary': {
				'&.ant-btn-disabled, &.ant-btn[disabled]': {
					'&:hover': {
						backgroundColor: primaryDisabledBgColor,
						color: primaryDisabledTextColor
					},
					backgroundColor: primaryDisabledBgColor,
					borderColor: primaryDisabledBgColor,
					color: primaryDisabledTextColor
				},
				'&:hover': {
					backgroundColor: primaryHoverBgColor,
					borderColor: primaryHoverBgColor,
					color: blacks['lighten-80']
				},
				backgroundColor: primaryBackgroundColor,
				color: blacks['lighten-80']
			}
		},
		'&.ant-btn-active': { ...baseButtonStyles, ...activeStyles },
		'&.ant-btn-disabled, &.ant-btn[disabled]': {
			'&:hover': {
				backgroundColor: disabledBgColor,
				borderColor: base.borderColor,
				color: disabled.color
			},
			backgroundColor: disabledBgColor,
			color: disabled.color
		},
		'&.ant-btn-focused, &.ant-btn:focus': activeStyles
	}
}
