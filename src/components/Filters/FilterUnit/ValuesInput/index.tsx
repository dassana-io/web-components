import { Input } from 'components/Input'
import { ValuesInputProps } from './types'
import React, { ChangeEvent, FC } from 'react'

export const ValuesInput: FC<ValuesInputProps> = ({
	id,
	onFilterChange,
	selectedValues = [{ text: '', value: '' }]
}: ValuesInputProps) => {
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		onFilterChange({
			id,
			selectedValues: [{ text: value, value }]
		})
	}

	return <Input onChange={handleInputChange} value={selectedValues[0].text} />
}
