import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { faCircleNotch } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactComponent as LoaderPhase0 } from '../assets/images/loader_phase_0.svg'
import { ReactComponent as LoaderPhase1 } from '../assets/images/loader_phase_1.svg'
import { ReactComponent as LoaderPhase2 } from '../assets/images/loader_phase_2.svg'
import { ReactComponent as LoaderPhase3 } from '../assets/images/loader_phase_3.svg'
import React, { type ReactNode } from 'react'
import { styleguide, themes, ThemeType } from '../assets/styles'

const { flexCenter } = styleguide
const { dark, light } = ThemeType

const useStyles = createUseStyles({
	container: {
		'& svg': {
			position: 'absolute'
		},
		...flexCenter,
		background: themes[light].background.primary,
		width: 'inherit'
	},

	iconWrapper: {
		height: 100,
		position: 'relative',
		width: 100
	},
	loader1: { animation: 'loader1 3s infinite' },
	loader2: { animation: 'loader2 3s infinite' },
	loader3: { animation: 'loader3 3s infinite' },
	// eslint-disable-next-line sort-keys
	'@global': {
		'@keyframes loader1': {
			'0%, 24%': {
				opacity: 0
			},
			'25%, 49%': {
				opacity: 1
			},
			'50%, 100%': {
				opacity: 0
			}
		},
		'@keyframes loader2': {
			'0%, 49%': {
				opacity: 0
			},
			'50%, 74%': {
				opacity: 1
			},
			'75%, 100%': {
				opacity: 0
			}
		},
		'@keyframes loader3': {
			'0%, 74%': {
				opacity: 0
			},
			'75%, 100%': {
				opacity: 1
			}
		},
		[`.${dark}`]: {
			'& $container': {
				background: themes[dark].background.primary
			}
		}
	}
})

export interface PageLoaderProps {
	classes?: string[]
	generic?: boolean
	loader?: ReactNode
}

export const PageLoader: React.FC<PageLoaderProps> = ({
	classes = [],
	generic = false,
	loader
}: PageLoaderProps) => {
	const compClasses = useStyles()

	if (loader) {
		return (
			<div className={cn(compClasses.container, classes)}>{loader}</div>
		)
	}

	return (
		<div className={cn(compClasses.container, classes)}>
			{generic ? (
				<FontAwesomeIcon icon={faCircleNotch} size='5x' spin />
			) : (
				<div className={compClasses.iconWrapper}>
					<LoaderPhase0 />
					<LoaderPhase1 className={compClasses.loader1} />
					<LoaderPhase2 className={compClasses.loader2} />
					<LoaderPhase3 className={compClasses.loader3} />
				</div>
			)}
		</div>
	)
}
