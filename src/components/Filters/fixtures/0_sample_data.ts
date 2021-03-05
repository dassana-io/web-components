import { FilterOptions } from '../types'

export const mockDynamicFilterOptions = [
	{
		id: '5391d028-d5fe-4c33-a4c9-8719191aaeb1',
		name: 'Ingestion Dev Account'
	},
	{
		id: '5391d028-d5fe-4c33-a4c9-8719191aaeb8',
		name: 'Ingestion Prod Account'
	}
]

export const mockFilterOptions: FilterOptions = [
	{
		filterKey: 'name',
		options: [
			'Dev account',
			'Prod account 1',
			'Prod account 2',
			'Test account'
		],
		staticFilter: false
	},
	{
		filterKey: 'service',
		options: [
			'EC2',
			'S3',
			'RDS',
			'Amazon Keyspaces (for Apache Cassandra)',
			'EKS'
		],
		staticFilter: true
	},
	{
		filterKey: 'model',
		options: ['instance', 'bucket', 'table'],
		staticFilter: true
	},
	{
		filterKey: 'region',
		options: ['us-west-1', 'us-east-2', 'ap-south-1'],
		staticFilter: true
	}
]
