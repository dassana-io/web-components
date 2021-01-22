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

export const useStyles = createUseStyles({
	skeleton: { marginLeft: spacing.m },
	tag: {
		marginBottom: spacing.s
	},
	tagsWrapper: {
		display: 'flex',
		flexWrap: 'wrap',
		width: ({ fullWidth }) =>
			fullWidth
				? `calc( 100% - ${actionItemWidth + spacing.m}px)`
				: defaultFieldWidth
	},
	wrapper: {
		...flexAlignCenter,
		flexWrap: 'nowrap',
		paddingBottom: spacing.s
	}
})
