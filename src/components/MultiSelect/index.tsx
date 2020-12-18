import '../assets/styles/antdAnimations.css'
import 'antd/lib/select/style/index.css'
import { Select as AntDSelect } from 'antd'
import { BaseFormElementProps } from '../types'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { getDataTestAttributeProp } from '../utils'
import { SelectSkeleton } from '../SharedComponents'
import { Tag } from 'components'
import {
	defaultFieldWidth,
	fieldErrorStyles,
	styleguide
} from '../assets/styles/styleguide'
import React, { FC, useState } from 'react'
import { themedStyles, ThemeType } from 'components/assets/styles/themes'

const { flexAlignCenter } = styleguide

const { dark, light } = ThemeType

const { Option } = AntDSelect

const useStyles = createUseStyles({
	container: {
		'& .ant-select$error > .ant-select-selector': {
			border: `1px solid ${themedStyles[light].error.borderColor}`
		},
		width: props => (props.fullWidth ? '100%' : defaultFieldWidth)
	},
	dropdown: {
		width: '100%'
	},
	error: { ...fieldErrorStyles.error },
	icon: {
		...flexAlignCenter,
		paddingRight: 7.5
	},
	option: {
		...flexAlignCenter
	},
	tag: {
		background: 'transparent',
		border: 'none',
		color: themedStyles[light].base.color,
		marginRight: 0,
		paddingRight: 0
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		...fieldErrorStyles['@global'],
		[`.${dark}`]: {
			'& $container .ant-select$error > .ant-select-selector': {
				border: `1px solid ${themedStyles[dark].error.borderColor}`
			}
		}
	}
})

export interface MultiSelectOptions {
	text: string
	value: string
}

export interface MultiSelectProps
	extends Omit<BaseFormElementProps, 'onChange' | 'value'> {
	/**
	 * Default values for select component. Without this, the select dropdown will be blank until an option is selected. Gets overwritten by values if both are provided
	 */
	defaultValues?: string[]
	/**
	 * Array of options to be rendered in the dropdown
	 */
	onChange?: (values?: string[]) => void
	options: MultiSelectOptions[]
	/**
	 * Input content values for controlled inputs. Requires an onChange to be passed
	 */
	pending?: boolean
	/**
	 * Selected values for if component is controlled. Requires an onChange to be passed
	 */
	values?: string
}

export const MultiSelect: FC<MultiSelectProps> = (props: MultiSelectProps) => {
	const {
		classes = [],
		dataTag,
		defaultValues = [],
		disabled = false,
		error = false,
		loading = false,
		// pending = false,
		onChange,
		options,
		placeholder = '',
		values
	} = props
	const [localValues, setLocalValues] = useState(
		values || defaultValues || []
	)

	const componentClasses = useStyles(props)

	const inputClasses: string = cn(
		{
			[componentClasses.error]: error,
			[componentClasses.dropdown]: true
		},
		classes
	)

	let controlledCmpProps = {}

	if (onChange) {
		controlledCmpProps = {
			onChange: (values: string[]) => {
				setLocalValues(values)
				onChange(values)
			},
			value: values
		}
	}

	if (values && !onChange) {
		throw new Error('Controlled inputs require an onChange prop')
	}

	const tagRender = (props: Record<string, any>) => {
		const { label, value } = props

		const hasComma =
			localValues.indexOf(value) !== -1 &&
			localValues.indexOf(value) < localValues.length - 1

		return (
			<Tag
				classes={[componentClasses.tag]}
				closable={false}
				color={value}
			>
				{label}
				{hasComma ? ',' : ''}
			</Tag>
		)
	}

	const renderOptions = () => {
		return options.map(({ text, value }) => (
			<Option
				className={componentClasses.option}
				key={value}
				label={text}
				value={value}
			>
				<span>{text}</span>
			</Option>
		))
	}

	return loading ? (
		<SelectSkeleton {...props} />
	) : (
		<div className={componentClasses.container}>
			<AntDSelect
				className={inputClasses}
				defaultValue={defaultValues}
				disabled={disabled}
				maxTagCount={2}
				maxTagPlaceholder={selectedOpts =>
					`& ${selectedOpts.length} more`
				}
				maxTagTextLength={5}
				menuItemSelectedIcon={null}
				mode={'multiple'}
				placeholder={placeholder}
				showArrow
				tagRender={tagRender}
				{...controlledCmpProps}
				{...getDataTestAttributeProp('select', dataTag)}
			>
				{renderOptions()}
			</AntDSelect>
		</div>
	)
}
