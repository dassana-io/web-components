import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import {
	defaultFieldWidth,
	styleguide
} from 'components/assets/styles/styleguide'
import React, { type FC, type ReactNode } from 'react'
import { themedStyles, ThemeType } from 'components/assets/styles/themes'

const { dark, light } = ThemeType

const { font } = styleguide

export const generateThemedContainerStyles = (themeType: ThemeType) => {
	const {
		error: { color }
	} = themedStyles[themeType]

	return {
		color
	}
}

const useStyles = createUseStyles({
	container: {
		...generateThemedContainerStyles(light),
		...font.label,
		fontWeight: 300,
		minHeight: 25,
		paddingTop: 5,
		width: props => (props.fullWidth ? '100%' : defaultFieldWidth)
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': generateThemedContainerStyles(dark)
		}
	}
})

export interface FieldErrorProps {
	classes?: string[]
	fullWidth?: boolean
	error: string
	errorIcon?: ReactNode
}

const FieldError: FC<FieldErrorProps> = ({
	classes = [],
	fullWidth = false,
	error,
	errorIcon
}: FieldErrorProps) => {
	const fieldErrorClasses = useStyles({ fullWidth })

	return (
		<div className={cn({ [fieldErrorClasses.container]: true }, classes)}>
			{error && errorIcon && errorIcon}
			{error}
		</div>
	)
}

export default FieldError
