export {}

// Filter API with flat structure

interface Filter {
	key: string
	operator: string
	value: string | boolean | number
}

type FilterCoordinators = 'and' | 'or'

interface FilterGroup {
	coordinator?: FilterCoordinators
	filters?: Filter[]
	subgroups?: Omit<FilterGroup, 'subgroups'>[]
}

interface Filters {
	coordinator?: FilterCoordinators
	filterGroups: FilterGroup[]
}

// No Filters

// Single Filter
const singleFilter: Filters = {
	filterGroups: [
		{
			filters: [{ key: 'brand', operator: '=', value: 'allbirds' }]
		}
	]
}

// Single Filter Group
const singleFilterPlusGroup: Filters = {
	coordinator: 'or',
	filterGroups: [
		{
			filters: [{ key: 'brand', operator: '=', value: 'nobull' }]
		},
		{
			coordinator: 'and',
			filters: [
				{ key: 'brand', operator: '=', value: 'allbirds' },
				{ key: 'color', operator: '=', value: 'black' }
			]
		}
	]
}

// Single Filter Group
const singleFilterGroup: Filters = {
	filterGroups: [
		{
			coordinator: 'and',
			filters: [
				{ key: 'brand', operator: '=', value: 'allbirds' },
				{ key: 'color', operator: '=', value: 'black' }
			]
		}
	]
}

// 2 Filter Groups
const twoFilterGroups: Filters = {
	coordinator: 'or',
	filterGroups: [
		{
			coordinator: 'and',
			filters: [
				{ key: 'brand', operator: '=', value: 'allbirds' },
				{ key: 'color', operator: '=', value: 'black' }
			]
		},
		{
			coordinator: 'and',
			filters: [
				{ key: 'brand', operator: '=', value: 'nike' },
				{ key: 'color', operator: '=', value: 'grey' }
			]
		}
	]
}

// Filter Groups w/ subgroup
const filterWithSubgroup: Filters = {
	coordinator: 'or',
	filterGroups: [
		{
			coordinator: 'and',
			filters: [{ key: 'brand', operator: '=', value: 'allbirds' }],
			subgroups: [
				{
					coordinator: 'or',
					filters: [
						{ key: 'color', operator: '=', value: 'black' },
						{ key: 'color', operator: '=', value: 'grey' }
					]
				}
			]
		},
		{
			coordinator: 'and',
			filters: [
				{ key: 'brand', operator: '=', value: 'nike' },
				{ key: 'color', operator: '=', value: 'grey' }
			]
		}
	]
}
