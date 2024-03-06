export interface TimeRange {
	type: string
}

export interface AbsoluteTimeRange extends TimeRange {
	startTime: number
	endTime: number
}

export enum TimePrependLabels {
	last = 'last',
	past = 'past'
}

export enum TimeTypes {
	all = 'all',
	absolute = 'absolute',
	relative = 'relative'
}

export enum TimeUnits {
	second = 'seconds',
	minute = 'minutes',
	hour = 'hours',
	day = 'days',
	week = 'weeks',
	month = 'months'
}

export interface RelativeTimeRange extends TimeRange {
	amount: number
	unit: TimeUnits
}

export interface AdvancedTimeOptionsProps {
	onTimeRangeChange: (timeRange: TimeRange) => void
	value?: TimeRange
}

export interface RelatveTimeConfig {
	amounts: number[]
	unit: TimeUnits
}
