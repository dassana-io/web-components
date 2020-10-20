import { createUseStyles } from 'react-jss'
import { Skeleton } from 'components/Skeleton'
import {
	defaultFieldWidth,
	styleguide
} from 'components/assets/styles/styleguide'
import React, { FC } from 'react'
import { themedStyles, ThemeType } from 'components/assets/styles/themes'

const { dark, light } = ThemeType

const { font } = styleguide

export const generateFieldLabelStyles = (themeType: ThemeType) => {
	const { base } = themedStyles[themeType]

	return {
		...font.label,
		color: base.color,
		fontWeight: 300,
		paddingBottom: 5
	}
}

export const generateOptionalStyles = (themeType: ThemeType) => {
	const { disabled } = themedStyles[themeType]

	return {
		color: `${disabled.color}`,
		fontStyle: 'italic'
	}
}

const useStyles = createUseStyles({
	container: {
		display: 'flex',
		justifyContent: 'space-between',
		width: props => (props.fullWidth ? '100%' : defaultFieldWidth)
	},
	optional: generateOptionalStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $div': generateFieldLabelStyles(dark),
			'& $optional': generateOptionalStyles(dark)
		},
		div: generateFieldLabelStyles(light)
	}
})

export interface FieldLabelProps {
	fullWidth?: boolean
	label: string
	loading?: boolean
	required?: boolean
	skeletonWidth?: number
}

const FieldLabel: FC<FieldLabelProps> = ({
	fullWidth = false,
	label,
	loading = false,
	required = false,
	skeletonWidth = 100
}: FieldLabelProps) => {
	const classes = useStyles({ fullWidth })

	return (
		<div className={classes.container}>
			{loading ? (
				<Skeleton width={skeletonWidth} />
			) : (
				<>
					<span>{label}</span>
					{!required && (
						<span className={classes.optional}>Optional</span>
					)}
				</>
			)}
		</div>
	)
}

export default FieldLabel
