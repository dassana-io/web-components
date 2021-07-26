import { IconCellLabelType } from 'components/Table'
import { FilterOptions, FiltersConfig, FilterValues } from '../types'

export const mockDynamicFilterOptions: FilterValues = [
	{
		id: 'name4',
		value: 'Ingestion Dev Account'
	},
	{
		id: 'name5',
		value: 'Ingestion Prod Account'
	}
]

export const mockFilterOptions: FilterOptions = [
	{
		key: { id: 'key0', value: 'name' },
		staticFilter: false,
		values: [
			{ id: 'name0', value: 'Dev account' },
			{ id: 'name1', value: 'Prod account 1' },
			{ id: 'name2', value: 'Prod account 2' },
			{ id: 'name3', value: 'Test account' }
		]
	},
	{
		key: { id: 'key1', value: 'service' },
		staticFilter: true,
		values: [
			{ id: 'service0', value: 'EC2' },
			{ id: 'service1', value: 'S3' },
			{ id: 'service2', value: 'RDS' },
			{
				id: 'service3',
				value: 'Amazon Keyspaces (for Apache Cassandra)'
			},
			{ id: 'service4', value: 'EKS' }
		]
	},
	{
		key: { id: 'key2', value: 'model' },
		staticFilter: true,
		values: [
			{ id: 'model0', value: 'instance' },
			{ id: 'model1', value: 'bucket' },
			{ id: 'model2', value: 'table' }
		]
	},
	{
		key: { id: 'key3', value: 'region' },
		operator: ['!=', '='],
		staticFilter: true,
		values: [
			{ id: 'region0', value: 'us-west-1' },
			{ id: 'region1', value: 'us-east-2' },
			{ id: 'region2', value: 'ap-south-1' }
		]
	},
	{
		key: { id: 'key4', value: 'vendors' },
		staticFilter: true,
		values: [
			{ id: 'aws', value: 'Aws' },
			{ id: 'azure', value: 'Azure' },
			{ id: 'dassana', value: 'Dassana' }
		]
	}
]

export const filtersConfig: FiltersConfig = {
	key4: {
		iconMap: {
			aws: 'https://dummyimage.com/400x400/ff9900/fff&text=A',
			azure: 'https://dummyimage.com/400x400/0072c6/fff&text=A'
		},
		type: IconCellLabelType.tooltip
	}
}
