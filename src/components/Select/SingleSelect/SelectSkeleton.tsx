import { BaseFormElementProps } from '../../types'
import { createUseStyles } from 'react-jss'
import { defaultFieldWidth } from '../../assets/styles/styleguide'
import { Skeleton } from '../../Skeleton'
import React, { FC } from 'react'

const useStyles = createUseStyles({
	container: {
		width: props => (props.fullWidth ? '100%' : defaultFieldWidth)
	}
})

export type SelectSkeletonProps = Pick<
	BaseFormElementProps<HTMLSelectElement>,
	'fullWidth'
>

export const SelectSkeleton: FC<SelectSkeletonProps> = (
	props: SelectSkeletonProps
) => {
	const classes = useStyles(props)

	return (
		<div className={classes.container}>
			<Skeleton height={30} />
		</div>
	)
}
