import React from 'react'
import { DragDrop, DragDropProps } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	// argTypes: {
	// 	classes: { control: 'array' },
	// 	onChange: { defaultValue: action('onChange') }
	// },
	component: DragDrop,
	title: 'DragDrop'
} as Meta

const Template: Story<DragDropProps> = args => <DragDrop {...args} />

export const Default = Template.bind({})
Default.args = {}
