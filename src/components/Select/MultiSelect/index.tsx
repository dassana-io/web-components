import '../../assets/styles/antdAnimations.css'
import 'antd/lib/select/style/index.css'
import { Select as AntDSelect } from 'antd'
import { Checkbox } from '../../Checkbox'
import cn from 'classnames'
import Fuse from 'fuse.js'
import { getDataTestAttributeProp } from '../../utils'
import { getPopupContainerProps } from '../utils'
import { Input } from '../../Input'
import { MultiSelectProps } from './types'
import { NoContentFound } from '../NoContentFound'
import { OptionChildren } from '../OptionChildren'
import { SelectSkeleton } from '../SingleSelect/SelectSkeleton'
import { Spin } from '../../Spin'
import { getSortedAndFilteredValues, useStyles } from './utils'
import React, {
	ChangeEvent,
	FC,
	KeyboardEvent,
	ReactNode,
	useState
} from 'react'

const { Option } = AntDSelect

export const MultiSelect: FC<MultiSelectProps> = (props: MultiSelectProps) => {
	const {
		classes = [],
		dataTag,
		defaultValues = [],
		disabled = false,
		error = false,
		loading = false,
		maxTagCount = 2,
		maxTagTextLength = 12,
		onChange,
		onSearch,
		optionKeysToFilter = ['text'],
		options,
		optionsConfig = {},
		placeholder = '',
		pending = false,
		popupContainerSelector,
		searchPlaceholder = '',
		showSearch = false,
		values
	} = props
	const [localValues, setLocalValues] = useState(values || defaultValues)

	const [searchTerm, setSearchTerm] = useState('')

	const componentClasses = useStyles(props)

	const inputClasses: string = cn(
		{
			[componentClasses.error]: error
		},
		classes
	)

	const dropDownRender = (menu: ReactNode) => (
		<>
			{showSearch && (
				<Input
					classes={[componentClasses.searchBar]}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						if (onSearch) onSearch(e.target.value)
						setSearchTerm(e.target.value)
					}}
					onKeyDown={(e: KeyboardEvent) => {
						const keysToNotPropagate: KeyboardEvent['key'][] = [
							'Enter',
							'Backspace'
						]
						if (keysToNotPropagate.includes(e.key))
							e.stopPropagation()
					}}
					placeholder={searchPlaceholder}
				/>
			)}
			{menu}
		</>
	)

	const fuse = new Fuse(options, {
		isCaseSensitive: false,
		keys: optionKeysToFilter,
		shouldSort: true,
		threshold: 0.1
	})

	const onChangeAntD = (values?: string[]) => {
		const vals = values ? values : []

		if (onChange) onChange(vals)

		setLocalValues(vals)
	}

	let optionalProps = {}

	if (values) optionalProps = { value: values }

	if (values && !onChange) {
		throw new Error('Controlled MultiSelect requires an onChange prop')
	}

	const sortedAndFilteredValues = getSortedAndFilteredValues({
		fuse,
		localValues,
		onSearch,
		options,
		searchTerm
	})

	return loading ? (
		<SelectSkeleton {...props} />
	) : (
		<div className={componentClasses.container}>
			<AntDSelect
				className={inputClasses}
				defaultValue={defaultValues}
				disabled={disabled}
				dropdownClassName={componentClasses.dropdown}
				dropdownRender={dropDownRender}
				maxTagCount={maxTagCount}
				maxTagPlaceholder={selectedOpts =>
					`& ${selectedOpts.length} more`
				}
				maxTagTextLength={maxTagTextLength}
				menuItemSelectedIcon={null}
				mode={'multiple'}
				notFoundContent={
					pending ? (
						<NoContentFound>
							<Spin size={20} />
						</NoContentFound>
					) : (
						<NoContentFound />
					)
				}
				onChange={onChangeAntD}
				optionLabelProp='label'
				placeholder={placeholder}
				showArrow
				showSearch={false}
				{...getDataTestAttributeProp('multi-select', dataTag)}
				{...getPopupContainerProps(popupContainerSelector)}
				{...optionalProps}
			>
				{sortedAndFilteredValues.map(({ iconKey, text, value }) => (
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

export * from './types'
