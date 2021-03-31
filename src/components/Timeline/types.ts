import {
	ExpandMultipleProps,
	ExpandSingleProps,
	Panel,
	SharedAccordionProps
} from '../Accordion/types'

export enum TimelineState {
	alwaysExpanded = 'alwaysExpanded',
	collapsed = 'collapsed',
	expanded = 'expanded'
}

export interface TimelineConfig extends Panel {
	alwaysExpanded?: boolean
}

interface SharedTimelineProps extends Omit<SharedAccordionProps, 'panels'> {
	timelineConfig: TimelineConfig[]
}

export type TimelineProps = (ExpandSingleProps | ExpandMultipleProps) &
	SharedTimelineProps
