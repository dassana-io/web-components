import { createUseStyles } from 'react-jss'
import { defaultFieldWidth } from 'components/assets/styles/styleguide'
import { styleguide } from 'components/assets/styles'

const { flexAlignCenter, spacing } = styleguide

const buttonWidth = 50

export const useStyles = createUseStyles({
	enterButton: {
		marginLeft: spacing.m,
		width: buttonWidth
	},
	inputAndButtonWrapper: {
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
				: buttonWidth + parseInt(defaultFieldWidth) + spacing.m
	}
})
