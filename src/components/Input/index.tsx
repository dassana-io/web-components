import 'antd/lib/input/style/index.css'
import { type BaseFormElementProps } from '../types'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { getDataTestAttributeProp } from '../utils'
import InputSkeleton from './InputSkeleton'
import noop from 'lodash/noop'
import omit from 'lodash/omit'
import { ThemeType } from '../assets/styles/themes'
import {
	Input as AntDInput,
	type InputProps as AntDInputProps,
	type InputRef
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
	type FC,
	type FocusEvent,
	type KeyboardEvent,
	type ReactNode,
	type RefObject,
	useCallback
} from 'react'

const { TextArea } = AntDInput

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	container: {
		width: props => (props.fullWidth ? '100%' : defaultFieldWidth)
	},
	error: {
		'& input': generateCommonErrorStyles(light),
		'& span': generateCommonErrorStyles(light),
		'& textarea': generateCommonErrorStyles(light)
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		...fieldErrorStyles['@global'],
		[`.${dark}`]: {
			'& $error': {
				'& $input': generateCommonErrorStyles(dark),
				'& $span': generateCommonErrorStyles(dark),
				'& $textarea': generateCommonErrorStyles(dark)
			},
			'& $input': generateInputStyles(dark),
			'& $span': generateAddonStyles(dark),
			'& $textarea': generateInputStyles(dark)
		},
		input: generateInputStyles(light),
		span: generateAddonStyles(light),
		textarea: generateInputStyles(light)
	}
})

export interface InputProps extends BaseFormElementProps<HTMLInputElement> {
	addonAfter?: string
	addonBefore?: string
	autoSelectOnFocus?: boolean
	containerClasses?: string[]
	defaultValue?: string
	errorClassname?: string
	inputRef?: RefObject<InputRef>
	focused?: boolean
	max?: AntDInputProps['max']
	maxLength?: AntDInputProps['maxLength']
	min?: AntDInputProps['min']
	minLength?: AntDInputProps['minLength']
	multiLine?: boolean
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
		errorClassname = '',
		focused = false,
		inputRef,
		max,
		maxLength,
		min,
		minLength,
		multiLine = false,
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
			[componentClasses.error]: error,
			[errorClassname]: error
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

	const commonProps = {
		autoFocus: focused,
		className: cn(classes),
		defaultValue,
		disabled,
		maxLength,
		minLength,
		onBlur,
		onKeyDown,
		placeholder,
		ref: inputRef,
		...controlledCmpProps,
		...getDataTestAttributeProp('input', dataTag)
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
			{multiLine ? (
				<TextArea {...omit(commonProps, 'onKeyDown')} />
			) : (
				<AntDInput
					addonAfter={addonAfter}
					addonBefore={addonBefore}
					max={max}
					min={min}
					onFocus={handleOnFocus}
					suffix={suffix}
					type={type}
					{...commonProps}
				/>
			)}
		</div>
	)
}

export type { InputRef }
