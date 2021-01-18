import { createUseStyles } from 'react-jss'
import { Form } from '../Form'
import { SelectOption } from 'components/Select'
import { styleguide } from '../assets/styles'
import { useShortcut } from '@dassana-io/web-utils'
import { DataId, EditableCellTypes } from './types'
import React, {
	Key,
	MouseEvent,
	ReactNode,
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

const formatSelectOptions = (options: string[]) =>
	options.map(option => ({ text: option, value: option } as SelectOption))

interface CommonEditableCellProps<T> {
	children: ReactNode
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
	options: string[]
	type: EditableCellTypes.select
}

export type EditableCellProps<T> =
	| EditableInputCellProps<T>
	| EditableSelectCellProps<T>

export const EditableCell = <T extends DataId>(props: EditableCellProps<T>) => {
	const {
		dataIndex,
		children,
		onSave,
		options,
		rowData,
		type,
		updateRowData
	} = props

	const divRef = useRef<HTMLDivElement>(null)
	const [isEditing, setIsEditing] = useState(false)
	const [inputWidth, setInputWidth] = useState(0)
	const classes = useStyles(children)
	const editDivId = `editField-${rowData.id}`

	const startEdit = (e: MouseEvent) => {
		e.stopPropagation() // Prevents table row click from activating

		setInputWidth(divRef.current!.clientWidth + 70) // Set input width to width of cell content
		setIsEditing(true)
	}

	const stopEdit = () => setIsEditing(false)

	const handleOnSubmit = async (data: T) => {
		await onSave(rowData, data)

		updateRowData(rowData.id, data)
		stopEdit()
	}

	const onSubmit = (editedValues: Record<string, any>) =>
		handleOnSubmit((editedValues as unknown) as T)

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
						/>
						<Form.SubmitButton classes={[classes.submitButton]}>
							⏎
						</Form.SubmitButton>
					</>
				)
			case EditableCellTypes.select:
				return (
					<Form.Select
						{...commonProps}
						onBlur={stopEdit}
						options={formatSelectOptions(options!)}
						triggerSubmit
					/>
				)
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
		<Form initialValues={{ [dataIndex]: children }} onSubmit={onSubmit}>
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
			{children}
		</div>
	)
}
