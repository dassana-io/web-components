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
	timeInput?: number
}

const Template: Story<FormProps<UserModel>> = (args: FormProps<UserModel>) => (
	<Form
		{...args}
		initialValues={{
			cloudType: 'azure',
			defaultCheckedKeys: [5],
			domains: ['@lorem.com'],
			firstName: 'First Name',
			multileChoice: [0]
		}}
	>
		<Form.Input label='First Name' name='firstName' required />
		<Form.Input label='Last Name' name='lastName' />
		<Form.Select
			label='Cloud Type'
			name='cloudType'
			options={iconOptions}
		/>
		<Form.ChipInput
			addonBefore='@'
			label='Domains'
			name='domains'
			placeholder='yourdomain.com'
			required
			rules={{
				validate: (values: string[]) =>
					values.length > 1 || 'Please provide at least two domains'
			}}
			undeleteableValues={['@lorem.com']}
		/>
		<Form.RadioGroup
			defaultValue='low'
			label='Severity'
			name='severity'
			options={basicOptions}
		/>
		<Form.TimeInput label='Time' name='timeInput' />
		<Form.Toggle
			defaultChecked
			label='Production Environment'
			name='isProduction'
		/>
		<Form.Tree
			label='Cloud Accounts'
			name='defaultCheckedKeys'
			treeData={treeData}
		/>
		<Form.MultipleChoice
			items={[
				{ key: 0, label: 'CISCO' },
				{ key: 1, label: 'Sr Leadership' },
				{ key: 3, label: 'SecOps' },
				{ key: 4, label: 'Other' }
			]}
			label='Roles'
			name='multileChoice'
		/>
		<Form.SubmitButton>Submit</Form.SubmitButton>
	</Form>
)

export const Default = Template.bind({})

export const Loading = Template.bind({})
Loading.args = { loading: true }
