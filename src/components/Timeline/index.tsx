import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { TimelineContent } from './TimelineContent'
import { TimelineHeader } from './TimelineHeader'
import { TimelineSeparator } from './TimelineSeparator'
import {
	generateThemedTimelineItemStyles,
	generateThemedWrapperStyles
} from './utils'
import React, { FC, Key, useState } from 'react'
import { styleguide, ThemeType } from '../assets/styles'
import { TimelineProps, TimelineState } from './types'

const { borderRadius, spacing } = styleguide
const { dark, light } = ThemeType

const useStyles = createUseStyles({
	timelineItem: {
		...generateThemedTimelineItemStyles(light),
		borderRadius,
		flexGrow: 1,
		marginLeft: spacing['m+']
	},
	wrapper: {
		...generateThemedWrapperStyles(light),
		'&:not(:last-child) $timelineItem': { marginBottom: spacing['m+'] },
		display: 'flex',
		position: 'relative'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $timelineItem': generateThemedTimelineItemStyles(dark),
			'& $wrapper': generateThemedWrapperStyles(dark)
		}
	}
})

export const Timeline: FC<TimelineProps> = ({
	classes = [],
	defaultActiveKey,
	exclusive = false,
	expandAllOnMount = false,
	timelineConfig
}: TimelineProps) => {
	const getInitialActiveKeys = () => {
		const defaultActiveKeys: Key[] = [timelineConfig[0].key]

		if (defaultActiveKey) return [defaultActiveKey]
		else if (expandAllOnMount) return timelineConfig.map(({ key }) => key)

		return defaultActiveKeys
	}

	const [activeKeys, setActiveKeys] = useState<Key[]>(getInitialActiveKeys())
	const compClasses = useStyles()

	const toggleTimelineContent = (itemKey: Key) => {
		let newActiveKeys = [...activeKeys, itemKey]

		// Close timeline content if it is open
		if (activeKeys.includes(itemKey))
			newActiveKeys = activeKeys.filter(key => itemKey !== key)
		// If timeline is exclusive, only one can be open at a time
		else if (exclusive) newActiveKeys = [itemKey]

		setActiveKeys(newActiveKeys)
	}

	return (
		<div className={cn(classes)}>
			{timelineConfig.map(
				(
					{
						classes: itemClasses = [],
						content,
						key,
						headerExtra,
						title,
						uncollapsible = false
					},
					i
				) => {
					const isActive = activeKeys.includes(key)

					let state: TimelineState = TimelineState.default

					if (uncollapsible) {
						state = TimelineState.uncollapsible
					} else if (isActive) {
						state = TimelineState.active
					}

					let conditionalProps = {}

					if (state !== TimelineState.uncollapsible) {
						conditionalProps = {
							onClick: () => toggleTimelineContent(key)
						}
					}

					return (
						<div className={compClasses.wrapper} key={key}>
							<TimelineSeparator
								isLastItem={i === timelineConfig.length - 1}
								state={state}
								{...conditionalProps}
							/>
							<div
								className={cn(
									compClasses.timelineItem,
									itemClasses
								)}
							>
								<TimelineHeader
									headerExtra={headerExtra}
									state={state}
									title={title}
									{...conditionalProps}
								/>
								<TimelineContent state={state}>
									{content}
								</TimelineContent>
							</div>
						</div>
					)
				}
			)}
		</div>
	)
}

export type { TimelineConfig, TimelineProps } from './types'
