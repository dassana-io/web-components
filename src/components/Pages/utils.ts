import { Breakpoints } from '@dassana-io/web-utils'
import { themedStyles, ThemeType } from 'components/assets/styles'

const getMediaSelector = (breakpoint: Breakpoints, isMax?: boolean) =>
	`@media screen and (${isMax ? 'max' : 'min'}-width: ${breakpoint}px)`

const { largeScreen, mobile, tablet } = Breakpoints

export const mediaSelectorsWithBreakpoints = {
	max: {
		[largeScreen]: getMediaSelector(largeScreen, true),
		[mobile]: getMediaSelector(mobile, true),
		[tablet]: getMediaSelector(tablet, true)
	},
	min: {
		[largeScreen]: getMediaSelector(largeScreen),
		[mobile]: getMediaSelector(mobile),
		[tablet]: getMediaSelector(tablet)
	}
}

export const generateThemedMadeWithLoveStyles = (themeType: ThemeType) => {
	const {
		base: { backgroundColor, color }
	} = themedStyles[themeType]

	return {
		backgroundColor,
		color
	}
}
