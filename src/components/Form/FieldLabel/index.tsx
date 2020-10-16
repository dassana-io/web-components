import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { Skeleton } from 'components/Skeleton'
import { styleguide } from 'components/assets/styles/styleguide'
import React, { FC } from 'react'
import { themedStyles, ThemeType } from 'components/assets/styles/themes'

const { dark, light } = ThemeType

const { font } = styleguide

export const generateFieldLabelStyles = (themeType: ThemeType) => {
	const { base } = themedStyles[themeType]

	return {
		...font.body,
		color: base.color,
		paddingBottom: 5
	}
}

const useStyles = createUseStyles({
	'@global': {
		[`.${dark}`]: {
			'& $div': generateFieldLabelStyles(dark)
		},
		div: generateFieldLabelStyles(light)
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
				[classes.required]: required && !loading
			})}
		>
			{loading ? <Skeleton width={skeletonWidth} /> : label}
		</div>
	)
}

export default FieldLabel
