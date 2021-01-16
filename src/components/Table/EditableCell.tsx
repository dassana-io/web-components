import { createUseStyles } from 'react-jss'
import { DataId, EditableCellTypes } from './types'
import { Form } from '../Form'
import { styleguide } from '../assets/styles'
import { useShortcut } from '@dassana-io/web-utils'
import React, { FC, Key, ReactNode, useRef, useState } from 'react'

const { spacing } = styleguide

const useStyles = createUseStyles({
	cell: {
		'&:hover': {
			border: '1px solid lightgrey'
		},
		border: '1px solid transparent',
		padding: `${spacing.xs}px ${spacing.s}px`
	},
	formInput: {
		width: '100%'
	},
	inputContainer: {
		display: 'flex'
	},
	inputErrorClasses: {
		display: 'none'
	},
	submitButton: {
		marginLeft: spacing.m
	}
})

export interface EditableCellProps<T> {
	/**
	 * Tag children to render including tag text.
	 */
	children: ReactNode
	dataIndex: string
	onSave: (record: T, editedData: T) => Promise<void>
	/**
	 * Color of tag - either a preset (`red`, `blue`, `green` etc.), a hex color code(eg. `#ffffff`) or a rgb color value(eg. `rgb(255, 0, 0)`).
	 */
	rowData: T
	type: EditableCellTypes
	updateRowData: (rowId: Key, data: T) => void
}

export const EditableCell = <T extends DataId>({
	dataIndex,
	children,
	onSave,
	rowData,
	type,
	updateRowData
}: EditableCellProps<T>) => {
	const divRef = useRef<HTMLDivElement>(null)
	const [isEditing, setIsEditing] = useState(false)
	const [inputWidth, setInputWidth] = useState(0)
	const classes = useStyles(divRef)

	const startEdit = () => {
		setInputWidth(divRef.current!.clientWidth + 70)
		setIsEditing(true)
	}

	const stopEdit = () => setIsEditing(false)

	const handleOnSubmit = async (data: T) => {
		try {
			await onSave(rowData, data)

			updateRowData(rowData.id, data)
			stopEdit()
		} catch (error) {
			console.log(error)
		}
	}

	const onSubmit = (editedValues: Record<string, any>) =>
		handleOnSubmit((editedValues as unknown) as T)

	useShortcut({
		callback: stopEdit,
		key: 'Escape',
		keyEvent: 'keydown'
	})

	return isEditing ? (
		<Form initialValues={{ [dataIndex]: children }} onSubmit={onSubmit}>
			<div
				className={classes.inputContainer}
				style={{
					width: inputWidth
				}}
			>
				<Form.Input
					containerClasses={[classes.formInput]}
					fieldErrorClasses={[classes.inputErrorClasses]}
					fullWidth
					name={dataIndex}
					required
				/>
				<Form.SubmitButton classes={[classes.submitButton]}>
					⏎
				</Form.SubmitButton>
			</div>
		</Form>
	) : (
		<div className={classes.cell} onClick={startEdit} ref={divRef}>
			{children}
		</div>
	)
}
