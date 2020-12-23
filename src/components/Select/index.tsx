import '../assets/styles/antdAnimations.css'
import 'antd/lib/select/style/index.css'
import { Select as AntDSelect } from 'antd'
import { BaseFormElementProps } from '../types'
import cn from 'classnames'
import { SelectSkeleton } from '../SharedComponents'
import { useStyles } from './utils'
import { generatePopupSelector, getDataTestAttributeProp } from '../utils'
import { Icon, IconName, SharedIconProps } from '../Icon'
import React, { FC } from 'react'

const { Option } = AntDSelect

export interface Options {
	iconKey?: IconName
	text: string
	value: string
}

export interface OptionsConfig {
	iconMap?: Record<string, string>
}

export interface SelectProps extends BaseFormElementProps {
	/**
	 * Default value for select component. Without this, the select dropdown will be blank until an option is selected
	 */
	defaultValue?: string
	matchSelectedContentWidth?: boolean | number
	/**
	 * Selector of HTML element inside which to render the popup/dropdown
	 */
	popupContainerSelector?: string
	/**
	 * Array of options to be rendered in the dropdown
	 */
	options: Options[]
	/**
	 * Optional configuration that applies to the options. Ex: An icon map where each key in the map corresponds to the value of the option
	 * @default {}
	 */
	optionsConfig?: OptionsConfig
	/**
	 * Whether or not to show search input
	 * @default false
	 */
	showSearch?: boolean
	/**
	 * Input content value for controlled inputs. Requires an onChange to be passed
	 */
	value?: string
}

export const Select: FC<SelectProps> = (props: SelectProps) => {
	const {
		classes = [],
		dataTag,
		// defaulting defaultValue to empty string doesn't render a placeholder if one is provided
		defaultValue,
		disabled = false,
		error = false,
		loading = false,
		onChange,
		options,
		optionsConfig = {},
		popupContainerSelector,
		placeholder = '',
		showSearch = false,
		value
	} = props

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
			onChange,
			value
		}
	}

	if (value && !onChange) {
		throw new Error('Controlled inputs require an onChange prop')
	}

	let popupContainerProps = {}

	if (popupContainerSelector) {
		popupContainerProps = {
			getPopupContainer: generatePopupSelector(popupContainerSelector)
		}
	}

	const renderIcon = (
		iconKey: IconName,
		optionsConfig: OptionsConfig
	): JSX.Element => {
		const commonIconProps: SharedIconProps = {
			height: 15
		}

		const { iconMap } = optionsConfig

		return (
			<span className={componentClasses.icon}>
				{iconMap ? (
					<Icon {...commonIconProps} icon={iconMap[iconKey]} />
				) : (
					<Icon {...commonIconProps} iconKey={iconKey} />
				)}
			</span>
		)
	}

	return loading ? (
		<SelectSkeleton {...props} />
	) : (
		<div className={componentClasses.container}>
			<AntDSelect
				className={inputClasses}
				defaultValue={defaultValue}
				disabled={disabled}
				dropdownClassName={componentClasses.dropdown}
				placeholder={placeholder}
				showSearch={showSearch}
				{...controlledCmpProps}
				{...getDataTestAttributeProp('select', dataTag)}
				{...popupContainerProps}
			>
				{options.map(({ iconKey, text, value }) => (
					<Option
						className={componentClasses.option}
						key={value}
						value={value}
					>
						<div className={componentClasses.option}>
							{iconKey && renderIcon(iconKey, optionsConfig)}
							<span>{text}</span>
						</div>
					</Option>
				))}
			</AntDSelect>
		</div>
	)
}
