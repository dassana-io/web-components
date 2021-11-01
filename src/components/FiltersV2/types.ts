export enum FilterStage {
	key = 'key',
	operator = 'operator',
	value = 'value'
}

export enum OperatorTypes {
	// boolean = 'boolean',
	number = 'number',
	string = 'string'
}

export interface CommonFilterUnitConfig {
	key: string
	value: string
}

export interface KeyConfig extends CommonFilterUnitConfig {
	type: OperatorTypes
}

interface ValueConfig extends Omit<CommonFilterUnitConfig, 'key'> {
	key?: string
}

export interface FiltersMap {
	[FilterStage.key]: KeyConfig
	[FilterStage.operator]: CommonFilterUnitConfig
	[FilterStage.value]: ValueConfig
}

export interface FilterUnit {
	key: string
	operator: string
	value: string | boolean | number
}

export enum FilterCoordinators {
	and = 'and',
	or = 'or'
}

export interface FilterGroup {
	coordinator?: FilterCoordinators
	filters?: FilterUnit[]
	subgroups?: Omit<FilterGroup, 'subgroups'>[]
}

export interface Filters {
	coordinator?: FilterCoordinators
	filterGroups: FilterGroup[]
}

export interface FilterGroupConfig {
	coordinator: FilterCoordinators
	filterIds: string[]
	parentGroupId?: string
	subgroupIds?: string[]
}

export interface FilterConfig extends FiltersMap {
	groupId?: string
}

export type FilterGroupMap = Record<string, FilterGroupConfig>
export type FilterMap = Record<string, FilterConfig>
