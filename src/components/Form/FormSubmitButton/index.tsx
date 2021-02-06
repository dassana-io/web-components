import FieldContext from '../FieldContext'
import { FormStateProxy } from 'react-hook-form/dist/types/form'
import { useFormContext } from 'react-hook-form'
import { useShortcut } from '@dassana-io/web-utils'
import { Button, ButtonProps } from 'components/Button'
import React, { FC, useContext } from 'react'
import {
	ShortcutMicrocopy,
	ShortcutMicrocopyProps
} from 'components/ShortcutMicrocopy'

export interface FormButtonProps
	extends Omit<ButtonProps, 'loading' | 'onClick'> {
	isDisabled?: (
		formState: FormStateProxy,
		formValues: Record<string, any>
	) => boolean
	renderShortcutMicrocopy?: boolean
	shortcutMicrocopyProps?: ShortcutMicrocopyProps
}

const FormSubmitButton: FC<FormButtonProps> = ({
	isDisabled,
	renderShortcutMicrocopy = false,
	shortcutMicrocopyProps,
	...rest
}: FormButtonProps) => {
	const { handleSubmit, formState, watch } = useFormContext()
	const { loading, onSubmit } = useContext(FieldContext)
	const { isDirty } = formState

	const isButtonDisabled = () =>
		isDisabled ? isDisabled(formState, watch()) : !isDirty
	/* TODO: Refactor to allow for multiple keys */
	useShortcut({
		additionalConditionalFn: () => !isButtonDisabled(),
		callback: handleSubmit(onSubmit),
		key: 'Enter',
		keyEvent: 'keydown'
	})

	return (
		<>
			<Button
				dataTag='submit-button'
				disabled={isButtonDisabled()}
				loading={loading}
				onClick={handleSubmit(onSubmit)}
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
