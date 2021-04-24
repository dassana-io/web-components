import cn from 'classnames'
import { Content } from './Content'
import { createUseStyles } from 'react-jss'
import { Header } from './Header'
import { Separator } from './Separator'
import {
	generateThemedTimelineItemStyles,
	generateThemedWrapperStyles
} from './utils'
import {
	getInitialExpandedKeys,
	getUpdatedExpandedKeys
} from '../Accordion/utils'
import React, { FC, Key, useState } from 'react'
import { styleguide, ThemeType } from '../assets/styles'
import { TimelineProps, TimelineState } from './types'

const { alwaysExpanded, expanded, collapsed } = TimelineState

const { borderRadius, spacing } = styleguide
const { dark, light } = ThemeType

const useStyles = createUseStyles({
	timelineItem: {
		...generateThemedTimelineItemStyles(light),
		borderRadius,
		flexGrow: 1,
		height: '100%'
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
	defaultExpandedKeys = [],
	expandMultiple = true,
	expandAllOnMount = false,
	timelineConfig
}: TimelineProps) => {
	const [expandedKeys, setExpandedKeys] = useState<Key[]>(
		getInitialExpandedKeys(
			timelineConfig,
			defaultExpandedKeys,
			expandAllOnMount
		)
	)
	const compClasses = useStyles()

	return (
		<div className={cn(classes)}>
			{timelineConfig.map(
				(
					{
						classes: itemClasses = [],
						content,
						key,
						alwaysExpanded: itemAlwaysExpanded = false,
						...rest
					},
					i
				) => {
					const isExpanded = expandedKeys.includes(key)

					let state: TimelineState = collapsed

					if (itemAlwaysExpanded) {
						state = alwaysExpanded
					} else if (isExpanded) {
						state = expanded
					}

					let conditionalProps = {}

					if (state !== alwaysExpanded) {
						conditionalProps = {
							onClick: () =>
								setExpandedKeys(
									getUpdatedExpandedKeys(
										key,
										expandedKeys,
										expandMultiple
									)
								)
						}
					}

					return (
						<div className={compClasses.wrapper} key={key}>
							<Separator
								isLastItem={i === timelineConfig.length - 1}
								state={state}
								{...conditionalProps}
							/>
							<div
								className={cn(
									compClasses.timelineItem,
									itemClasses
								)}
								key={key}
							>
								<Header
									state={state}
									{...conditionalProps}
									{...rest}
								/>
								<Content state={state}>{content}</Content>
							</div>
						</div>
					)
				}
			)}
		</div>
	)
}

export type { TimelineConfig, TimelineProps } from './types'
