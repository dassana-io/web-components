import { type SelectOption } from '../SingleSelect'

export const basicOptions: SelectOption[] = [
	{ text: 'Lorem', value: 'lorem' },
	{ text: 'Ipsum', value: 'ipsum' }
]

export const iconOptions: SelectOption[] = [
	{ iconKey: 'aws', text: 'AWS', value: 'aws' },
	{ iconKey: 'azure', text: 'Azure', value: 'azure' },
	{ iconKey: 'googleCloudService', text: 'GCP', value: 'gcp' }
]

export const iconWithUrlOptions: SelectOption[] = [
	{ iconUrl: 'https://picsum.photos/20', text: 'Random1', value: 'random1' },
	{ iconUrl: 'https://picsum.photos/20', text: 'Random2', value: 'random2' },
	{ iconUrl: 'https://picsum.photos/20', text: 'Random3', value: 'random3' }
]

export const textOverflowOptions: SelectOption[] = [
	...basicOptions,
	{
		text: 'Adipiscing elit sed do eiusmod tempor incididunt',
		value: 'adipiscing'
	}
]
