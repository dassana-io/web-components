import { radioButtonGroupPalette } from 'components/RadioButtonGroup/utils'
import { styleguide } from 'components/assets/styles/styleguide'
import { themedStyles, ThemeType } from 'components/assets/styles/themes'

const { borderRadius } = styleguide

export const generateRadioGroupStyles = (themeType: ThemeType) => {
	const {
		active,
		base: { borderColor, color }
	} = radioButtonGroupPalette[themeType]

	return {
		'&.ant-radio-group': {
			'& .ant-radio-input:focus + .ant-radio-inner': {
				boxShadow: 'none'
			},
			'& .ant-radio-wrapper': {
				'& .ant-radio:hover .ant-radio-inner': {
					'&:not([class*="ant-radio-wrapper-disabled"])': {
						borderColor: active.color
					}
				},
				'&.ant-radio-wrapper-checked': {
					'& .ant-radio-checked .ant-radio-inner': {
						borderColor: color
					},
					'& .ant-radio-checked .ant-radio-inner::after': {
						background: color
					},
					'& .ant-radio-checked::after': {
						border: 'none'
					}
				},
				color
			},
			color
		},
		'&.ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover':
			{ borderColor }
	}
}

export const generateRadioSkeletonStyles = (themeType: ThemeType) => {
	const { loading } = themedStyles[themeType]

	return {
		border: `1px solid ${loading.borderColor}`,
		borderRadius: borderRadius,
		display: 'flex',
		margin: '0 1px'
	}
}
