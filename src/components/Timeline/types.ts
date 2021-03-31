import { Key, ReactNode } from 'react'

export enum TimelineState {
	active = 'active',
	default = 'default',
	uncollapsible = 'uncollapsible'
}

export interface TimelineConfig {
	content: ReactNode
	key: Key
	timestamp?: number
	title: string
	uncollapsible?: boolean
}

interface SharedTimelineProps {
	defaultActiveKey?: Key
	timelineConfig: TimelineConfig[]
}

interface ExclusiveTimelineProps extends SharedTimelineProps {
	exclusive: true
	expandAllOnMount?: never
}

interface NonExclusiveTimelineProps extends SharedTimelineProps {
	exclusive: false
	expandAllOnMount?: boolean
}

export type TimelineProps = ExclusiveTimelineProps | NonExclusiveTimelineProps
