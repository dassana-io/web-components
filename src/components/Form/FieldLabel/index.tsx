import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { fontSizeRegular } from 'components/assets/styles/styleguide'
import { Skeleton } from 'components/Skeleton'
import React, { FC } from 'react'

const useStyles = createUseStyles({
	container: {
		fontSize: fontSizeRegular,
		paddingBottom: 5
	},
	required: {
		'&::after': {
			color: 'red',
			// eslint-disable-next-line quotes
			content: "'*'",
			paddingLeft: '5px'
		}
	}
})

export interface FieldLabelProps {
	label: string
	loading?: boolean
	required?: boolean
	skeletonWidth?: number
}

const FieldLabel: FC<FieldLabelProps> = ({
	label,
	loading = false,
	required = false,
	skeletonWidth = 100
}: FieldLabelProps) => {
	const classes = useStyles()

	return (
		<div
			className={cn({
				[classes.container]: true,
				[classes.required]: required && !loading
			})}
		>
			{loading ? <Skeleton width={skeletonWidth} /> : label}
		</div>
	)
}

export default FieldLabel
