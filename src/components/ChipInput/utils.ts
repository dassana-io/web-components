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

export const getInputValue = (
	inputValue?: string,
	addonBefore = '',
	addonAfter = ''
) => `${addonBefore}${inputValue}${addonAfter}`

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

export const actionItemWidth = 82
const actionItemMarginLeft = spacing.m

export const useStyles = createUseStyles({
	actionItem: {
		color: blacks['lighten-50'],
		marginLeft: actionItemMarginLeft,
		position: 'relative',
		width: actionItemWidth
	},
	enterIcon: { color: blacks['lighten-30'], position: 'absolute', top: 5 },
	firstText: { ...font.label, fontWeight: fontWeight.light },
	secondText: {
		...font.body,
		fontWeight: fontWeight.regular,
		marginRight: spacing.xs
	},
	skeleton: { marginLeft: actionItemMarginLeft },
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
