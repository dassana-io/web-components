import cloneDeep from 'lodash/cloneDeep'
import React from 'react'
import { ValidationRules } from 'react-hook-form'
import FieldLabel, { FieldLabelProps } from './FieldLabel'

export const getFormFieldDataTag = (tag: string): string => `field-${tag}`

// --------------------------------------

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

		const requiredRules = {
			required: (values: string[]) => values.length > 0 || ''
		}

		let extraRules = {}

		if (newRules.validate) {
			if (typeof newRules.validate === 'object') {
				extraRules = { ...newRules.validate }
			} else {
				extraRules = { validate: newRules.validate }
			}
		}

		newRules.validate = {
			...extraRules,
			...requiredRules
		}
	}

	return newRules
}

// --------------------------------------

export const renderFieldLabel = (props: Partial<FieldLabelProps>) => {
	if (props.label) return <FieldLabel {...(props as FieldLabelProps)} />
}
