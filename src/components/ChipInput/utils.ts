import { createUseStyles } from 'react-jss'
import { defaultFieldWidth } from 'components/assets/styles/styleguide'
import { styleguide } from 'components/assets/styles'

const { flexAlignCenter, spacing } = styleguide

const btnWidth = 50
const btnMarginLeft = spacing.m

export const useStyles = createUseStyles({
	btnWrapper: {
		marginLeft: btnMarginLeft
	},
	enterBtn: {
		width: btnWidth
	},
	inputAndBtnWrapper: {
		...flexAlignCenter,
		flexWrap: 'nowrap',
		paddingBottom: spacing.s
	},
	tag: {
		marginBottom: spacing.s
	},
	tagsWrapper: {
		display: 'flex',
		flexWrap: 'wrap',
		width: ({ fullWidth }) =>
			fullWidth
				? '100%'
				: btnWidth + parseInt(defaultFieldWidth) + btnMarginLeft
	}
})
