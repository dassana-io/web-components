import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { Skeleton } from 'components/Skeleton'
import {
	defaultFieldWidth,
	styleguide
} from 'components/assets/styles/styleguide'
import React, { FC } from 'react'
import { themedStyles, ThemeType } from 'components/assets/styles/themes'

const { dark, light } = ThemeType

const { font, flexSpaceBetween } = styleguide

export const generateThemedContainerStyles = (themeType: ThemeType) => {
	const { base } = themedStyles[themeType]

	return {
		color: base.color
	}
}

export const generateThemedOptionalStyles = (themeType: ThemeType) => {
	const { disabled } = themedStyles[themeType]

	return {
		color: `${disabled.color}`
	}
}

const useStyles = createUseStyles({
	container: {
		...generateThemedContainerStyles(light),
		...flexSpaceBetween,
		...font.label,
		fontWeight: 300,
		paddingBottom: 5,
		width: props => (props.fullWidth ? '100%' : defaultFieldWidth)
	},
	optional: { ...generateThemedOptionalStyles(light), fontStyle: 'italic' },
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': generateThemedContainerStyles(dark),
			'& $optional': generateThemedOptionalStyles(dark)
		}
	}
})

export interface FieldLabelProps {
	classes?: string[]
	fullWidth?: boolean
	label: string
	loading?: boolean
	required?: boolean
	skeletonWidth?: number
}

const FieldLabel: FC<FieldLabelProps> = ({
	classes = [],
	fullWidth = false,
	label,
	loading = false,
	required = false,
	skeletonWidth = 100
}: FieldLabelProps) => {
	const fieldLabelClasses = useStyles({ fullWidth })

	return (
		<div className={cn({ [fieldLabelClasses.container]: true }, classes)}>
			{loading ? (
				<Skeleton width={skeletonWidth} />
			) : (
				<>
					<span>{label}</span>
					{!required && (
						<span className={fieldLabelClasses.optional}>
							Optional
						</span>
					)}
				</>
			)}
		</div>
	)
}

export default FieldLabel
