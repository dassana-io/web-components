const items = [
	'CISCO',
	'Sr Leadership',
	'SecOps',
	'Cloud Architect',
	'DevOps',
	'NetSec',
	'AppDev',
	'Compliance',
	'Other'
]

export const multipleChoiceItems = items.map(item => ({
	label: item,
	value: item.toLowerCase().split(' ').join('-')
}))
