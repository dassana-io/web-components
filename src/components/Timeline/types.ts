import {
	ExpandMultipleProps,
	ExpandSingleProps,
	Panel,
	SharedAccordionProps
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
	timelineConfig: TimelineConfig[]
	expandWithHeader?: boolean
	onClick?: () => void
}

export type TimelineProps = (ExpandSingleProps | ExpandMultipleProps) &
	SharedTimelineProps
