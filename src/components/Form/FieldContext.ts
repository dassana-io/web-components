import { createContext } from 'react'

export interface FieldContextProps {
	initialValues: Record<string, any>
	loading: boolean
	onSubmit: (data: any) => void
}

const FieldContext = createContext<FieldContextProps>({} as FieldContextProps)

export default FieldContext
