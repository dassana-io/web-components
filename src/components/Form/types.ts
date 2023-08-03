import { type ReactNode } from 'react'
import { type RegisterOptions } from 'react-hook-form'

export interface BaseFieldProps {
	containerClasses?: string[]
	fieldErrorClasses?: string[]
	fieldLabelClasses?: string[]
	ignoreFormDisabled?: boolean
	label?: ReactNode
	labelSkeletonWidth?: number
	name: string
	required?: boolean
	rules?: RegisterOptions
	showError?: boolean
}
