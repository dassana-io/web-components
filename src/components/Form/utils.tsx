import cloneDeep from 'lodash/cloneDeep'
import React from 'react'
import { RegisterOptions } from 'react-hook-form'
import FieldLabel, { FieldLabelProps } from './FieldLabel'

export const getFormFieldDataTag = (tag: string): string => `field-${tag}`

// --------------------------------------

interface Params {
	rules?: RegisterOptions
	required?: boolean
}

/**
 * For Form items that have input type of array, react-hook-form's required check no longer works - an array of length 0 is a valid response.
 * This util function will add an extra "required" rule that checks if the array is empty or not
 * It will also take the rules passed to the component and format it to satisfy react-hook-form's RegisterOptions type - which consists of some default rules and a customizable "validate" rule.
 */
export const getRulesForArrVals = ({
	rules = {},
	required = false
}: Params): RegisterOptions => {
	// first make a clone of the passed rules
	const newRules = cloneDeep(rules)

	if (required) {
		// we still want to make sure required is set to true in case value is undefined instead of an array
		newRules.required = true

		// Then create requiredRules which consists of an object with the required rule that checks if input array is empty
		const requiredRules = {
			required: (values?: string[]) => (values && values.length > 0) || ''
		}

		let extraRules = {}

		// Because react-hook-form's rules.validate can either be an object of validation rules or a function, we need to check the type of the passed "validate" rule and copy it to "newRules" accordingly
		// If a "validate" is passed,
		if (newRules.validate) {
			// and if it's an object, just set extraRules to be the "validate" rules object
			if (typeof newRules.validate === 'object') {
				extraRules = newRules.validate
			} else {
				// otherwise it's a function so we copy that to a new key called "validate"
				extraRules = { validate: newRules.validate }
			}
		}

		// In the end, we copy over the extra validation rules and required rules to "validate" - all custom validation rules need to go inside this "validate" rules object
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
