import { basicOptions } from '../RadioGroup/fixtures/sample_options'
import { iconOptions } from '../Select/fixtures/sample_options'
import React from 'react'
import treeData from '../Tree/fixtures/0_sample_data'
import { Form, FormProps } from './index'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	argTypes: {
		initialValues: { control: { disable: true } },
		onSubmit: { control: { disable: true } }
	},
	component: Form,
	parameters: {
		// disabled because shallow rendering gives warning, but FormTree only works with shallow render
		storyshots: { disable: true }
	},
	title: 'Form'
} as Meta

interface UserModel {
	firstName: string
	lastName?: string
}

const Template: Story<FormProps<UserModel>> = (args: FormProps<UserModel>) => (
	<Form
		{...args}
		initialValues={{
			cloudType: 'azure',
			defaultCheckedKeys: [5],
			firstName: 'First Name'
		}}
	>
		<Form.Input label='First Name' name='firstName' required />
		<Form.Input label='Last Name' name='lastName' />
		<Form.Select
			label='Cloud Type'
			name='cloudType'
			options={iconOptions}
		/>
		<Form.RadioGroup
			defaultValue='low'
			label='Severity'
			name='severity'
			options={basicOptions}
		/>
		<Form.Tree
			label='Cloud Accounts'
			name='defaultCheckedKeys'
			treeData={treeData}
		/>
		<Form.SubmitButton>Submit</Form.SubmitButton>
	</Form>
)

export const Default = Template.bind({})
