import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { Skeleton } from 'components/Skeleton'
import { styleguide } from 'components/assets/styles/styleguide'
import React, { FC, ReactNode } from 'react'

const {
	colors: { blacks },
	font,
	fontWeight,
	spacing
} = styleguide

const useStyles = createUseStyles({
	container: {
		color: blacks['lighten-50'],
		marginLeft: spacing.m,
		width: ({ width }) => width
	},
	firstText: { ...font.label, fontWeight: fontWeight.light },
	icon: {
		color: blacks['lighten-30'],
		height: 22,
		verticalAlign: 'middle'
	},
	secondText: {
		...font.body,
		fontWeight: fontWeight.regular,
		marginRight: spacing.xs
	},
	skeleton: { marginLeft: spacing.m }
})

export interface ShortcutMicrocopyProps {
	classes?: string[]
	icon?: ReactNode
	loading?: boolean
	width?: number
}

export const ShortcutMicrocopy: FC<ShortcutMicrocopyProps> = ({
	classes = [],
	icon = '↵',
	loading = false,
	width = 82
}: ShortcutMicrocopyProps) => {
	const componentClasses = useStyles({ width })

	return loading ? (
		<Skeleton
			classes={[componentClasses.skeleton]}
			height={32}
			width={width}
		/>
	) : (
		<div className={cn(componentClasses.container, classes)}>
			<span className={componentClasses.firstText}>press&nbsp;</span>
			<span className={componentClasses.secondText}>enter</span>
			<span className={componentClasses.icon}>{icon}</span>
		</div>
	)
}
