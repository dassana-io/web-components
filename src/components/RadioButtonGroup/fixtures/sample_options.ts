import { RadioButtonGroupOptions } from '..'

export const basicOptions: RadioButtonGroupOptions[] = [
	{ label: 'High', value: 'high' },
	{ label: 'Medium', value: 'medium' },
	{ label: 'Low', value: 'low' }
]

export const basicOptionsDisabled: RadioButtonGroupOptions[] = [
	{ label: 'High', value: 'high' },
	{ label: 'Medium', value: 'medium' },
	{ disabled: true, label: 'Low', value: 'low' }
]
