import { type KVField } from './types'
import { DynamicKVInput, type DynamicKVInputProps } from './index'
import { type Meta, type StoryFn } from '@storybook/react'
import React, { useState } from 'react'

export default {
	argTypes: {
		checked: { control: { disable: true } },
		label: { control: 'text' }
	},
	component: DynamicKVInput,
	title: 'DynamicKVInputProps'
} as Meta

const Template: StoryFn<DynamicKVInputProps> = args => {
	const [values, setValues] = useState<KVField[]>([])

	return <DynamicKVInput {...args} onChange={setValues} values={values} />
}

export const Default = Template.bind({})
