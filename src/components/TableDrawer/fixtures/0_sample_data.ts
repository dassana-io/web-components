/* eslint-disable sort-keys */
import { TableDrawerProps } from '..'
import { ColumnFormats, ColumnType, ColumnTypes } from 'components/Table/types'

const { string, component } = ColumnTypes
const { icon } = ColumnFormats

export interface Policy {
	id: number
	cloud: string
	service: string
	resourceType: string
	category: string
	subcategory: string
	name: string
	description?: string
	vendors: { [name: string]: string[] | string }
	context: Record<string, any> | null // use Record since context contains multiple data types - WIP
}

const columns: ColumnType[] = [
	{
		dataIndex: 'name',
		title: 'Name',
		type: string
	},
	{
		dataIndex: 'cloud',
		format: icon,
		renderProps: {
			type: 'iconKey'
		},
		title: 'Cloud',
		type: component
	},
	{
		dataIndex: 'resourceType',
		title: 'Resource Type',
		type: string
	},
	{
		dataIndex: 'category',
		title: 'Category',
		type: string
	}
]

const data: Policy[] = [
	{
		id: 0,
		cloud: 'aws',
		service: 'EC2',
		resourceType: 'FlowLog',
		category: 'visibility',
		subcategory: 'logging',
		name: 'vpc-flow-logs-are-disabled',
		description: 'VPC flow logs are disabled',
		vendors: {
			'aws-config': ['VPC_FLOW_LOGS_ENABLED'],
			bridgecrew: ['BC_AWS_LOGGING_9'],
			'panw-prismacloud': ['49f4760d-c951-40e4-bfe1-08acaa17672a']
		},
		context: null
	},
	{
		id: 1,
		cloud: 'aws',
		service: 'EC2',
		resourceType: 'instance',
		category: 'network',
		subcategory: 'firewall',
		name: 'instance-is-exposed-to-internet',
		description: 'EC2 instance is exposed to the internet',
		vendors: {
			'aws-config': 'EC2_INSTANCE_NO_PUBLIC_IP',
			bridgecrew: ['BC_AWS_NETWORKING_6', 'BC_AWS_NETWORKING_35'],
			'panw-prismacloud': [
				'0e44dabe-a8b9-401b-936b-bb8a0a80279a',
				'ba9eeea6-782c-45aa-a953-f639582412c7'
			]
		},
		context: [
			'is-the-instance-behind-a-loadbalancer',
			'does-the-security-group-allow-incoming-connections-from-the-internet',
			'does-the-nacl-allow-traffic-from-internet'
		]
	},
	{
		id: 2,
		cloud: 'aws',
		service: 'EC2',
		resourceType: 'security-group',
		category: 'networking',
		subcategory: 'firewall',
		name: 'default-security-group-should-not-allow-traffic',
		description:
			'VPC default security group allows inbound and outbound traffic',
		vendors: {
			'panw-prismacloud': ['2378dbf4-b104-4bda-9b05-7417affbba3f'],
			'aws-config': ['VPC_DEFAULT_SECURITY_GROUP_CLOSED'],
			bridgecrew: ['BC_AWS_NETWORKING_4']
		},
		context: null
	},
	{
		id: 3,
		cloud: 'aws',
		service: 'EC2',
		resourceType: 'security-group',
		category: 'network',
		subcategory: 'firewall',
		name: 'ssh-from-internet',
		description:
			'security group is allowing incoming SSH traffic from internet',
		vendors: {
			'panw-prismacloud': ['617b9138-584b-4e8e-ad15-7fbabafbed1a'],
			'aws-config': ['restricted-ssh']
		},
		context: [
			{
				'eni-attachment': null,
				'sg-id': '$.dassana.resourceId',
				region: '$.dassana.region',
				'has-public-ip': true,
				'attached-instance-is-running': true,
				limit: 5
			}
		]
	},
	{
		id: 4,
		cloud: 'aws',
		service: 'EC2',
		resourceType: 'volume',
		category: 'cryptography',
		subcategory: 'encryption',
		name: 'ebs-volume-is-not-encrypted',
		description: 'EBS volumes are not encrypted',
		vendors: {
			'aws-config': [
				'EC2_EBS_ENCRYPTION_BY_DEFAULT',
				'ENCRYPTED_VOLUMES'
			],
			bridgecrew: ['BC_AWS_GENERAL_3'],
			'panw-prismacloud': ['376874b1-c94e-4bf5-a5be-064d5fadee45']
		},
		context: null
	},
	{
		id: 5,
		cloud: 'aws',
		service: 'S3',
		resourceType: 'Bucket',
		category: 'access_sharing',
		subcategory: 'limited_access',
		name: 'bucket-has-broad-access-permissions',
		description: 'S3 bucket is configured to allow overly broad access',
		vendors: {
			'aws-config': [
				'S3_BUCKET_BLACKLISTED_ACTIONS_PROHIBITED',
				'S3_BUCKET_PUBLIC_READ_PROHIBITED',
				'S3_BUCKET_PUBLIC_WRITE_PROHIBITED'
			],
			bridgecrew: [
				'BC_AWS_S3_1',
				'BC_AWS_S3_2',
				'BC_AWS_S3_3',
				'BC_AWS_S3_4',
				'BC_AWS_S3_5',
				'BC_AWS_S3_6',
				'BC_AWS_S3_7',
				'BC_AWS_S3_8',
				'BC_AWS_S3_9',
				'BC_AWS_S3_10',
				'BC_AWS_S3_11'
			],
			'panw-prismacloud': [
				'085de1e7-7eb5-4fde-9a14-56f563c54ed3',
				'98340798-8e9f-4b4e-8c34-b001307fda3a',
				'f0235acc-737d-4a54-8d2c-a05da32663bd'
			]
		},
		context: null
	},
	{
		id: 6,
		cloud: 'aws',
		service: 'S3',
		resourceType: 'Bucket',
		category: 'cryptography',
		subcategory: 'encryption',
		name: 'bucket-is-not-encrypted',
		description: 'S3 bucket is not encrypted',
		vendors: {
			'aws-config': [
				'S3_DEFAULT_ENCRYPTION_KMS',
				'S3_BUCKET_SERVER_SIDE_ENCRYPTION_ENABLED'
			],
			bridgecrew: ['BC_AWS_S3_14'],
			'panw-prismacloud': ['7913fcbf-b679-5aac-d979-1b6817becb22']
		},
		context: null
	},
	{
		id: 7,
		cloud: 'aws',
		service: 'S3',
		resourceType: 'Bucket',
		category: 'iam',
		subcategory: 'authentication',
		name: 'bucket-is-public',
		description: 'S3 bucket is public',
		vendors: {
			'aws-config': [
				'S3_ACCOUNT_LEVEL_PUBLIC_ACCESS_BLOCKS',
				'S3_BUCKET_LEVEL_PUBLIC_ACCESS_PROHIBITED'
			],
			bridgecrew: [
				'BC_AWS_S3_19',
				'BC_AWS_S3_20',
				'BC_AWS_S3_21',
				'BC_AWS_S3_22'
			],
			'panw-prismacloud': [
				'34064d53-1fd1-42e6-b075-45dce495caca',
				'630d3779-d932-4fbf-9cce-6e8d793c6916'
			]
		},
		context: null
	},
	{
		id: 8,
		cloud: 'aws',
		service: 'S3',
		resourceType: 'Bucket',
		category: 'networking',
		subcategory: 'firewall',
		name: 'bucket-requests-do-not-use-ssl',
		description: 'S3 bucket requests do not use SSL',
		vendors: {
			'aws-config': ['S3_BUCKET_SSL_REQUESTS_ONLY'],
			bridgecrew: ['BC_AWS_S3_15'],
			'panw-prismacloud': ['7b0df373-006a-40d6-9f3d-68e6ea0bdd5d']
		},
		context: null
	},
	{
		id: 9,
		cloud: 'aws',
		service: 'S3',
		resourceType: 'Bucket',
		category: 'authentication',
		subcategory: 'weak-auth',
		name: 's3bucket-open-to-the-internet',
		description: 'the s3 bucket is open to the internet',
		vendors: {
			'aws-config': [
				's3-bucket-public-read-prohibited',
				's3-bucket-public-write-prohibited'
			],
			panw: ['P-3414']
		},
		context: [
			{
				'associated-website': null
			}
		]
	}
]

const tableData0: TableDrawerProps<Policy> = {
	columns,
	data,
	loading: false,
	paginationConfig: { rowCount: 5 },
	renderDrawerCmp: () => 'Drawer render test'
}

export default tableData0
