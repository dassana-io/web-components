import { type Meta, type StoryFn } from '@storybook/react'
import { Radio, type RadioChangeEvent, type RadioProps } from './index'
import React, { useState } from 'react'

export default {
	argTypes: {
		onClick: { action: 'clicked' }
	},
	component: Radio,
	title: 'Radio Group'
} as Meta

const Template: StoryFn<RadioProps> = args => {
	const [value, setValue] = useState('hello')

	const handleOnChange = (e: RadioChangeEvent) => setValue(e.target.value)

	return (
		<Radio.Group onChange={handleOnChange} value={value}>
			<Radio value='hello'>Hello</Radio>
			<Radio value='world'>World</Radio>
		</Radio.Group>
	)
}

export const Default = Template.bind({})
