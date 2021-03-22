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
			{ id: 'name1', value: 'Dev account' },
			{ id: 'name2', value: 'Prod account 1' },
			{ id: 'name3', value: 'Prod account 2' },
			{ id: 'name4', value: 'Test account' }
		]
	},
	{
		key: 'service',
		staticFilter: true,
		values: [
			{ id: 'service1', value: 'EC2' },
			{ id: 'service2', value: 'S3' },
			{ id: 'service3', value: 'RDS' },
			{
				id: 'service4',
				value: 'Amazon Keyspaces (for Apache Cassandra)'
			},
			{ id: 'service5', value: 'EKS' }
		]
	},
	{
		key: 'model',
		staticFilter: true,
		values: [
			{ id: 'model1', value: 'instance' },
			{ id: 'model2', value: 'bucket' },
			{ id: 'model3', value: 'table' }
		]
	},
	{
		key: 'region',
		operator: ['!=', '='],
		staticFilter: true,
		values: [
			{ id: 'region1', value: 'us-west-1' },
			{ id: 'region2', value: 'us-east-2' },
			{ id: 'region3', value: 'ap-south-1' }
		]
	}
]
