import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { ReactComponent as DassanaLogo } from '../assets/images/dassana_loader.svg'
import { faCircleNotch } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { type ReactNode } from 'react'
import { styleguide, themes, ThemeType } from '../assets/styles'

const {
	colors: { oranges, reds, purples },
	flexCenter
} = styleguide
const { dark, light } = ThemeType

const svgWidth = 130
const svgHeight = 133

const useStyles = createUseStyles({
	container: {
		'& svg': {
			position: 'absolute'
		},
		...flexCenter,
		background: themes[light].background.primary,
		width: 'inherit'
	},
	dassanaLoader: {
		'& .dassana-icon-row-1': {
			animation: 'row-1 4s infinite'
		},
		'& .dassana-icon-row-2': {
			animation: 'row-2 4s infinite'
		},
		'& .dassana-icon-row-3': {
			animation: 'row-3 4s infinite'
		}
	},
	// iconWrapper dimensions should match svg dimensions
	iconWrapper: {
		height: svgHeight,
		position: 'relative',
		width: svgWidth
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		'@keyframes row-1': {
			'0%, 74%': {
				fill: 'transparent'
			},
			'75%, 100%': {
				fill: purples.base
			}
		},
		'@keyframes row-2': {
			'0%, 49%': {
				fill: 'transparent'
			},
			'50%, 100%': {
				fill: reds.base
			}
		},
		'@keyframes row-3': {
			'0%, 24%': {
				fill: 'transparent'
			},
			'25%, 100%': {
				fill: oranges.base
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
					<DassanaLogo className={compClasses.dassanaLoader} />
				</div>
			)}
		</div>
	)
}
