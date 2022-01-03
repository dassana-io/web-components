import FieldContext from '../FieldContext'
import { FormState } from 'react-hook-form/dist/types/form'
import { getUseShortcutProps } from './utils'
import { Button, ButtonProps } from 'components/Button'
import { FieldValues, useFormContext } from 'react-hook-form'
import React, { FC, useContext } from 'react'
import {
	ShortcutMicrocopy,
	ShortcutMicrocopyProps
} from 'components/ShortcutMicrocopy'
import { useShortcut, UseShortcutConfig } from '@dassana-io/web-utils'

/**
 * TODO: Move to web-utils
 * More info on Distributive Conditional Types: https://stackoverflow.com/a/57103940/11279811
 */
type DistributiveOmit<T, K extends keyof T> = T extends T ? Omit<T, K> : never

export interface FormButtonProps
	extends Omit<ButtonProps, 'loading' | 'onClick'> {
	isDisabled?: (
		formState: FormState<FieldValues>,
		formValues: FieldValues
	) => boolean
	renderShortcutMicrocopy?: boolean
	shortcutMicrocopyProps?: ShortcutMicrocopyProps
	useShortcutProps?: DistributiveOmit<
		UseShortcutConfig,
		'additionalConditionalFn' | 'callback'
	>
}

const FormSubmitButton: FC<FormButtonProps> = ({
	isDisabled,
	renderShortcutMicrocopy = false,
	shortcutMicrocopyProps,
	useShortcutProps,
	...rest
}: FormButtonProps) => {
	const { handleSubmit, formState, watch } = useFormContext()
	const { loading, onSubmit } = useContext(FieldContext)
	const { isDirty } = formState

	const isButtonDisabled = () =>
		isDisabled ? isDisabled(formState, watch()) : !isDirty

	useShortcut(
		getUseShortcutProps({
			additionalConditionalFn: () => !isButtonDisabled(),
			callback: handleSubmit(onSubmit),
			useShortcutProps
		})
	)

	return (
		<>
			<Button
				dataTag='submit-button'
				disabled={isButtonDisabled()}
				loading={loading}
				onClick={e => {
					e.stopPropagation()

					handleSubmit(onSubmit)()
				}}
				{...rest}
			/>
			{renderShortcutMicrocopy && !isButtonDisabled() && (
				<ShortcutMicrocopy
					{...shortcutMicrocopyProps}
					loading={loading}
				/>
			)}
		</>
	)
}

export default FormSubmitButton
