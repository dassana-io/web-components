import 'antd/lib/input/style/index.css'
import { Input as AntDInput } from 'antd'
import { BaseFormElementProps } from '../types'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { generateInputCSSVals } from './utils'
import { getDataTestAttributeProp } from '../utils'
import Skeleton from '../Skeleton'
import {
	defaultFieldWidth,
	fieldErrorStyles
} from '../assets/styles/styleguide'
import React, { FC } from 'react'

const {
	defaultBgColor,
	defaultBorderColor,
	defaultColor,
	defaultFocusBoxShadow,
	disabledBgColor,
	focusBorderColor,
	hoverBorderColor
} = generateInputCSSVals()

const errorAnimationKeyFrames = fieldErrorStyles['@global']

const useStyles = createUseStyles({
	'@global': {
		...errorAnimationKeyFrames,
		'input.ant-input': {
			'&:hover': {
				borderColor: hoverBorderColor
			},
			backgroundColor: defaultBgColor,
			borderColor: defaultBorderColor,
			color: defaultColor
		},
		'input.ant-input-disabled, .ant-input[disabled]': {
			'&:hover': {
				borderColor: disabledBgColor
			},
			backgroundColor: disabledBgColor
		},
		'input.ant-input-focused, input.ant-input:focus': {
			borderColor: focusBorderColor,
			boxShadow: defaultFocusBoxShadow
		},
		'input.ant-input.error': fieldErrorStyles.error
	},
	container: {
		width: props => (props.fullWidth ? '100%' : defaultFieldWidth)
	},
	input: {
		border: '1px solid #DEDEDF',
		borderRadius: '4px',
		padding: '6px 14px'
	}
})

const InputSkeleton: FC<InputProps> = (props: InputProps) => {
	const classes = useStyles(props)

	return (
		<div className={classes.container}>
			<div className={classes.input}>
				<Skeleton height={16} />
			</div>
		</div>
	)
}

export interface InputProps extends BaseFormElementProps {
	/**
	 * Type of input (ex: text, password)
	 * @default text
	 */
	type?: 'text' | 'password'
}

const Input: FC<InputProps> = (props: InputProps) => {
	const {
		classes = [],
		dataTag,
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
			error
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
		<InputSkeleton {...props} />
	) : (
		<div className={componentClasses.container}>
			<AntDInput
				className={inputClasses}
				disabled={disabled}
				placeholder={placeholder}
				type={type}
				{...controlledCmpProps}
				{...getDataTestAttributeProp('input', dataTag)}
			/>
		</div>
	)
}

export default Input
