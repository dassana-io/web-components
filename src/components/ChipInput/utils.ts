import { createUseStyles } from 'react-jss'
import { TagProps } from 'components/Tag'
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

// -----------------------------------

interface GetTagDeletionProps {
	(
		value: string,
		undeleteableValues: string[],
		onDelete: (value: string) => void
	): Pick<TagProps, 'deletable' | 'onDelete'>
}
export const getTagDeletionProps: GetTagDeletionProps = (
	value,
	undeleteableValues,
	onDelete
) => {
	let tagDeletionProps = {}

	if (undeleteableValues.includes(value)) {
		tagDeletionProps = { deletable: false }
	} else {
		tagDeletionProps = {
			deletable: true,
			onDelete: () => onDelete(value)
		}
	}

	return tagDeletionProps
}

// -----------------------------------

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
