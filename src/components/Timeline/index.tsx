import { createUseStyles } from 'react-jss'
import { generateTimelinePanelStyles } from './utils'
import { ThemeType } from '../assets/styles'
import { TimelineContent } from './TimelineContent'
import { TimelineHeader } from './TimelineHeader'
import { TimelineSeparator } from './TimelineSeparator'
import React, { FC, Key, useState } from 'react'
import { TimelineProps, TimelineState } from './types'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	timelineItem: {
		flexGrow: 1
	},
	wrapper: { ...generateTimelinePanelStyles(light), display: 'flex' },
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: { '& $wrapper': generateTimelinePanelStyles(dark) }
	}
})

export const Timeline: FC<TimelineProps> = ({
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
	const classes = useStyles()

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
		<div>
			{timelineConfig.map(
				({ content, key, timestamp, title, uncollapsible = false }) => {
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
						<div className={classes.wrapper} key={key}>
							<TimelineSeparator
								state={state}
								{...conditionalProps}
							/>
							<div className={classes.timelineItem}>
								<TimelineHeader
									state={state}
									timestamp={timestamp}
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
