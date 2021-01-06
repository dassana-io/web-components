import '../assets/styles/antdAnimations.css'
import 'antd/lib/select/style/index.css'
import { Select as AntDSelect } from 'antd'
import cn from 'classnames'
import omit from 'lodash/omit'
import { SelectSkeleton } from './SelectSkeleton'
import { Tooltip } from 'components'
import { generatePopupSelector, getDataTestAttributeProp } from '../utils'
import { OptionChildren, useStyles } from './utils'
import React, { FC, SyntheticEvent, useState } from 'react'
import { SelectProps, ShowToolTip } from './types'
const { Option } = AntDSelect

export const Select: FC<SelectProps> = (props: SelectProps) => {
	const {
		classes = [],
		dataTag,
		// defaulting defaultValue to empty string doesn't render a placeholder if a placeholder is provided
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

	const [showToolTipList, setShowToolTipList] = useState<ShowToolTip>({})

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
						label={text}
						onMouseEnter={(e: SyntheticEvent) => {
							const el = e.currentTarget.querySelector(
								'.option-text'
							)
							// @ts-ignore
							if (el.scrollWidth > el.offsetWidth) {
								setShowToolTipList({
									...showToolTipList,
									[value]: true
								})
							}
						}}
						onMouseLeave={() =>
							setShowToolTipList({
								...omit(showToolTipList, value)
							})
						}
						value={value}
					>
						{showToolTipList[value] ? (
							<Tooltip
								classes={[componentClasses.tooltip]}
								placement='bottomLeft'
								popupContainerSelector={popupContainerSelector}
								title={text}
							>
								<OptionChildren
									iconKey={iconKey}
									key={value}
									optionsConfig={optionsConfig}
									text={text}
								/>
							</Tooltip>
						) : (
							<OptionChildren
								iconKey={iconKey}
								key={value}
								optionsConfig={optionsConfig}
								text={text}
							/>
						)}
					</Option>
				))}
			</AntDSelect>
		</div>
	)
}

export * from './types'
