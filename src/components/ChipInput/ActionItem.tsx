import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { Skeleton } from 'components/Skeleton'
import { styleguide } from 'components/assets/styles/styleguide'
import React, { FC } from 'react'

const {
	colors: { blacks },
	font,
	fontWeight,
	spacing
} = styleguide

const useStyles = createUseStyles({
	actionItem: {
		color: blacks['lighten-50'],
		marginLeft: spacing.m,
		width: ({ actionItemWidth }) => actionItemWidth
	},
	enterIcon: {
		color: blacks['lighten-30'],
		height: 22,
		verticalAlign: 'middle'
	},
	firstText: { ...font.label, fontWeight: fontWeight.light },
	secondText: {
		...font.body,
		fontWeight: fontWeight.regular,
		marginRight: spacing.xs
	},
	skeleton: { marginLeft: spacing.m }
})

export interface ActionItemProps {
	actionItemWidth?: number
	classes?: string[]
	loading?: boolean
}

export const ActionItem: FC<ActionItemProps> = ({
	actionItemWidth = 82,
	classes = [],
	loading = false
}: ActionItemProps) => {
	const componentClasses = useStyles({ actionItemWidth })

	return loading ? (
		<Skeleton
			classes={[componentClasses.skeleton]}
			height={32}
			width={actionItemWidth}
		/>
	) : (
		<div className={cn(componentClasses.actionItem, classes)}>
			<span className={componentClasses.firstText}>press&nbsp;</span>
			<span className={componentClasses.secondText}>enter</span>
			<span className={componentClasses.enterIcon}>↵</span>
		</div>
	)
}
