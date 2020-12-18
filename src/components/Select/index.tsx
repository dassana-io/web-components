import '../assets/styles/antdAnimations.css'
import 'antd/lib/select/style/index.css'
import { Select as AntDSelect } from 'antd'
import { BaseFormElementProps } from '../types'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { getDataTestAttributeProp } from '../utils'
import { SelectSkeleton } from '../SharedComponents'
import {
	defaultFieldWidth,
	fieldErrorStyles,
	styleguide
} from '../assets/styles/styleguide'
import { Icon, IconName, SharedIconProps } from '../Icon'
import React, { FC } from 'react'
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
		defaultValue = '',
		disabled = false,
		error = false,
		loading = false,
		onChange,
		options,
		optionsConfig = {},
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
				placeholder={placeholder}
				showSearch={showSearch}
				{...controlledCmpProps}
				{...getDataTestAttributeProp('select', dataTag)}
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
