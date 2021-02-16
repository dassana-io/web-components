import cloneDeep from 'lodash/cloneDeep'
import React from 'react'
import { ValidationRules } from 'react-hook-form'
import FieldLabel, { FieldLabelProps } from './FieldLabel'

export const getFormFieldDataTag = (tag: string): string => `field-${tag}`

export const renderFieldLabel = (props: Partial<FieldLabelProps>) => {
	if (props.label) return <FieldLabel {...(props as FieldLabelProps)} />
}

interface Params {
	rules?: ValidationRules
	required?: boolean
}
export const getRulesForArrVals = ({
	rules = {},
	required = false
}: Params): ValidationRules => {
	const newRules = cloneDeep(rules)

	if (required) {
		newRules.required = true

		const required = (values: string[]) => values.length > 0 || ''

		if (!('validate' in newRules)) {
			newRules.validate = required
		} else {
			newRules.validate =
				typeof newRules.validate === 'object'
					? { ...newRules.validate, required }
					: {
							required,
							validate: newRules.validate!
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  }
		}
	}

	return newRules
}
