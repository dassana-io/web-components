import { SelectOption } from '../SingleSelect'

export const basicOptions: SelectOption[] = [
	{ text: 'Lorem', value: 'lorem' },
	{ text: 'Ipsum', value: 'ipsum' }
]

export const iconOptions: SelectOption[] = [
	{ iconKey: 'aws', text: 'AWS', value: 'aws' },
	{ iconKey: 'azure', text: 'Azure', value: 'azure' },
	{ iconKey: 'googleCloudService', text: 'GCP', value: 'gcp' }
]

export const textOverflowOptions: SelectOption[] = [
	...basicOptions,
	{
		text: 'Adipiscing elit sed do eiusmod tempor incididunt',
		value: 'adipiscing'
	}
]
