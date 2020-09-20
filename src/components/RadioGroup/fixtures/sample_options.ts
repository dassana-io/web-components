import { RadioGroupOptions } from '../.'

export const basicOptions: RadioGroupOptions[] = [
	{ label: 'High', value: 'high' },
	{ label: 'Medium', value: 'medium' },
	{ label: 'Low', value: 'low' }
]

export const basicOptionsDisabled: RadioGroupOptions[] = [
	{ label: 'High', value: 'high' },
	{ label: 'Medium', value: 'medium' },
	{ disabled: true, label: 'Low', value: 'low' }
]
