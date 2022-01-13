import { action } from '@storybook/addon-actions'
import { basicOptions } from '../RadioButtonGroup/fixtures/sample_options'
import { iconOptions } from '../Select/fixtures/sample_options'
import React from 'react'
import treeData from '../Tree/fixtures/0_sample_data'
import { Form, FormProps } from './index'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	argTypes: {
		initialValues: { control: { disable: true } },
		onSubmit: { defaultValue: action('onSubmit') }
	},
	component: Form,
	parameters: {
		// disabled because shallow rendering gives warning, but FormTree only works with shallow render
		storyshots: { disable: true }
	},
	title: 'Form'
} as Meta

interface UserModel {
	cloudAccounts?: number[]
	cloudType?: string
	domains?: string[]
	firstName: string
	isProduction?: boolean
	lastName?: string
	persona?: string[]
	severity?: string
	timezone?: string
	workStart?: number
}

const Template: Story<FormProps<UserModel>> = (args: FormProps<UserModel>) => (
	<Form<UserModel>
		{...args}
		initialValues={{
			cloudAccounts: [5],
			cloudType: 'azure',
			domains: ['@lorem.com'],
			firstName: 'First Name',
			isProduction: false,
			lastName: '',
			persona: ['other'],
			severity: 'low',
			timezone: 'Asia/Kathmandu',
			workStart: 9
		}}
	>
		<Form.Input label='First Name' name='firstName' required />
		<Form.Input label='Last Name' name='lastName' />
		<Form.Select
			label='Cloud Type'
			name='cloudType'
			options={iconOptions}
		/>
		<Form.MultiSelect
			label='Persona'
			name='persona'
			options={[
				{ text: 'CISO', value: 'ciso' },
				{ text: 'SecOps', value: 'sec-ops' },
				{ text: 'DevOps', value: 'dev-ops' },
				{ text: 'Compliance', value: 'compliance' },
				{ text: 'other', value: 'other' }
			]}
			required
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
		<Form.TimeInput
			format='hours'
			label='Start time'
			name='workStart'
			required
		/>
		<Form.Timezone label='Timezone' name='timezone' />
		<Form.RadioButtonGroup
			defaultValue='low'
			label='Severity'
			name='severity'
			options={basicOptions}
		/>
		<Form.Toggle
			defaultChecked
			label='Production Environment'
			name='isProduction'
		/>
		<Form.Checkbox defaultChecked label='Dev Environment' name='isDev' />
		<Form.Tree
			label='Cloud Accounts'
			name='cloudAccounts'
			treeData={treeData}
		/>
		<Form.Code label='Sample JSON' name='sampleJson' />
		<Form.SubmitButton useShortcutProps={{ keys: ['Shift', 'Enter'] }}>
			Submit
		</Form.SubmitButton>
	</Form>
)

export const Default = Template.bind({})

export const Loading = Template.bind({})
Loading.args = { loading: true }
