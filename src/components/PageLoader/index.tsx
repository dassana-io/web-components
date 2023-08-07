import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { faCircleNotch } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactComponent as LightbulbLit } from '../assets/images/lightbulb_lit.svg'
import { ReactComponent as LightbulbUnlit } from '../assets/images/lightbulb_unlit.svg'
import React from 'react'
import { styleguide, themes, ThemeType } from '../assets/styles'

const { flexCenter } = styleguide
const { dark, light } = ThemeType

const svgWidth = 130
const svgHeight = 133

const useStyles = createUseStyles({
	bulbLit: {
		animation: 'lightUp 2s infinite'
	},
	container: {
		'& svg': {
			position: 'absolute'
		},
		...flexCenter,
		background: themes[light].background.primary,
		width: 'inherit'
	},
	// iconWrapper dimensions should match svg dimensions
	iconWrapper: {
		height: svgHeight,
		position: 'relative',
		width: svgWidth
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		'@keyframes lightUp': {
			'0%, 100%': {
				opacity: 0
			},
			'50%': {
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
}

const commonSvgProps = {
	height: svgHeight,
	viewBox: `0 0 ${svgWidth} ${svgHeight}`,
	width: svgWidth
}

export const PageLoader: React.FC<PageLoaderProps> = ({
	classes = [],
	generic = false
}: PageLoaderProps) => {
	const compClasses = useStyles()

	return (
		<div className={cn(compClasses.container, classes)}>
			{generic ? (
				<FontAwesomeIcon icon={faCircleNotch} size='5x' spin />
			) : (
				<div className={compClasses.iconWrapper}>
					<LightbulbUnlit {...commonSvgProps} />
					<LightbulbLit
						className={compClasses.bulbLit}
						{...commonSvgProps}
					/>
				</div>
			)}
		</div>
	)
}
