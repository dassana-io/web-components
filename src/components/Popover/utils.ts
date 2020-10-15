import { borderRadius } from 'components/assets/styles/styleguide'
import { ThemeType } from 'components/assets/styles/themes'

const { dark } = ThemeType

export const generatePopoverStyles = (themeType: ThemeType) => {
	const testBlue = '#5876ef'
	const testGreen = '#ace49e'

	const backgroundColor = themeType === dark ? testBlue : testGreen
	const color = themeType === dark ? testGreen : testBlue
	const arrowBorderColor = themeType === dark ? testBlue : testGreen
	const borderBottomColor = themeType === dark ? testGreen : testBlue

	return {
		'& .ant-popover': {
			'& > .ant-popover-content': {
				'& > .ant-popover-arrow': {
					borderColor: arrowBorderColor,
					// boxShadow: `0 0 5px ${testBlue}`,
					boxShadow: 'none',
					zIndex: -1
					// display: 'none !important'
				},
				'& > .ant-popover-inner': {
					'& > .ant-popover-inner-content': {
						color
						// margin: '0 !important'
					},
					'& > .ant-popover-title': {
						borderBottomColor: borderBottomColor,
						color
					},
					backgroundColor,
					borderRadius,
					boxShadow: 'none',
					// boxShadow: `0 3px 6px -4px ${testBlue}, 0 6px 16px 0 ${testBlue}, 0 9px 28px 8px ${testGreen}`,
					color
				}
			}
		}
	}
}
