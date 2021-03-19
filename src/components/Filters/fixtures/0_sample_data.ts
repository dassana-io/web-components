import { FilterOptions, FilterValues } from 'api'

export const mockDynamicFilterOptions: FilterValues = [
	{
		id: '5391d028-d5fe-4c33-a4c9-8719191aaeb1',
		value: 'Ingestion Dev Account'
	},
	{
		id: '5391d028-d5fe-4c33-a4c9-8719191aaeb8',
		value: 'Ingestion Prod Account'
	}
]

export const mockFilterOptions: FilterOptions = [
	{
		key: 'name',
		staticFilter: false,
		values: [
			{ id: '1', value: 'Dev account' },
			{ id: '2', value: 'Prod account 1' },
			{ id: '3', value: 'Prod account 2' },
			{ id: '4', value: 'Test account' }
		]
	},
	{
		key: 'service',
		staticFilter: true,
		values: [
			{ id: '1', value: 'EC2' },
			{ id: '2', value: 'S3' },
			{ id: '3', value: 'RDS' },
			{ id: '4', value: 'Amazon Keyspaces (for Apache Cassandra)' },
			{ id: '5', value: 'EKS' }
		]
	},
	{
		key: 'model',
		staticFilter: true,
		values: [
			{ id: '1', value: 'instance' },
			{ id: '2', value: 'bucket' },
			{ id: '3', value: 'table' }
		]
	},
	{
		key: 'region',
		staticFilter: true,
		values: [
			{ id: '1', value: 'us-west-1' },
			{ id: '2', value: 'us-east-2' },
			{ id: '3', value: 'ap-south-1' }
		]
	}
]
