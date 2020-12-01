import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import React, { FC } from 'react'
import { styleguide, ThemeType } from 'components/assets/styles'

const {
	colors: { blacks, oranges }
} = styleguide

const { light, dark } = ThemeType

/* TODO: Use types generated from codegen */
export enum Status {
	DISABLED = 'DISABLED',
	HASISSUES = 'HAS_ISSUES',
	NEEDSCONFIG = 'NEEDS_CONFIG',
	OK = 'OK'
}

const colorPalette = {
	[dark]: {
		[Status.NEEDSCONFIG]: blacks['lighten-40']
	},
	[light]: {
		[Status.NEEDSCONFIG]: blacks['lighten-70']
	}
}

const useStyles = createUseStyles({
	hasIssues: {
		background: oranges.base
	},
	needsConfig: {
		background: colorPalette[light][Status.NEEDSCONFIG]
	},
	statusDot: {
		borderRadius: '50%',
		display: 'block',
		height: 10,
		width: 10
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $needsConfig': {
				background: colorPalette[dark][Status.NEEDSCONFIG]
			}
		}
	}
})

export interface IngestionStatusDotProps {
	classes?: string[]
	status?: Status
}

export const IngestionStatusDot: FC<IngestionStatusDotProps> = ({
	classes = [],
	status = Status.OK
}: IngestionStatusDotProps) => {
	const componentClasses = useStyles()

	const ingestionStatusDotClasses = cn(
		{
			[componentClasses.statusDot]: true,
			[componentClasses.hasIssues]: status === Status.HASISSUES,
			[componentClasses.needsConfig]: status === Status.NEEDSCONFIG
		},
		classes
	)

	return <span className={ingestionStatusDotClasses}></span>
}
