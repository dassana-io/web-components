import React from 'react'
import FieldLabel, { FieldLabelProps } from './FieldLabel'

export const getFormFieldDataTag = (tag: string): string => `field-${tag}`

export const renderFieldLabel = (props: Partial<FieldLabelProps>) => {
	if (props.label) return <FieldLabel {...(props as FieldLabelProps)} />
}
