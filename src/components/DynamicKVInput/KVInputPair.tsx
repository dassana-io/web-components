import { createUseStyles } from 'react-jss'
import { FieldLabel } from 'components/Form'
import { styleguide } from 'components/assets/styles/styleguide'
import { Input, type InputProps } from 'components/Input'
import React, { type ChangeEvent, type FC } from 'react'

const { flexAlignCenter, flexDown, spacing } = styleguide

const useStyles = createUseStyles({
	field: {
		...flexDown
	},
	kvInputPair: {
		'& $field:first-of-type': {
			marginRight: spacing.l
		},
		...flexAlignCenter,
		paddingBottom: spacing.m
	}
})

export interface KVInputPairProps {
	disabled?: boolean
	loading?: boolean
	name?: string
	nameLabel?: string
	onKeyChange: (key: string) => void
	onValueChange: (val: string) => void
	value?: string
	valueLabel?: string
}

export const KVInputPair: FC<KVInputPairProps> = ({
	disabled = false,
	loading = false,
	name = '',
	nameLabel = 'Key',
	onKeyChange,
	onValueChange,
	value = '',
	valueLabel = 'Value'
}: KVInputPairProps) => {
	const classes = useStyles()

	const handleKeyChange = (e: ChangeEvent<HTMLInputElement>) =>
		onKeyChange(e.target.value)
	const handleValueChange = (e: ChangeEvent<HTMLInputElement>) =>
		onValueChange(e.target.value)

	const commonInputProps: Partial<InputProps> = {
		disabled,
		loading
	}

	return (
		<div className={classes.kvInputPair}>
			<div className={classes.field}>
				<FieldLabel label={nameLabel} loading={loading} required />
				<Input
					onChange={handleKeyChange}
					value={name}
					{...commonInputProps}
				/>
			</div>
			<div className={classes.field}>
				<FieldLabel label={valueLabel} loading={loading} required />
				<Input
					onChange={handleValueChange}
					value={value}
					{...commonInputProps}
				/>
			</div>
		</div>
	)
}
