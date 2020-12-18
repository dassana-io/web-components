import '../assets/styles/antdAnimations.css'
import 'antd/lib/select/style/index.css'
import { Select as AntDSelect } from 'antd'
import { BaseFormElementProps } from '../types'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { mapOptions } from './utils'
import { SelectSkeleton } from '../SharedComponents'
import { Checkbox, Tag } from 'components'
import {
	defaultFieldWidth,
	fieldErrorStyles,
	styleguide
} from '../assets/styles/styleguide'
import { generatePopupSelector, getDataTestAttributeProp } from '../utils'
import React, { FC, useState } from 'react'
import { themedStyles, ThemeType } from 'components/assets/styles/themes'

const { flexAlignCenter, spacing } = styleguide

const { dark, light } = ThemeType

const { Option } = AntDSelect

const useStyles = createUseStyles({
	checkbox: { marginRight: spacing.s },
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
		marginRight: spacing.xs,
		padding: 0
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

export interface MultiSelectOption {
	text: string
	value: string
}

export interface MultiSelectProps
	extends Omit<BaseFormElementProps, 'onChange' | 'value'> {
	/**
	 * Default values for select component. Without this, the select dropdown will be blank until an option is selected. Gets overwritten by values if both are provided
	 */
	defaultValues?: string[]
	maxTagCount?: number
	/**
	 * Array of options to be rendered in the dropdown
	 */
	onChange?: (values?: string[]) => void
	onSearch?: (value: string) => void
	options: MultiSelectOption[]
	/**
	 * Input content values for controlled inputs. Requires an onChange to be passed
	 */
	pending?: boolean
	/**
	 * Selector of HTML element inside which to render the popup/dropdown
	 */
	popupContainerSelector?: string
	/**
	 * Selected values for if component is controlled. Requires an onChange to be passed
	 */
	values?: string[]
}

export const MultiSelect: FC<MultiSelectProps> = (props: MultiSelectProps) => {
	const {
		classes = [],
		dataTag,
		defaultValues = [],
		disabled = false,
		error = false,
		loading = false,
		maxTagCount = 2,
		// pending = false,
		popupContainerSelector,
		onChange,
		onSearch,
		options,
		placeholder = '',
		values
	} = props
	const [localValues, setLocalValues] = useState(values || defaultValues)

	const mappedOptions = mapOptions(options)

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

	let popupContainerProps = {}

	if (popupContainerSelector) {
		popupContainerProps = {
			getPopupContainer: generatePopupSelector(popupContainerSelector)
		}
	}

	const tagRender = (props: Record<string, any>) => {
		const { label, value } = props

		const index = localValues.indexOf(value)
		const hasComma =
			index !== -1 &&
			index < maxTagCount - 1 &&
			index < localValues.length - 1

		return (
			<Tag
				classes={[componentClasses.tag]}
				closable={false}
				color={value}
			>
				{mappedOptions[value] ? mappedOptions[value].text : label}
				{hasComma ? ', ' : ''}
			</Tag>
		)
	}

	const renderOptions = () =>
		options.map(({ text, value }) => (
			<Option
				className={componentClasses.option}
				key={value}
				label={text}
				value={value}
			>
				<Checkbox
					checked={localValues.indexOf(value) >= 0}
					classes={[componentClasses.checkbox]}
					// eslint-disable-next-line @typescript-eslint/no-empty-function
					onChange={() => {}}
				/>
				<span>{text}</span>
			</Option>
		))

	return loading ? (
		<SelectSkeleton {...props} />
	) : (
		<div className={componentClasses.container}>
			<AntDSelect
				className={inputClasses}
				defaultValue={defaultValues}
				disabled={disabled}
				maxTagCount={maxTagCount}
				maxTagPlaceholder={selectedOpts =>
					`& ${selectedOpts.length} more`
				}
				menuItemSelectedIcon={null}
				mode={'multiple'}
				onSearch={onSearch}
				placeholder={placeholder}
				showArrow
				tagRender={tagRender}
				{...controlledCmpProps}
				{...getDataTestAttributeProp('select', dataTag)}
				{...popupContainerProps}
			>
				{renderOptions()}
			</AntDSelect>
		</div>
	)
}
