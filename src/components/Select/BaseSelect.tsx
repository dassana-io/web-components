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
		dataTag,
		defaultOpen = false,
		disabled = false,
		error = false,
		loading = false,
		onBlur,
		options,
		optionsConfig = {},
		placeholder = '',
		popupContainerSelector,
		showSearch = false,
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
		<div className={componentClasses.container}>
			<AntDSelect
				className={inputClasses}
				defaultOpen={defaultOpen}
				disabled={disabled}
				dropdownClassName={componentClasses.dropdown}
				notFoundContent={<NoContentFound />}
				placeholder={placeholder}
				showArrow
				showSearch={showSearch}
				{...getPopupContainerProps(popupContainerSelector)}
				{...multiSelectProps}
				{...singleSelectProps}
			>
				{options.map(({ iconKey, text, value }) => (
					<Option
						className={componentClasses.option}
						key={value}
						label={text}
						value={value}
					>
						{props.mode === 'multiple' && (
							<Checkbox
								checked={props.localValues.indexOf(value) >= 0}
								classes={[componentClasses.checkbox]}
								onChange={noop}
							/>
						)}
						<OptionChildren
							iconKey={iconKey}
							key={value}
							optionsConfig={optionsConfig}
							text={text}
						/>
					</Option>
				))}
			</AntDSelect>
		</div>
	)
}
