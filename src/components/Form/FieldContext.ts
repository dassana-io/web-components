import { createContext } from 'react'
import { FieldValues } from 'react-hook-form/dist/types/form'
import { SubmitHandler } from 'react-hook-form'

export interface FieldContextProps {
	initialValues: FieldValues
	loading: boolean
	onSubmit: SubmitHandler<FieldValues>
}

const FieldContext = createContext<FieldContextProps>({} as FieldContextProps)

export default FieldContext
