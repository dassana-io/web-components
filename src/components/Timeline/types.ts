import {
	type ExpandMultipleProps,
	type ExpandSingleProps,
	type Panel,
	type SharedAccordionProps
} from '../Accordion'

export enum TimelineState {
	alwaysExpanded = 'alwaysExpanded',
	collapsed = 'collapsed',
	expanded = 'expanded'
}

export interface TimelineConfig extends Panel {
	alwaysExpanded?: boolean
}

interface SharedTimelineProps extends Omit<SharedAccordionProps, 'panels'> {
	activeKey?: Panel['key']
	timelineConfig: TimelineConfig[]
}

export type TimelineProps = (ExpandSingleProps | ExpandMultipleProps) &
	SharedTimelineProps
