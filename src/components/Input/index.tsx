import 'antd/lib/input/style/index.css'
import { BaseFormElementProps } from '../types'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { getDataTestAttributeProp } from '../utils'
import InputSkeleton from './InputSkeleton'
import noop from 'lodash/noop'
import { ThemeType } from '../assets/styles/themes'
import {
	Input as AntDInput,
	InputProps as AntDInputProps,
	InputRef
} from 'antd'
import {
	defaultFieldWidth,
	fieldErrorStyles
} from '../assets/styles/styleguide'
import {
	generateAddonStyles,
	generateCommonErrorStyles,
	generateInputStyles
} from './utils'
import React, {
	FC,
	FocusEvent,
	KeyboardEvent,
	ReactNode,
	RefObject,
	useCallback
} from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	container: {
		width: props => (props.fullWidth ? '100%' : defaultFieldWidth)
	},
	error: {
		'& input': generateCommonErrorStyles(light),
		'& span': generateCommonErrorStyles(light)
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		...fieldErrorStyles['@global'],
		[`.${dark}`]: {
			'& $error': {
				'& $input': generateCommonErrorStyles(dark),
				'& $span': generateCommonErrorStyles(dark)
			},
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
	autoSelectOnFocus?: boolean
	containerClasses?: string[]
	defaultValue?: string
	inputRef?: RefObject<InputRef>
	focused?: boolean
	max?: AntDInputProps['max']
	maxLength?: AntDInputProps['maxLength']
	min?: AntDInputProps['min']
	minLength?: AntDInputProps['minLength']
	onFocus?: (e: FocusEvent<HTMLInputElement>) => void
	onKeyDown?: (e: KeyboardEvent) => void
	suffix?: ReactNode
	/**
	 * Type of input (ex: text, password)
	 * @default text
	 */
	type?: 'number' | 'text' | 'password'
}

export const Input: FC<InputProps> = (props: InputProps) => {
	const {
		addonAfter,
		addonBefore,
		autoSelectOnFocus = false,
		classes = [],
		containerClasses = [],
		dataTag,
		defaultValue,
		disabled = false,
		focused = false,
		inputRef,
		max,
		maxLength,
		min,
		minLength,
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

	const inputContainerClasses: string = cn(
		{
			[componentClasses.container]: true,
			[componentClasses.error]: error
		},
		containerClasses
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

	const handleOnFocus = useCallback(
		(e: FocusEvent<HTMLInputElement>) => {
			autoSelectOnFocus && e.target.select()

			onFocus()
		},
		[autoSelectOnFocus, onFocus]
	)

	return loading ? (
		<InputSkeleton fullWidth={props.fullWidth} />
	) : (
		<div className={inputContainerClasses}>
			<AntDInput
				addonAfter={addonAfter}
				addonBefore={addonBefore}
				autoFocus={focused}
				className={cn(classes)}
				defaultValue={defaultValue}
				disabled={disabled}
				max={max}
				maxLength={maxLength}
				min={min}
				minLength={minLength}
				onBlur={onBlur}
				onFocus={handleOnFocus}
				onKeyDown={onKeyDown}
				placeholder={placeholder}
				ref={inputRef}
				suffix={suffix}
				type={type}
				{...controlledCmpProps}
				{...getDataTestAttributeProp('input', dataTag)}
			/>
		</div>
	)
}

export type { InputRef }
