import React from 'react'
import Form, { FormProps } from './index'
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

interface UserModel {
	firstName: string
	lastName?: string
}

const Template: Story<FormProps<UserModel>> = (args: FormProps<UserModel>) => (
	<Form {...args}>
		<Form.Input label='First Name' name='firstName' required />
		<Form.Input label='Last Name' name='lastName' />
		<Form.Button />
	</Form>
)

export const Default = Template.bind({})
