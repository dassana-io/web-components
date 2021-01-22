import { createUseStyles } from 'react-jss'
import {
	defaultFieldWidth,
	styleguide
} from 'components/assets/styles/styleguide'

const {
	colors: { blacks },
	flexAlignCenter,
	font,
	fontWeight,
	spacing
} = styleguide

export const getInitialValues = (
	values?: string[],
	defaultValues?: string[]
) => {
	if (values) return values

	return defaultValues ? defaultValues : []
}

const actionItemWidth = 82
const actionItemMarginLeft = spacing.m

export const useStyles = createUseStyles({
	actionItem: {
		color: blacks['lighten-50'],
		marginLeft: actionItemMarginLeft,
		width: actionItemWidth
	},
	enterIcon: { colors: blacks['lighten-30'] },
	firstText: { ...font.label, fontWeight: fontWeight.light },
	secondText: { ...font.body, fontWeight: fontWeight.regular },
	tag: {
		marginBottom: spacing.s
	},
	tagsWrapper: {
		display: 'flex',
		flexWrap: 'wrap',
		width: ({ fullWidth }) =>
			fullWidth
				? `calc( 100% - ${actionItemWidth + actionItemMarginLeft}px)`
				: defaultFieldWidth
	},
	wrapper: {
		...flexAlignCenter,
		flexWrap: 'nowrap',
		paddingBottom: spacing.s
	}
})
