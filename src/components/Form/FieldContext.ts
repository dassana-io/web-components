import { createContext } from 'react'
import { type FieldValues, type SubmitHandler } from 'react-hook-form'

export interface FieldContextProps {
	disabled: boolean
	loading: boolean
	onSubmit: SubmitHandler<FieldValues>
}

const FieldContext = createContext<FieldContextProps>({} as FieldContextProps)

export default FieldContext
