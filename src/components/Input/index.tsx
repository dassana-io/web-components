import 'antd/lib/input/style/index.css'
import { Input as AntDInput } from 'antd'
import { BaseFormElementProps } from '../types'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { getDataTestAttributeProp } from '../utils'
import noop from 'lodash/noop'
import { Skeleton } from '../Skeleton'
import { ThemeType } from '../assets/styles/themes'
import {
	defaultFieldWidth,
	fieldErrorStyles
} from '../assets/styles/styleguide'
import {
	generateAddonStyles,
	generateInputSkeletonStyles,
	generateInputStyles
} from './utils'
import React, { FC, KeyboardEvent, RefObject } from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	container: {
		width: props => (props.fullWidth ? '100%' : defaultFieldWidth)
	},
	error: {},
	inputSkeleton: generateInputSkeletonStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		...fieldErrorStyles['@global'],
		[`.${dark}`]: {
			'& $input': generateInputStyles(dark),
			'& $inputSkeleton': generateInputSkeletonStyles(dark),
			'& $span': generateAddonStyles(dark)
		},
		input: generateInputStyles(light),
		span: generateAddonStyles(light)
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
	addonAfter?: string
	addonBefore?: string
	inputRef?: RefObject<AntDInput>
	onFocus?: () => void
	onKeyDown?: (e: KeyboardEvent) => void
	/**
	 * Type of input (ex: text, password)
	 * @default text
	 */
	type?: 'text' | 'password'
}

export const Input: FC<InputProps> = (props: InputProps) => {
	const {
		addonAfter,
		addonBefore,
		classes = [],
		dataTag,
		disabled = false,
		inputRef,
		onChange,
		onFocus = noop,
		onKeyDown = noop,
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
		<AntDInput
			addonAfter={addonAfter}
			addonBefore={addonBefore}
			className={cn(componentClasses.container, inputClasses)}
			disabled={disabled}
			onFocus={onFocus}
			onKeyDown={onKeyDown}
			placeholder={placeholder}
			ref={inputRef}
			type={type}
			{...controlledCmpProps}
			{...getDataTestAttributeProp('input', dataTag)}
		/>
	)
}
