import { ValidationRules } from 'react-hook-form'

export interface BaseFieldProps {
	label?: string
	labelSkeletonWidth?: number
	name: string
	required?: boolean
	rules?: ValidationRules
}
