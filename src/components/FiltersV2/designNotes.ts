export {}

interface Filter {
	key: string
	operator: string
	value: string | boolean | number
}

type FilterCoordinators = 'and' | 'or'

interface FilterGroup {
	coordinator?: FilterCoordinators
	filters?: Filter[]
	groups?: FilterGroup[]
}

// No Filters
const filters: FilterGroup = {}

// Single Filter
const filtersSingle: FilterGroup = {
	groups: [
		{
			filters: [{ key: 'brand', operator: '=', value: 'allbirds' }]
		}
	]
}

// Single Filter + 1 Filter Group
const filterSingleAndGroup: FilterGroup = {
	coordinator: 'or',
	groups: [
		{
			coordinator: 'and',
			filters: [
				{ key: 'brand', operator: '=', value: 'allbirds' },
				{ key: 'color', operator: '=', value: 'black' }
			]
		},
		{
			filters: [{ key: 'brand', operator: '=', value: 'nike' }]
		}
	]
}

// 2 Filter Groups
const filterMultipleGroups: FilterGroup = {
	coordinator: 'or',
	groups: [
		{
			coordinator: 'and',
			filters: [
				{ key: 'brand', operator: '=', value: 'allbirds' },
				{ key: 'color', operator: '=', value: 'black' }
			]
		},
		{
			filters: [{ key: 'brand', operator: '=', value: 'nike' }]
		}
	]
}

// Nested Filter Groups
const nestedFilterGroups: FilterGroup = {
	coordinator: 'or',
	groups: [
		{
			coordinator: 'and',
			filters: [{ key: 'brand', operator: '=', value: 'allbirds' }],
			groups: [
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
