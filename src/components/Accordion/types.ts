import { Key, ReactNode } from 'react'

export interface Panel {
	classes?: string[]
	content: ReactNode
	headerRightContent?: ReactNode
	key: Key
	title: ReactNode
}

interface SharedAccordionProps {
	defaultExpandedKeys?: Key[]
	panels: Panel[]
}

export interface ExpandSingleProps {
	expandMultiple: false
	expandAllOnMount?: never
}

export interface ExpandMultipleProps {
	expandMultiple: true
	expandAllOnMount?: boolean
}

export type AccordionProps = (ExpandSingleProps | ExpandMultipleProps) &
	SharedAccordionProps
