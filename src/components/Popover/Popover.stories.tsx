import { action } from '@storybook/addon-actions'
import Button from '../Button'
import Icon from '../Icon'
import { placementOptions } from '../utils'
import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import Popover, { PopoverProps } from './index'

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
	title: 'Popover'
} as Meta

const Template: Story<PopoverProps> = args => (
	<div style={{ padding: 75 }}>
		<Popover {...args}>
			<Icon iconKey='dassana' />
		</Popover>
	</div>
)

export const Default = Template.bind({})

export const Title = Template.bind({})
Title.args = {
	title: 'Account Info'
}
