import '../assets/styles/antdAnimations.css'
import 'antd/lib/select/style/index.css'
import { Select as AntDSelect } from 'antd'
import { BaseFormElementProps } from '../types'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { SelectSkeleton } from '../SharedComponents'
import { Checkbox, Input } from 'components'
import {
	defaultFieldWidth,
	fieldErrorStyles,
	styleguide
} from '../assets/styles/styleguide'
import { generatePopupSelector, getDataTestAttributeProp } from '../utils'
import {
	generateThemedDropdownStyles,
	generateThemedInputStyles,
	generateThemedOptionStyles,
	generateThemedTagStyles
} from './utils'
import React, { FC, useRef, useState } from 'react'
import { themedStyles, ThemeType } from 'components/assets/styles/themes'

const { borderRadius, flexAlignCenter, spacing } = styleguide

const { dark, light } = ThemeType

const { Option } = AntDSelect

const useStyles = createUseStyles({
	checkbox: { marginRight: spacing.s },
	container: {
		'& .ant-select': {
			'&$error > .ant-select-selector': {
				border: `1px solid ${themedStyles[light].error.borderColor}`
			},
			'&.ant-select-multiple': {
				...generateThemedTagStyles(light),
				'& .ant-select-selection-search': {
					display: 'none'
				},
				'& .ant-select-selector': {
					...generateThemedInputStyles(light),
					borderRadius
				}
			},
			width: '100%'
		},
		width: props => (props.fullWidth ? '100%' : defaultFieldWidth)
	},
	dropdown: generateThemedDropdownStyles(light),
	error: { ...fieldErrorStyles.error },
	option: {
		...flexAlignCenter,
		...generateThemedOptionStyles(light)
	},
	searchBar: {
		margin: 3 * spacing.xs,
		width: `calc(100% - ${6 * spacing.xs}px)`
	},
	tag: {
		marginRight: spacing.xs
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		...fieldErrorStyles['@global'],
		[`.${dark}`]: {
			'& $container': {
				'& .ant-select': {
					'&$error > .ant-select-selector': {
						border: `1px solid ${themedStyles[dark].error.borderColor}`
					},
					'&.ant-select-multiple': {
						...generateThemedTagStyles(dark),
						'& .ant-select-selector': {
							...generateThemedInputStyles(dark)
						}
					}
				}
			},
			'& $dropdown': generateThemedDropdownStyles(dark),
			'& $option': generateThemedOptionStyles(dark)
		}
	}
})

export interface MultiSelectOption {
	text: string
	value: string
}

export interface MultiSelectProps
	extends Omit<BaseFormElementProps, 'onChange' | 'value'> {
	allowClear?: boolean
	/**
	 * Default values for select component. Without this, the select dropdown will be blank until an option is selected. Gets overwritten by values if both are provided
	 */
	defaultValues?: string[]
	maxTagCount?: number
	maxTagTextLength?: number
	/**
	 * Array of options to be rendered in the dropdown
	 */
	onChange?: (values?: string[]) => void
	onSearch?: BaseFormElementProps['onChange']
	options: MultiSelectOption[]
	/**
	 * Input content values for controlled inputs. Requires an onChange to be passed
	 */
	pending?: boolean
	/**
	 * Selector of HTML element inside which to render the popup/dropdown
	 */
	popupContainerSelector?: string
	searchPlaceholder?: string
	/**
	 * Whether or not to show search input
	 * @default false
	 */
	showSearch?: boolean
	/**
	 * Selected values for if component is controlled. Requires an onChange to be passed
	 */
	values?: string[]
}

export const MultiSelect: FC<MultiSelectProps> = (props: MultiSelectProps) => {
	const {
		allowClear,
		classes = [],
		dataTag,
		defaultValues = [],
		disabled = false,
		error = false,
		loading = false,
		maxTagCount = 2,
		maxTagTextLength = 6,
		// pending = false,
		popupContainerSelector,
		onChange,
		onSearch,
		options,
		placeholder = '',
		searchPlaceholder = '',
		showSearch = false,
		values
	} = props
	const selectRef = useRef<AntDSelect>(null)

	// const [searchFocused, setSearchFocused] = useState(false)
	const [searchValue, setSearchValue] = useState('')

	const [localValues, setLocalValues] = useState(values || defaultValues)

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
			onChange: (values: string[]) => {
				setLocalValues(values)
				onChange(values)
			},
			value: values ? values : localValues
		}
	} else {
		controlledCmpProps = {
			onChange: (values: string[]) => {
				setLocalValues(values)
			},
			value: localValues
		}
	}

	if (values && !onChange) {
		throw new Error('Controlled MultiSelect requires an onChange prop')
	}

	let popupContainerProps = {}

	if (popupContainerSelector) {
		popupContainerProps = {
			getPopupContainer: generatePopupSelector(popupContainerSelector)
		}
	}

	return loading ? (
		<SelectSkeleton {...props} />
	) : (
		<div className={componentClasses.container}>
			<AntDSelect
				allowClear={allowClear}
				className={inputClasses}
				defaultValue={defaultValues}
				disabled={disabled}
				dropdownClassName={componentClasses.dropdown}
				dropdownMatchSelectWidth
				dropdownRender={menu => (
					<>
						{showSearch && (
							<Input
								classes={[componentClasses.searchBar]}
								onChange={(
									event: React.ChangeEvent<HTMLInputElement>
								) => setSearchValue(event.target.value)}
								// onChange={onSearch}
								// onFocus={() => setSearchFocused(true)}
								// onFocus={() => {
								// 	if (selectRef.current)
								// 		selectRef.current.blur()
								// }}
								placeholder={searchPlaceholder}
							/>
						)}
						{menu}
					</>
				)}
				maxTagCount={maxTagCount}
				maxTagPlaceholder={selectedOpts =>
					`& ${selectedOpts.length} more`
				}
				maxTagTextLength={maxTagTextLength}
				menuItemSelectedIcon={null}
				mode={'multiple'}
				// onInputKeyDown={e => {
				// 	console.log(e.key)
				// }}
				optionLabelProp='label'
				// open
				placeholder={placeholder}
				ref={selectRef}
				// searchValue={searchValue}
				showArrow
				showSearch={false}
				{...controlledCmpProps}
				{...getDataTestAttributeProp('select', dataTag)}
				{...popupContainerProps}
			>
				{options.map(({ text, value }) => (
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
				))}
			</AntDSelect>
		</div>
	)
}
