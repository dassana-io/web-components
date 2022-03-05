import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import React, { FC } from 'react'
import { styleguide, themedStyles, ThemeType } from '../assets/styles'

const { dark, light } = ThemeType

const {
	colors: { blacks, grays },
	flexCenter,
	spacing
} = styleguide

/* eslint-disable quotes */
const useStyles = createUseStyles({
	container: {
		...flexCenter,
		flexDirection: 'column'
	},
	percentage: {
		'&:before': {
			animation: 'percent 4s forwards',
			color: themedStyles[light].base.color,
			content: "'0%'"
		},
		alignSelf: 'center',
		paddingTop: spacing['m+']
	},
	progressBar: {
		animation: 'load 4s normal forwards',
		background: blacks['lighten-80'],
		borderRadius: '100px',
		boxShadow: '',
		height: 16,
		width: 0
	},
	progressBarContainer: {
		alignItems: 'center',
		background: grays['lighten-40'],
		borderRadius: '100px',
		display: 'flex',
		height: 16,
		justifyContent: 'flex-start',
		position: 'relative',
		width: 500
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		'@keyframes load': {
			'0%': { width: 0 },
			'100%': { width: '100%' }
		},
		'@keyframes percent': {
			'0%': { content: "'Tightening the screws...'" },
			'25%': { content: "'Setting the sails...'" },
			'50%': { content: "'Grinding the ax...'" },
			'75%': { content: "'Kneading the dough...'" },
			// eslint-disable-next-line sort-keys
			'100%': { content: "'Liftoff!'" }
		},
		[`.${dark}`]: {
			'& $percentage:before': {
				color: themedStyles[dark].base.color
			},
			'& $progressBar': {
				background: themedStyles[dark].base.borderColor
			},
			'& $progressBarContainer': {
				background: blacks['darken-40']
			}
		}
	}
})
/* eslint-enable quotes */

export interface ProgressBarProps {
	classes?: string[]
}

export const ProgressBar: FC<ProgressBarProps> = ({
	classes = []
}: ProgressBarProps) => {
	const compClasses = useStyles()

	return (
		<div className={cn(compClasses.container, classes)}>
			<div className={compClasses.progressBarContainer}>
				<div className={compClasses.progressBar} />
			</div>
			<div className={compClasses.percentage} />
		</div>
	)
}
