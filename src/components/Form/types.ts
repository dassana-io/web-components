import { ReactNode } from 'react'
import { RegisterOptions } from 'react-hook-form'

export interface BaseFieldProps {
	containerClasses?: string[]
	fieldErrorClasses?: string[]
	ignoreFormDisabled?: boolean
	label?: ReactNode
	labelSkeletonWidth?: number
	name: string
	required?: boolean
	rules?: RegisterOptions
	showError?: boolean
}
