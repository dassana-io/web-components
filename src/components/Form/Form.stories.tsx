import { action } from '@storybook/addon-actions'
import Form from './index'
import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	argTypes: {
		initialValues: {
			control: 'object',
			defaultValue: { firstName: 'First Name' }
		}
	},
	component: Form,
	title: 'Form'
} as Meta

const Template: Story = args => (
	<Form onSubmit={action('onSubmit')} {...args}>
		<Form.Input label='First Name' name='firstName' required />
		<Form.Input label='Last Name' name='lastName' />
		<Form.Button />
	</Form>
)

export const Default = Template.bind({})
