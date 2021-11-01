export enum OperatorTypes {
	// boolean = 'boolean',
	number = 'number',
	string = 'string'
}

export enum Keys {
	activity = 'activity',
	brand = 'brand',
	color = 'color'
}

export interface KeyConfig extends CommonFilterUnitConfig {
	type: OperatorTypes
}

export const sampleKeys: KeyConfig[] = [
	{
		key: Keys.activity,
		type: OperatorTypes.string,
		value: 'Activity'
	},
	{
		key: Keys.brand,
		type: OperatorTypes.string,
		value: 'Brand'
	},
	{
		key: Keys.color,
		type: OperatorTypes.string,
		value: 'Color'
	}
]

export interface CommonFilterUnitConfig {
	key: string
	value: string
}

export const sampleOperatorMap: Record<
	OperatorTypes,
	CommonFilterUnitConfig[]
> = {
	// [OperatorTypes.boolean]: [
	// 	{
	// 		key: '=',
	// 		value: 'is'
	// 	}
	// ],
	[OperatorTypes.number]: [
		{
			key: '=',
			value: 'is'
		},
		{
			key: '!=',
			value: 'is not'
		},
		{
			key: '>',
			value: 'greater than'
		},
		{
			key: '<',
			value: 'less than'
		}
	],
	[OperatorTypes.string]: [
		{
			key: '=',
			value: 'is'
		},
		{
			key: '!=',
			value: 'is not'
		},
		{
			key: '~=',
			value: 'contains'
		}
	]
}

export const sampleValuesMap: Record<Keys, CommonFilterUnitConfig[]> = {
	[Keys.activity]: [
		{
			key: 'basketball',
			value: 'Basketball'
		},
		{
			key: 'running',
			value: 'Running'
		},
		{
			key: 'training',
			value: 'Training'
		}
	],
	[Keys.brand]: [
		{
			key: 'adidas',
			value: 'Adidas'
		},
		{
			key: 'allbirds',
			value: 'Allbirds'
		},
		{
			key: 'nike',
			value: 'Nike'
		},
		{
			key: 'salomon',
			value: 'Salomon'
		}
	],
	[Keys.color]: [
		{
			key: 'black',
			value: 'Black'
		},
		{
			key: 'blue',
			value: 'Blue'
		},
		{
			key: 'orange',
			value: 'Orange'
		},
		{
			key: 'red',
			value: 'Red'
		}
	]
}
