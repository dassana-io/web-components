import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { faPencilAlt } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from '../Input'
import { ShortcutMicrocopy } from '../ShortcutMicrocopy'
import { styleguide } from '../assets/styles'
import { useClickOutside } from '@dassana-io/web-utils'
import React, { FC, useCallback, useState } from 'react'

const { spacing } = styleguide

const useStyles = createUseStyles({
	editIcon: {
		marginLeft: spacing.l,
		opacity: 0
	},
	value: ({ fullWidth }: Pick<EditableFieldProps, 'fullWidth'>) => ({
		'&:hover': {
			'& $editIcon': {
				opacity: 1
			}
		},
		alignItems: 'center',
		cursor: ({ editable }) => (editable ? 'pointer' : 'default'),
		display: 'flex',
		height: spacing.xl,
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		width: fullWidth ? 'max-content' : '100%'
	})
})

interface EditableFieldProps {
	editable?: boolean
	fullWidth?: boolean
	inputContainerClasses?: string[]
	onSubmit: (newValue: string) => void
	value: string
	valueContainerClasses?: string[]
}

export const EditableField: FC<EditableFieldProps> = ({
	editable = true,
	fullWidth = false,
	inputContainerClasses = [],
	onSubmit,
	value,
	valueContainerClasses = []
}: EditableFieldProps) => {
	const classes = useStyles({ editable, fullWidth })

	const [inputValue, setInputValue] = useState(value)
	const [isEditing, setIsEditing] = useState(false)

	const onClickOutside = useCallback(
		(key?: string) => {
			if (isEditing) {
				if (key && key !== 'Escape' && value) onSubmit(inputValue)

				setIsEditing(false)
			}
		},
		[inputValue, isEditing, onSubmit, value]
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
		<div className={cn(inputContainerClasses)} ref={editingRef}>
			<Input
				focused
				fullWidth={fullWidth}
				onChange={e => setInputValue(e.currentTarget.value)}
				value={inputValue}
			/>
			{!fullWidth && <ShortcutMicrocopy />}
		</div>
	)

	return isEditing ? renderInput() : renderValue()
}
