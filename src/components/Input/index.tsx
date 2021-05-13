import 'antd/lib/input/style/index.css'
import { Input as AntDInput } from 'antd'
import { BaseFormElementProps } from '../types'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { getDataTestAttributeProp } from '../utils'
import InputSkeleton from './InputSkeleton'
import noop from 'lodash/noop'
import { ThemeType } from '../assets/styles/themes'
import {
	defaultFieldWidth,
	fieldErrorStyles
} from '../assets/styles/styleguide'
import { generateAddonStyles, generateInputStyles } from './utils'
import React, {
	FC,
	FocusEvent,
	KeyboardEvent,
	ReactNode,
	RefObject
} from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	container: {
		width: props => (props.fullWidth ? '100%' : defaultFieldWidth)
	},
	error: {},
	// eslint-disable-next-line sort-keys
	'@global': {
		...fieldErrorStyles['@global'],
		[`.${dark}`]: {
			'& $input': generateInputStyles(dark),
			'& $span': generateAddonStyles(dark)
		},
		input: generateInputStyles(light),
		span: generateAddonStyles(light)
	}
})

export interface InputProps extends BaseFormElementProps<HTMLInputElement> {
	addonAfter?: string
	addonBefore?: string
	defaultValue?: string
	inputRef?: RefObject<AntDInput>
	focused?: boolean
	onFocus?: (e: FocusEvent<HTMLInputElement>) => void
	onKeyDown?: (e: KeyboardEvent) => void
	suffix?: ReactNode
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
		defaultValue,
		disabled = false,
		focused = false,
		inputRef,
		onBlur = noop,
		onChange,
		onFocus = noop,
		onKeyDown = noop,
		error = false,
		loading = false,
		placeholder = '',
		suffix,
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
		<InputSkeleton fullWidth={props.fullWidth} />
	) : (
		<AntDInput
			addonAfter={addonAfter}
			addonBefore={addonBefore}
			autoFocus={focused}
			className={cn(componentClasses.container, inputClasses)}
			defaultValue={defaultValue}
			disabled={disabled}
			onBlur={onBlur}
			onFocus={onFocus}
			onKeyDown={onKeyDown}
			placeholder={placeholder}
			ref={inputRef}
			suffix={suffix}
			type={type}
			{...controlledCmpProps}
			{...getDataTestAttributeProp('input', dataTag)}
		/>
	)
}
