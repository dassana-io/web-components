import { createContext } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'

export interface FieldContextProps {
	loading: boolean
	onSubmit: SubmitHandler<FieldValues>
}

const FieldContext = createContext<FieldContextProps>({} as FieldContextProps)

export default FieldContext
