import { createUseStyles } from 'react-jss'
import { Form } from '../Form'
import { type SelectOption } from 'components/Select'
import { styleguide } from '../assets/styles'
import { useShortcut } from '@dassana-io/web-utils'
import { EditableCellTypes, type RequiredDataId } from './types'
import React, {
	type Key,
	type MouseEvent,
	type ReactNode,
	useEffect,
	useRef,
	useState
} from 'react'

const { spacing } = styleguide

const useStyles = createUseStyles({
	cell: {
		'&:hover': {
			border: '1px solid lightgrey'
		},
		border: '1px solid transparent',
		display: value => (value ? 'block' : 'none'),
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

interface CommonEditableCellProps<T> {
	children: ReactNode
	contentFormatter?: (content: ReactNode) => ReactNode
	dataIndex: string
	onSave: (record: T, editedData: T) => Promise<void>
	rowData: T
	type: EditableCellTypes
	updateRowData: (rowId: Key, data: T) => void
}

interface EditableInputCellProps<T> extends CommonEditableCellProps<T> {
	options?: never
	type: EditableCellTypes.input
}
interface EditableSelectCellProps<T> extends CommonEditableCellProps<T> {
	matchSelectedContentWidth?: number
	options: SelectOption[]
	type: EditableCellTypes.select
}

export type EditableCellProps<T> =
	| EditableInputCellProps<T>
	| EditableSelectCellProps<T>

const EDIT_FIELD_TYPES_WITH_BUTTON = [EditableCellTypes.input]

export const EditableCell = <T extends RequiredDataId>(
	props: EditableCellProps<T>
) => {
	const {
		children,
		contentFormatter,
		dataIndex,
		onSave,
		rowData,
		type,
		updateRowData,
		...rest
	} = props

	const divRef = useRef<HTMLDivElement>(null)
	const [isEditing, setIsEditing] = useState(false)
	const [inputWidth, setInputWidth] = useState(0)
	const classes = useStyles(children)
	const editDivId = `editField-${dataIndex}-${rowData.id}`

	const startEdit = (e: MouseEvent) => {
		e.stopPropagation() // Prevents table row click from activating

		const existingEditField = document.querySelector(
			`[id^='editField-${dataIndex}']`
		)

		// Column width is decided by the width of the cell with the most content, so once it is
		// set, we can just reuse it as the edit field width
		if (existingEditField) {
			setInputWidth(existingEditField.clientWidth)
		} else {
			let inputWidth = divRef.current!.clientWidth

			if (EDIT_FIELD_TYPES_WITH_BUTTON.includes(type)) {
				inputWidth = inputWidth + 70 // 70 accounts for submit button width
			}

			setInputWidth(inputWidth)
		}

		setIsEditing(true)
	}

	const stopEdit = () => setIsEditing(false)

	const handleOnSubmit = async (editedValues: Record<string, any>) => {
		const data = editedValues as unknown as T

		await onSave(rowData, data)

		updateRowData(rowData.id, data)
		stopEdit()
	}

	const renderFormElement = () => {
		const commonProps = {
			fullWidth: true,
			name: dataIndex,
			required: true
		}

		switch (type) {
			case EditableCellTypes.input:
				return (
					<>
						<Form.Input
							{...commonProps}
							containerClasses={[classes.formInput]}
							fieldErrorClasses={[classes.inputErrorClasses]}
							focused
						/>
						<Form.SubmitButton classes={[classes.submitButton]}>
							⏎
						</Form.SubmitButton>
					</>
				)
			case EditableCellTypes.select: {
				const { matchSelectedContentWidth, options } =
					rest as EditableSelectCellProps<T>

				return (
					<Form.Select
						{...commonProps}
						defaultOpen
						matchSelectedContentWidth={matchSelectedContentWidth}
						onBlur={stopEdit}
						options={options}
						showError={false}
						triggerSubmit
					/>
				)
			}
		}
	}

	useShortcut({
		callback: stopEdit,
		key: 'Escape',
		keyEvent: 'keydown'
	})

	useEffect(() => {
		const clickListener = (e: Event) => {
			if (isEditing) {
				const target = document.querySelector(`#${editDivId}`)

				if (target) {
					const withinBoundaries = e.composedPath().includes(target)

					// Stop edit if user clicks outside of cell
					if (!withinBoundaries) stopEdit()
				}
			}
		}

		document.addEventListener('click', clickListener)

		return () => document.removeEventListener('click', clickListener)
	}, [editDivId, isEditing, rowData.id])

	return isEditing ? (
		<Form
			initialValues={{ [dataIndex]: children }}
			onSubmit={handleOnSubmit}
		>
			<div
				className={classes.inputContainer}
				id={editDivId}
				onClick={(e: MouseEvent) => e.stopPropagation()} // Prevents table row click from activating
				style={{ width: inputWidth }}
			>
				{renderFormElement()}
			</div>
		</Form>
	) : (
		<div className={classes.cell} onClick={startEdit} ref={divRef}>
			{contentFormatter ? contentFormatter(children) : children}
		</div>
	)
}
