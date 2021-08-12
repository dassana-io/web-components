import cn from 'classnames'
import { Content } from './Content'
import { createUseStyles } from 'react-jss'
import { Header } from './Header'
import { Separator } from './Separator'
import {
	generateThemedTimelineItemStyles,
	generateThemedWrapperStyles,
	sharedTimelineItemStyles
} from './utils'
import {
	getInitialExpandedKeys,
	getUpdatedExpandedKeys
} from '../Accordion/utils'
import React, { FC, Key, useState } from 'react'
import { styleguide, ThemeType } from '../assets/styles'
import { TimelineProps, TimelineState } from './types'

const { alwaysExpanded, expanded, collapsed } = TimelineState

const {
	colors: { blacks },
	spacing
} = styleguide
const { dark, light } = ThemeType

const useStyles = createUseStyles({
	timelineItem: {
		...generateThemedTimelineItemStyles(light),
		...sharedTimelineItemStyles
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
	},
	focusedTimelineItem: {
		...sharedTimelineItemStyles,
		border: `1px solid ${blacks['lighten-70']} !important`
	}
})

export const Timeline: FC<TimelineProps> = ({
	classes = [],
	defaultExpandedKeys = [],
	expandMultiple = true,
	expandAllOnMount = false,
	expandWithHeader = false,
	onClick,
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
	const [focusedItem, setFocusedItem] = useState<React.Key>()

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

					let seperatorProps = {}
					let headerProps = {}

					const sharedExpandProps = {
						onClick: () =>
							setExpandedKeys(
								getUpdatedExpandedKeys(
									key,
									expandedKeys,
									expandMultiple
								)
							)
					}

					if (state !== alwaysExpanded)
						seperatorProps = sharedExpandProps

					if (expandWithHeader)
						headerProps = {
							...sharedExpandProps,
							expandWithHeader: expandWithHeader
						}

					const timelineItemClasses = cn({
						[compClasses.timelineItem]: true,
						[cn(itemClasses)]: true,
						[compClasses.focusedTimelineItem]: focusedItem === key
					})

					return (
						<div className={compClasses.wrapper} key={key}>
							<Separator
								isLastItem={i === timelineConfig.length - 1}
								state={state}
								{...seperatorProps}
							/>
							<div className={timelineItemClasses} key={key}>
								<Header {...headerProps} {...rest} />
								<Content
									onClick={() => {
										if (onClick) {
											setFocusedItem(key)
											onClick()
										}
									}}
									state={state}
								>
									{content}
								</Content>
							</div>
						</div>
					)
				}
			)}
		</div>
	)
}

export type { TimelineConfig, TimelineProps } from './types'
