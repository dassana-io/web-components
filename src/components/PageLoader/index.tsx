import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import DWLoader from '../assets/images/deepwatch_loader.gif'
import { faCircleNotch } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { styleguide } from '../assets/styles'
import React, { type ReactNode } from 'react'

const { flexCenter } = styleguide

const useStyles = createUseStyles({
	container: {
		'& svg': {
			position: 'absolute'
		},
		...flexCenter,
		background: 'transparent',
		width: 'inherit'
	},
	iconWrapper: {
		height: 100,
		position: 'relative',
		width: 100
	},
	loader: {
		width: 100
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
				<img
					alt='Deepwatch loader'
					className={compClasses.loader}
					src={DWLoader}
				/>
			)}
		</div>
	)
}
