import { Breakpoints } from '@dassana-io/web-utils'
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
		'id' | 'windowWidth' | 'onFilterChange' | 'selectedValues'
	> {
	multiSelectProps: Omit<MultiSelectProps, 'disabled' | 'onChange' | 'values'>
}

export const getMultiSelectProps = ({
	multiSelectProps,
	id,
	windowWidth = 0,
	onFilterChange,
	selectedValues = []
}: Params): MultiSelectProps => {
	const { options = [], ...rest } = multiSelectProps

	const optionalResponsiveProps: Pick<MultiSelectProps, 'maxTagCount'> = {}

	if (windowWidth <= Breakpoints.tablet) {
		optionalResponsiveProps.maxTagCount = 4
	} else if (windowWidth <= Breakpoints.mobile) {
		optionalResponsiveProps.maxTagCount = 1
	}

	return {
		...defaultCommonProps,
		...rest,
		...optionalResponsiveProps,
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
