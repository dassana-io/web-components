import { styleguide, themedStyles, ThemeType } from '../assets/styles'

const { borderRadius } = styleguide

export const generatePaginationStyles = (themeType: ThemeType) => {
	const {
		base: { backgroundColor, borderColor, color },
		disabled,
		hover
	} = themedStyles[themeType]

	return {
		'& .ant-pagination > li': {
			'& .ant-pagination-item-ellipsis': {
				color: disabled.color
			},
			'& .ant-pagination-item-link-icon': { color },
			'&.ant-pagination-disabled, &.ant-pagination-disabled:hover': {
				'& button.ant-pagination-item-link': {
					backgroundColor: disabled.backgroundColor,
					borderColor,
					color: disabled.color
				}
			},
			'&.ant-pagination-item, & button.ant-pagination-item-link': {
				'& a': { color },
				backgroundColor,
				borderColor,
				borderRadius,
				color
			},
			'&.ant-pagination-item.ant-pagination-item-active, &.ant-pagination-item:hover, &:hover':
				{
					'& a': { color: hover.color },
					'& button.ant-pagination-item-link': {
						borderColor: hover.borderColor,
						color: hover.color
					},
					borderColor: hover.borderColor
				},
			borderRadius
		}
	}
}
