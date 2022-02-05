import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { faPencilAlt } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from '../Input'
import { ShortcutMicrocopy } from '../ShortcutMicrocopy'
import { styleguide } from '../assets/styles'
import { useClickOutside } from '@dassana-io/web-utils'
import React, {
	Dispatch,
	FC,
	RefObject,
	SetStateAction,
	useCallback,
	useImperativeHandle,
	useState
} from 'react'

const { flexAlignCenter, spacing } = styleguide

const useStyles = createUseStyles({
	editIcon: {
		marginLeft: spacing.l,
		opacity: 0
	},
	inputContainer: {
		...flexAlignCenter
	},
	value: ({
		editable,
		fullWidth
	}: Pick<EditableFieldProps, 'editable' | 'fullWidth'>) => ({
		'&:hover': {
			'& $editIcon': {
				opacity: 1
			}
		},
		alignItems: 'center',
		cursor: editable ? 'pointer' : 'default',
		display: 'flex',
		height: spacing.xl,
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		width: fullWidth ? 'max-content' : '100%'
	})
})

export interface EditableFieldMethods {
	isEditing: boolean
	setIsEditing: Dispatch<SetStateAction<boolean>>
}

interface EditableFieldProps {
	editable?: boolean
	fieldRef?: RefObject<EditableFieldMethods>
	fullWidth?: boolean
	inputContainerClasses?: string[]
	onClickOutsideCb?: () => void
	onSubmit: (newValue: string) => void
	placeholder?: string
	renderShortcutMicrocopy?: boolean
	value: string
	valueContainerClasses?: string[]
}

export const EditableField: FC<EditableFieldProps> = ({
	editable = true,
	fieldRef,
	fullWidth = false,
	inputContainerClasses = [],
	onClickOutsideCb,
	onSubmit,
	placeholder = '',
	renderShortcutMicrocopy = true,
	value,
	valueContainerClasses = []
}: EditableFieldProps) => {
	const classes = useStyles({ editable, fullWidth })

	const [inputValue, setInputValue] = useState(value)
	const [isEditing, setIsEditing] = useState(false)

	useImperativeHandle(fieldRef, () => ({ isEditing, setIsEditing }))

	const onClickOutside = useCallback(
		(key?: string) => {
			if (isEditing) {
				if (key && key !== 'Escape' && inputValue) onSubmit(inputValue)

				setIsEditing(false)
				onClickOutsideCb && onClickOutsideCb()
			}
		},
		[inputValue, isEditing, onClickOutsideCb, onSubmit]
	)

	const editingRef = useClickOutside({
		callback: onClickOutside,
		keys: ['Enter', 'Escape']
	})

	const renderValue = () => (
		<div
			className={cn(classes.value, valueContainerClasses)}
			onClick={() => {
				if (editable) {
					setIsEditing(true)
				}
			}}
		>
			{inputValue}
			{editable && (
				<FontAwesomeIcon
					className={classes.editIcon}
					icon={faPencilAlt}
					size='xs'
				/>
			)}
		</div>
	)

	const renderInput = () => (
		<div
			className={cn(
				{ [classes.inputContainer]: true },
				inputContainerClasses
			)}
			ref={editingRef}
		>
			<Input
				focused
				fullWidth={fullWidth}
				onChange={e => setInputValue(e.currentTarget.value)}
				placeholder={placeholder}
				value={inputValue}
			/>
			{renderShortcutMicrocopy && <ShortcutMicrocopy />}
		</div>
	)

	return isEditing ? renderInput() : renderValue()
}