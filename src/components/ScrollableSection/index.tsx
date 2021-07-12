import { Bounce } from './Bounce'
import { Breakpoints } from '@dassana-io/web-utils'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { Element } from 'react-scroll'
import { IconButton } from 'components/IconButton'
import { mediaSelectorsWithBreakpoints } from '../Pages/utils'
import { styleguide } from 'components/assets/styles'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import React, { FC, ReactNode } from 'react'
import { ScrollDirections, scrollOnClick } from './utils'

const { tablet } = Breakpoints
const { min } = mediaSelectorsWithBreakpoints

const { down, up } = ScrollDirections

const {
	colors: { blues },
	flexCenter,
	flexDown,
	flexSpaceBetween,
	spacing
} = styleguide

const useStyles = createUseStyles({
	arrowDown: {
		[min[tablet]]: {
			bottom: 0,
			display: 'flex',
			position: 'absolute'
		},
		display: 'none'
	},
	arrowIcon: {
		'&:hover': { color: blues.base },
		color: `${blues.base} !important`,
		padding: spacing['m+']
	},
	arrowUp: {
		[min[tablet]]: {
			display: 'flex',
			position: 'absolute'
		},
		display: 'none'
	},
	children: {
		height: '100%',
		width: '100%'
	},
	container: {
		...flexCenter,
		[min[tablet]]: {
			...flexSpaceBetween,
			...flexDown
		},
		position: 'relative'
	}
})

export interface ScrollableSectionProps {
	arrowUp: boolean
	arrowDown: boolean
	children: ReactNode
	classes?: string[]
	name: string
	sections: string[]
}

export const ScrollableSection: FC<ScrollableSectionProps> = ({
	arrowUp = true,
	arrowDown = true,
	children,
	classes = [],
	name,
	sections = []
}: ScrollableSectionProps) => {
	const componentClasses = useStyles()

	return (
		<Element
			className={cn(componentClasses.container, classes)}
			name={name}
		>
			{arrowUp && (
				<Bounce classes={[componentClasses.arrowUp]}>
					<IconButton
						classes={[componentClasses.arrowIcon]}
						icon={faArrowUp}
						onClick={() => scrollOnClick(sections, up, name)}
					/>
				</Bounce>
			)}
			<div className={componentClasses.children}>{children}</div>
			{arrowDown && (
				<Bounce classes={[componentClasses.arrowDown]}>
					<IconButton
						classes={[componentClasses.arrowIcon]}
						icon={faArrowDown}
						onClick={() => scrollOnClick(sections, down, name)}
					/>
				</Bounce>
			)}
		</Element>
	)
}

export { scrollOnClick, ScrollDirections } from './utils'
