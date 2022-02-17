import '../assets/styles/antdAnimations.css'
import 'antd/lib/select/style/index.css'
import { Select as AntDSelect } from 'antd'
import { Checkbox } from '../Checkbox'
import cn from 'classnames'
import { MultiSelectProps } from './MultiSelect/types'
import { NoContentFound } from './NoContentFound'
import noop from 'lodash/noop'
import { OptionChildren } from './OptionChildren'
import { SelectProps } from './SingleSelect/types'
import { SelectSkeleton } from './SingleSelect/SelectSkeleton'
import { Spin } from '../Spin'
import { getDataTestAttributeProp, getPopupContainerProps } from '../utils'
import React, { FC, ReactNode } from 'react'

const { Option } = AntDSelect

interface CommonBaseSelectProps
	extends Omit<SelectProps, 'defaultValue' | 'onChange' | 'value'> {
	useStyles: (data?: unknown) => Record<string, string>
}

interface BaseMultiSelectProps
	extends Pick<
		MultiSelectProps,
		'onChange' | 'maxTagCount' | 'maxTagTextLength' | 'pending'
	> {
	defaultValue?: MultiSelectProps['defaultValues']
	dropdownRender: (menu: ReactNode) => ReactNode
	localValues: string[]
	mode: 'multiple'
	value?: MultiSelectProps['values']
}

interface BaseSingleSelectProps
	extends Pick<SelectProps, 'defaultValue' | 'onChange' | 'value'> {
	mode: 'single'
}

type BaseSelectProps = CommonBaseSelectProps &
	(BaseSingleSelectProps | BaseMultiSelectProps)

export const BaseSelect: FC<BaseSelectProps> = (props: BaseSelectProps) => {
	const {
		classes = [],
		containerClasses = [],
		dataTag,
		defaultOpen = false,
		disabled = false,
		error = false,
		focused = false,
		loading = false,
		onBlur,
		onFocus,
		options = [],
		optionsConfig = {},
		placeholder = '',
		popupContainerSelector,
		showSearch = false,
		size,
		useStyles
	} = props

	const componentClasses = useStyles(props)

	const inputClasses: string = cn(
		{
			[componentClasses.error]: error
		},
		classes
	)

	let multiSelectProps = {}
	let singleSelectProps = {}

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
	} else {
		const { defaultValue, onChange, showSearch, value } = props

		singleSelectProps = {
			defaultValue,
			onBlur,
			onChange,
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
				dropdownClassName={componentClasses.dropdown}
				notFoundContent={<NoContentFound />}
				onFocus={onFocus}
				placeholder={placeholder}
				showArrow
				showSearch={showSearch}
				size={size}
				{...getPopupContainerProps(popupContainerSelector)}
				{...multiSelectProps}
				{...singleSelectProps}
			>
				{/* if state is pending, options are being fetched outside the component, so don't render options. With no options, `notFoundContent` prop will render a spinning loader */}
				{!('pending' in props && props.pending) &&
					options.map(
						({
							classes: optClasses = [],
							disabled = false,
							hidden = false,
							iconKey,
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
										checked={
											props.localValues.indexOf(value) >=
											0
										}
										classes={[componentClasses.checkbox]}
										onChange={noop}
									/>
								)}
								<OptionChildren
									iconKey={iconKey}
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
