import { RegisterOptions } from 'react-hook-form'

export interface BaseFieldProps {
	containerClasses?: string[]
	fieldErrorClasses?: string[]
	ignoreFormDisabled?: boolean
	label?: string
	labelSkeletonWidth?: number
	name: string
	required?: boolean
	rules?: RegisterOptions
}
