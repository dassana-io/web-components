import omit from 'lodash/omit'
import {
	fieldErrorStyles,
	styleguide
} from 'components/assets/styles/styleguide'
import {
	inputPalette,
	themedStyles,
	type ThemeType
} from 'components/assets/styles/themes'

const { borderRadius, fontWeight } = styleguide

const generateCommonBaseStyles = (themeType: ThemeType) => {
	const {
		base: { color }
	} = themedStyles[themeType]

	const {
		base: { background, borderColor }
	} = inputPalette[themeType]

	return {
		'-webkit-text-fill-color': color,
		background,
		borderColor,
		borderRadius,
		color
	}
}

const generateCommonDisabledStyles = (themeType: ThemeType) => {
	const {
		base: { borderColor },
		disabled: { background, color }
	} = inputPalette[themeType]

	return {
		'&:hover': {
			borderColor
		},
		background,
		color
	}
}

const generateCommonFocusStyles = (themeType: ThemeType) => {
	const {
		focus: { borderColor }
	} = themedStyles[themeType]

	return {
		borderColor,
		boxShadow: 'none'
	}
}

const generateCommonHoverStyles = (themeType: ThemeType) => {
	const {
		hover: { borderColor }
	} = themedStyles[themeType]

	return {
		'&:hover': {
			borderColor,
			boxShadow: 'none'
		}
	}
}

export const generateCommonErrorStyles = (themeType: ThemeType) => {
	const {
		error: { borderColor }
	} = themedStyles[themeType]

	return {
		...fieldErrorStyles.error,
		'&:hover, &:focus': {
			borderColor
		},
		borderColor
	}
}

export const generateAddonStyles = (themeType: ThemeType) => ({
	'&.ant-input-affix-wrapper': {
		'&.ant-input-affix-wrapper-disabled':
			generateCommonDisabledStyles(themeType),
		...generateCommonBaseStyles(themeType),
		...generateCommonHoverStyles(themeType)
	},
	'&.ant-input-affix-wrapper-focused, &.ant-input-affix-wrapper:focus':
		generateCommonFocusStyles(themeType),
	'&.ant-input-group-wrapper': {
		'& .ant-input-wrapper': {
			'& .ant-input-group-addon': {
				...omit(generateCommonBaseStyles(themeType), ['borderRadius']),
				fontWeight: fontWeight.light
			},
			'& .ant-input-group-addon:first-child': {
				borderBottomLeftRadius: borderRadius,
				borderTopLeftRadius: borderRadius
			},
			'& .ant-input-group-addon:last-child': {
				borderBottomRightRadius: borderRadius,
				borderTopRightRadius: borderRadius
			}
		}
	}
})

export const generateInputStyles = (themeType: ThemeType) => {
	const { placeholder } = themedStyles[themeType]

	return {
		'&.ant-input': {
			'&::placeholder': {
				color: placeholder.color
			},
			...generateCommonBaseStyles(themeType),
			...generateCommonHoverStyles(themeType)
		},
		'&.ant-input-disabled, &.ant-input[disabled]':
			generateCommonDisabledStyles(themeType),
		'&.ant-input-focused, &.ant-input:focus':
			generateCommonFocusStyles(themeType)
	}
}
