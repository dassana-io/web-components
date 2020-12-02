import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import {
	defaultFieldWidth,
	styleguide
} from 'components/assets/styles/styleguide'
import React, { FC } from 'react'
import { themes, ThemeType } from 'components/assets/styles/themes'

const { dark, light } = ThemeType

const { font } = styleguide

export const generateThemedContainerStyles = (themeType: ThemeType) => {
	const { warning } = themes[themeType].state

	return {
		color: warning
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
}

const FieldError: FC<FieldErrorProps> = ({
	classes = [],
	fullWidth = false,
	error
}: FieldErrorProps) => {
	const fieldErrorClasses = useStyles({ fullWidth })

	return (
		<div className={cn({ [fieldErrorClasses.container]: true }, classes)}>
			{error}
		</div>
	)
}

export default FieldError
