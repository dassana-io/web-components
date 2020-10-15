import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { Skeleton } from 'components/Skeleton'
import { styleguide } from 'components/assets/styles/styleguide'
import React, { FC } from 'react'

const { font } = styleguide

const useStyles = createUseStyles({
	container: {
		...font.body,
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
