import { cloneDeep } from 'lodash'
import { getDataTestAttributeProp } from 'components/utils'
import { KVField } from './types'
import { KVInputPair } from './KVInputPair'
import React, { FC, useCallback, useEffect, useMemo } from 'react'

const removeFromArrByIdx = <T,>(arr: T[], index: number) => [
	...arr.slice(0, index),
	...arr.slice(index + 1)
]

const shouldAddNewPair = (values: KVField[]): boolean => {
	const numOfPairs = values.length
	const lastPair = values[numOfPairs - 1]

	return !numOfPairs || !!(lastPair.key || lastPair.value)
}

const defaultKVPair: KVField = {
	key: '',
	value: ''
}

export interface DynamicKVInputProps {
	dataTag?: string
	disabled?: boolean
	keyLabel?: string
	loading?: boolean
	onChange: (values: KVField[]) => void
	valueLabel?: string
	values: KVField[]
}

export const DynamicKVInput: FC<DynamicKVInputProps> = ({
	dataTag = '',
	disabled = false,
	keyLabel = 'Key',
	loading = false,
	onChange,
	valueLabel = 'Value',
	values = [defaultKVPair]
}: DynamicKVInputProps) => {
	const valuesClone = useMemo(() => cloneDeep(values), [values])

	const addNewKVPair = useCallback(() => {
		onChange([...valuesClone, defaultKVPair])
	}, [onChange, valuesClone])

	const onDelete = useCallback(
		(idx: number) => onChange(removeFromArrByIdx(valuesClone, idx)),
		[onChange, valuesClone]
	)

	const onFieldChange = useCallback(
		(fieldName: 'key' | 'value', val: string, idx: number) => {
			const currentField = valuesClone[idx]
			const matchingField =
				currentField[fieldName === 'key' ? 'value' : 'key']
			const lastPairIdx = valuesClone.length - 1
			const isLastPair = lastPairIdx === idx
			const lastPair = valuesClone[lastPairIdx]

			if (!val && !matchingField) {
				const lastPairIsEmpty = !lastPair.key && !lastPair.value

				if (valuesClone.length === 2 && lastPairIsEmpty) {
					onChange([defaultKVPair])
				} else {
					onDelete(idx)
				}
			} else {
				const updatedField = {
					...currentField,
					[fieldName]: val
				}

				valuesClone[idx] = updatedField

				let newValues = valuesClone

				if (isLastPair || lastPair.key || lastPair.value)
					newValues = [...valuesClone, defaultKVPair]

				onChange(newValues)
			}
		},
		[onChange, onDelete, valuesClone]
	)

	const onKeyChange = useCallback(
		(key: string, idx: number) => {
			onFieldChange('key', key, idx)
		},
		[onFieldChange]
	)

	const onValueChange = useCallback(
		(val: string, idx: number) => onFieldChange('value', val, idx),
		[onFieldChange]
	)

	useEffect(() => {
		if (shouldAddNewPair(valuesClone)) addNewKVPair()
	}, [addNewKVPair, valuesClone])

	return (
		<div {...getDataTestAttributeProp('dynamic-kv-input-pair', dataTag)}>
			{values.map(({ disabled: fieldDisabled, key, value }, i) => (
				<KVInputPair
					disabled={disabled || fieldDisabled}
					key={i}
					loading={loading}
					name={key}
					nameLabel={keyLabel}
					onKeyChange={(val: string) => onKeyChange(val, i)}
					onValueChange={(val: string) => onValueChange(val, i)}
					value={value}
					valueLabel={valueLabel}
				/>
			))}
		</div>
	)
}

export type { KVField }
