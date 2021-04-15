import { MultiSelectProps } from '../../../Select'
import { ValuesMultiSelectProps } from './types'

type DefaultCommonProps = Pick<
	MultiSelectProps,
	| 'matchSelectedContentWidth'
	| 'maxTagCount'
	| 'placeholder'
	| 'searchPlaceholder'
	| 'showSearch'
>

const defaultCommonProps: DefaultCommonProps = {
	matchSelectedContentWidth: 225,
	maxTagCount: 5,
	placeholder: 'Select field',
	searchPlaceholder: 'Search',
	showSearch: true
}

interface Params
	extends Pick<
		ValuesMultiSelectProps,
		'id' | 'onFilterChange' | 'selectedValues'
	> {
	multiSelectProps: Omit<MultiSelectProps, 'disabled' | 'onChange' | 'values'>
}

export const getMultiSelectProps = ({
	multiSelectProps,
	id,
	onFilterChange,
	selectedValues = []
}: Params): MultiSelectProps => {
	const { options, ...rest } = multiSelectProps

	return {
		...defaultCommonProps,
		...rest,
		disabled: !options.length,
		onChange: vals =>
			onFilterChange({
				id,
				selectedValues: options.filter(opt => vals.includes(opt.value))
			}),
		options,
		values: selectedValues.map(values => values.value)
	}
}
