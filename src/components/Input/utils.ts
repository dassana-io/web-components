import { darkenColor, fadeColor, lightenColor } from '../utils'
import { demoBlue, demoGray, demoGreen } from '../assets/styles/styleguide'

export const generateInputCSSVals = () => ({
	defaultBgColor: lightenColor(demoBlue, 50),
	defaultBorderColor: lightenColor(demoGray, 55),
	defaultColor: darkenColor(demoGreen, 25),
	defaultFocusBoxShadow: `0 0 0 2px ${fadeColor(demoGreen, 85)}`,
	disabledBgColor: lightenColor(demoGray, 85),
	focusBorderColor: darkenColor(demoGreen, 3),
	hoverBorderColor: darkenColor(demoGreen, 3)
})
