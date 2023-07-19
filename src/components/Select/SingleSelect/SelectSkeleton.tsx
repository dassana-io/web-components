import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { defaultFieldWidth } from '../../assets/styles/styleguide'
import { type SelectProps } from './types'
import { Skeleton } from '../../Skeleton'
import React, { type FC } from 'react'

const useStyles = createUseStyles({
	container: {
		width: props => (props.fullWidth ? '100%' : defaultFieldWidth)
	}
})

export type SelectSkeletonProps = Pick<
	SelectProps,
	'containerClasses' | 'fullWidth'
>

export const SelectSkeleton: FC<SelectSkeletonProps> = (
	props: SelectSkeletonProps
) => {
	const { containerClasses = [] } = props
	const classes = useStyles(props)

	return (
		<div className={cn({ [classes.container]: true }, containerClasses)}>
			<Skeleton height={30} />
		</div>
	)
}
