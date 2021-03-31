import { Key, ReactNode } from 'react'

export enum TimelineState {
	active = 'active',
	default = 'default',
	uncollapsible = 'uncollapsible'
}

export interface TimelineConfig {
	classes?: string[]
	content: ReactNode
	key: Key
	title: ReactNode
	headerExtra?: ReactNode
	uncollapsible?: boolean
}

interface SharedTimelineProps {
	classes?: string[]
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
