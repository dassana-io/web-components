import { action } from '@storybook/addon-actions'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { placementOptions } from '../utils'
import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Popover, PopoverProps } from './index'

export default {
	argTypes: {
		children: { control: { disable: true } },
		content: {
			control: { disable: true },
			defaultValue: (
				<Button onClick={() => action('onClick')}>Click Me</Button>
			)
		},
		placement: {
			control: {
				options: placementOptions,
				type: 'select'
			}
		},
		title: { control: { type: 'text' } }
	},
	component: Popover,
	decorators: [
		(PopoverStory: Story) => (
			<div style={{ padding: 75 }}>
				<PopoverStory />
			</div>
		)
	],
	title: 'Popover'
} as Meta

const Template: Story<PopoverProps> = args => (
	<Popover {...args}>
		<Icon iconKey='dassana' />
	</Popover>
)

export const Default = Template.bind({})

export const Title = Template.bind({})
Title.args = {
	title: 'Account Info'
}
