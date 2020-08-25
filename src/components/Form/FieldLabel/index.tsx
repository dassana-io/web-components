import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import Skeleton from '../../Skeleton'
import React, { FC } from 'react'

const useStyles = createUseStyles({
	container: {
		fontSize: '14px',
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
}

const FieldLabel: FC<FieldLabelProps> = ({
	label,
	loading = false,
	required = false
}: FieldLabelProps) => {
	const classes = useStyles()

	return (
		<div
			className={cn({
				[classes.container]: true,
				[classes.required]: required
			})}
		>
			{loading ? <Skeleton width={100} /> : label}
		</div>
	)
}

export default FieldLabel
