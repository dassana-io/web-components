import 'antd/lib/input/style/index.css'
import { Input as AntDInput } from 'antd'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import Skeleton from '../Skeleton'
import React, { FC } from 'react'

const useStyles = createUseStyles({
	'@global': {
		'@keyframes shake': {
			'0%, 100%': { left: '0rem' },
			'20%, 60%': { left: '0.5rem' },
			'40%, 80%': { left: '-0.5rem' }
		}
	},
	container: {
		width: props => (props.fullWidth ? '100%' : '300px')
	},
	error: {
		animation: 'shake 0.2s ease-in-out 0s 2',
		border: '1px solid orange'
	},
	input: {
		border: '1px solid #DEDEDF',
		borderRadius: '4px',
		padding: '6px 14px'
	}
})

const InputFieldSkeleton: FC<InputProps> = (props: InputProps) => {
	const classes = useStyles(props)

	return (
		<div className={classes.container}>
			<div className={classes.input}>
				<Skeleton height={16} />
			</div>
		</div>
	)
}

export interface InputProps {
	/**
	 * Array of classes to pass to input
	 * @default []
	 */
	classes?: string[]
	/**
	 * Adds the disabled attribute and styles (opacity, gray scale filter, no pointer events)
	 * @default false
	 */
	disabled?: boolean
	/**
	 * Whether or not to show error state and animation
	 * @default false
	 */
	error?: boolean
	/**
	 * Whether or not input spans the full width of the parent container
	 * @default false
	 */
	fullWidth?: boolean
	/**
	 * Whether or not to show skeleton loader
	 * @default false
	 */
	loading?: boolean
	/**
	 * Callback that runs when input is updated
	 * @default () => {}
	 */
	onChange?: () => void
	/**
	 * Describes expected value of input
	 */
	placeholder?: string
	/**
	 * Type of input (ex: text, password)
	 * @default text
	 */
	type?: 'text' | 'password'
	/**
	 * Input content value for controlled inputs. Requires an onChange to be passed
	 */
	value?: string
}

const Input: FC<InputProps> = (props: InputProps) => {
	const {
		classes = [],
		disabled = false,
		onChange,
		error = false,
		loading = false,
		placeholder = '',
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
			<AntDInput
				className={inputClasses}
				disabled={disabled}
				placeholder={placeholder}
				type={type}
				{...controlledCmpProps}
			/>
		</div>
	)
}

export default Input
