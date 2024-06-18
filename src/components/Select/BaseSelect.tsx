import '../assets/styles/antdAnimations.css'
import 'antd/lib/select/style/index.css'
import { Select as AntDSelect } from 'antd'
import { type BaseSelectRef } from 'rc-select'
import { Checkbox } from '../Checkbox'
import cn from 'classnames'
import { getDataTestAttributeProp } from '../utils'
import { type MultiSelectProps } from './MultiSelect/types'
import { NoContentFound } from './NoContentFound'
import noop from 'lodash/noop'
import { OptionChildren } from './OptionChildren'
import { type SelectProps } from './SingleSelect/types'
import { SelectSkeleton } from './SingleSelect/SelectSkeleton'
import { Spin } from '../Spin'
import React, { type FC, type ReactElement, useCallback, useRef } from 'react'

const { Option } = AntDSelect

interface CommonBaseSelectProps
	extends Omit<SelectProps, 'defaultValue' | 'onChange' | 'value'> {
	dropdownRender?: (menu: ReactElement) => ReactElement
	onDropdownVisibleChange?: (open: boolean) => void
	useStyles: (data?: unknown) => Record<string, string>
}

interface BaseMultiSelectProps
	extends Pick<
		MultiSelectProps,
		'onChange' | 'onSearch' | 'maxTagCount' | 'maxTagTextLength' | 'pending'
	> {
	defaultValue?: MultiSelectProps['defaultValues']
	localValues: string[]
	mode: 'multiple'
	value?: MultiSelectProps['values']
}

interface BaseSingleSelectProps
	extends Pick<
		SelectProps,
		'defaultValue' | 'onChange' | 'onSearch' | 'value'
	> {
	filterOption?: boolean
	mode: 'single'
}

interface BaseTagsSelectProps
	extends Omit<BaseMultiSelectProps, 'mode' | 'localValues'> {
	mode: 'tags'
}

type BaseSelectProps = CommonBaseSelectProps &
	(BaseSingleSelectProps | BaseMultiSelectProps | BaseTagsSelectProps)

export const BaseSelect: FC<BaseSelectProps> = (props: BaseSelectProps) => {
	const {
		classes = [],
		containerClasses = [],
		dataTag,
		defaultOpen = false,
		disabled = false,
		dropdownContainerClasses = [],
		dropdownRender,
		error = false,
		filterOption = true,
		focused = false,
		loading = false,
		onBlur,
		onDropdownVisibleChange,
		onFocus,
		open,
		options = [],
		optionsConfig = {},
		placeholder = '',
		showSearch = false,
		size,
		useStyles
	} = props

	const dropdownRef = useRef<BaseSelectRef>(null)

	const handleDropdownVisibleChange = useCallback(
		(open: boolean) => {
			if (!open) {
				setTimeout(
					() => dropdownRef.current && dropdownRef.current.blur(),
					0
				)
			}

			onDropdownVisibleChange?.(open)
		},
		[onDropdownVisibleChange]
	)

	const componentClasses = useStyles(props)

	const inputClasses: string = cn(
		{
			[componentClasses.error]: error
		},
		classes
	)

	let multiSelectProps = {}
	let singleSelectProps = {}
	let tagsSelectProps = {}

	if (props.mode === 'multiple') {
		const {
			defaultValue,
			dropdownRender,
			maxTagCount = 2,
			maxTagTextLength = 12,
			onChange,
			pending = false,
			value
		} = props

		multiSelectProps = {
			defaultValue,
			dropdownRender,
			maxTagCount,
			maxTagPlaceholder: (selectedOpts: any[]) =>
				`& ${selectedOpts.length} more`,
			maxTagTextLength,
			menuItemSelectedIcon: null,
			mode: 'multiple',
			notFoundContent: pending ? (
				<NoContentFound>
					<Spin size={20} />
				</NoContentFound>
			) : (
				<NoContentFound />
			),
			onChange,
			optionLabelProp: 'label',
			showSearch: false,
			value,
			...getDataTestAttributeProp('multi-select', dataTag)
		}
	} else if (props.mode === 'tags') {
		const {
			defaultValue,
			onChange,
			onSearch,
			pending = false,
			value
		} = props

		tagsSelectProps = {
			defaultValue,
			filterOption,
			menuItemSelectedIcon: null,
			mode: 'tags',
			notFoundContent: pending ? (
				<NoContentFound>
					<Spin size={20} />
				</NoContentFound>
			) : (
				<NoContentFound />
			),
			onChange,
			onSearch,
			optionLabelProp: 'label',
			value,
			...getDataTestAttributeProp('tags-select', dataTag)
		}
	} else {
		const { defaultValue, onChange, onSearch, showSearch, value } = props

		singleSelectProps = {
			defaultValue,
			filterOption,
			onBlur,
			onChange,
			onSearch,
			// Todo: allow filtering by multiple keys like in MultipleSelect with prop 	'optionKeysToFilter'. AntD prop is filterOption
			optionFilterProp: 'label',
			showSearch,
			value,
			...getDataTestAttributeProp('select', dataTag)
		}
	}

	return loading ? (
		<SelectSkeleton {...props} />
	) : (
		<div
			className={cn(
				{ [componentClasses.container]: true },
				containerClasses
			)}
		>
			<AntDSelect
				autoFocus={focused}
				className={inputClasses}
				defaultOpen={defaultOpen}
				disabled={disabled}
				dropdownRender={dropdownRender}
				getPopupContainer={trigger => trigger.parentElement}
				notFoundContent={<NoContentFound />}
				onDropdownVisibleChange={handleDropdownVisibleChange}
				onFocus={onFocus}
				open={open}
				placeholder={placeholder}
				popupClassName={cn(
					{ [componentClasses.dropdown]: true },
					dropdownContainerClasses
				)}
				ref={dropdownRef}
				showArrow
				showSearch={showSearch}
				size={size}
				{...multiSelectProps}
				{...singleSelectProps}
				{...tagsSelectProps}
			>
				{/* if state is pending, options are being fetched outside the component, so don't render options. With no options, `notFoundContent` prop will render a spinning loader */}
				{!('pending' in props && props.pending) &&
					options.map(
						({
							classes: optClasses = [],
							disabled = false,
							hidden = false,
							iconKey,
							iconUrl,
							text,
							style,
							value
						}) => (
							<Option
								className={cn(
									{
										[componentClasses.option]: true,
										[componentClasses.hidden]: hidden
									},
									optClasses
								)}
								disabled={disabled}
								key={value}
								label={text}
								value={value}
							>
								{props.mode === 'multiple' && (
									<Checkbox
										checked={props.localValues.includes(
											value
										)}
										classes={[componentClasses.checkbox]}
										onChange={noop}
									/>
								)}
								<OptionChildren
									iconKey={iconKey}
									iconUrl={iconUrl}
									key={value}
									optionsConfig={{ ...optionsConfig, style }}
									text={text}
								/>
							</Option>
						)
					)}
			</AntDSelect>
		</div>
	)
}
