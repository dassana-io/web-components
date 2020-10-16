import 'antd/lib/input/style/index.css'
import { Input as AntDInput } from 'antd'
import { BaseFormElementProps } from '../types'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { getDataTestAttributeProp } from '../utils'
import { Skeleton } from '../Skeleton'
import { ThemeType } from '../assets/styles/themes'
import {
	defaultFieldWidth,
	fieldErrorStyles
} from '../assets/styles/styleguide'
import { generateInputSkeletonStyles, generateInputStyles } from './utils'
import React, { FC } from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	container: {
		width: props => (props.fullWidth ? '100%' : defaultFieldWidth)
	},
	error: { ...fieldErrorStyles.error },
	inputSkeleton: generateInputSkeletonStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		...fieldErrorStyles['@global'],
		[`.${dark}`]: {
			'& $input': generateInputStyles(dark),
			'& $inputSkeleton': generateInputSkeletonStyles(dark)
		},
		input: generateInputStyles(light)
	}
})

const InputSkeleton: FC<InputProps> = (props: InputProps) => {
	const classes = useStyles(props)

	return (
		<div className={classes.container}>
			<div className={classes.inputSkeleton}>
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

export const Input: FC<InputProps> = (props: InputProps) => {
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
