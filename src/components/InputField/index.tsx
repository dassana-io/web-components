import 'antd/lib/input/style/index.css'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { Input } from 'antd'
import Skeleton from 'react-loading-skeleton'
import React, { FC } from 'react'

const useStyles = createUseStyles({
	'@keyframes shake': {
		'0%, 100%': { left: '0rem' },
		'20%, 60%': { left: '0.5rem' },
		'40%, 80%': { left: '-0.5rem' }
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: props => (props.fullWidth ? '100%' : '300px')
	},
	error: {
		animation: 'shake 0.2s ease-in-out 0s 2',
		border: '1px solid orange'
	},
	input: {
		border: '1px solid #DEDEDF',
		borderRadius: '4px',
		padding: '8.5px 14px'
	},
	label: {
		paddingBottom: '5px'
	},
	required: {
		'&::after': {
			color: 'red',
			// eslint-disable-next-line quotes
			content: "'*'",
			paddingLeft: '5px'
		}
	}
})

const InputFieldSkeleton: FC<InputFieldProps> = (props: InputFieldProps) => {
	const { fieldLabel } = props
	const classes = useStyles(props)

	return (
		<div className={classes.container}>
			{fieldLabel && (
				<div className={classes.label}>
					<Skeleton width={100} />
				</div>
			)}
			<div className={classes.input}>
				<Skeleton height={13} />
			</div>
		</div>
	)
}

export type InputType = 'text' | 'password'

export interface InputFieldProps {
	/**
	 * Array of classes to pass to button.
	 */
	classes?: string[]
	disabled?: boolean
	error?: boolean
	fieldLabel?: string
	fullWidth?: boolean
	loading?: boolean
	onChange?: () => void
	placeholder?: string
	required?: boolean
	type?: InputType
	value?: string
}

const InputField: FC<InputFieldProps> = (props: InputFieldProps) => {
	const {
		classes = [],
		disabled = false,
		onChange,
		error = false,
		fieldLabel = '',
		loading = false,
		placeholder = '',
		required = false,
		type = 'text',
		value
	} = props

	const componentClasses = useStyles(props)

	const inputClasses: string = cn(
		{
			[componentClasses.error]: error
		},
		classes
	)

	let controlledCmpProps = {}

	if (onChange) {
		controlledCmpProps = {
			onChange,
			value
		}
	}

	if (value && !onChange) {
		throw new Error('Controlled inputs require an onChange prop')
	}

	return loading ? (
		<InputFieldSkeleton {...props} />
	) : (
		<div className={componentClasses.container}>
			{fieldLabel && (
				<div
					className={cn({
						[componentClasses.label]: true,
						[componentClasses.required]: required
					})}
				>
					{fieldLabel}
				</div>
			)}
			<Input
				className={inputClasses}
				disabled={disabled}
				placeholder={placeholder}
				type={type}
				{...controlledCmpProps}
			/>
		</div>
	)
}

export default InputField
