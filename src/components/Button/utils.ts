import { styleguide, themedStyles, ThemeType } from 'components/assets/styles'

const {
	borderRadius,
	colors: { blacks, grays }
} = styleguide

const { dark, light } = ThemeType

export const buttonPalette = {
	[dark]: {
		color: blacks['lighten-50'],
		disabledBgColor: blacks.base,
		hoverColor: blacks['lighten-80'],
		primaryBackgroundColor: blacks['lighten-30'],
		primaryDisabledBgColor: blacks['lighten-10'],
		primaryDisabledTextColor: blacks['darken-20'],
		primaryHoverBgColor: blacks['lighten-40']
	},
	[light]: {
		color: blacks['lighten-30'],
		disabledBgColor: grays.base,
		hoverColor: blacks['darken-20'],
		primaryBackgroundColor: blacks.base,
		primaryDisabledBgColor: grays.base,
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
		borderRadius,
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
