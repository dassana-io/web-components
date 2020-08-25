import { createContext } from 'react'

interface FieldContextProps {
	loading: boolean
	onSubmit: (data: any) => void
}

const FieldContext = createContext<FieldContextProps>({} as FieldContextProps)

export default FieldContext
