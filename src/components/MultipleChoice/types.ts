import { Key } from 'react'

export interface MultipleChoiceItemConfig {
	key: Key
	label: string
}

export interface MultipleChoiceProps {
	items: MultipleChoiceItemConfig[]
	onChange: (selectedKeys: Key[]) => void
}
