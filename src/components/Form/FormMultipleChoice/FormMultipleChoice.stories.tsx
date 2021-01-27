import { multipleChoiceItems } from 'components/MultipleChoice/fixtures'
import React from 'react'
import { Form, FormProps } from '../index'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	argTypes: {
		initialValues: { control: { disable: true } },
		onSubmit: { control: { disable: true } }
	},
	component: Form,
	parameters: {
		storyshots: { disable: true }
	},
	title: 'Form/MultipleChoice'
} as Meta

interface MultipleProps {
	roles?: string[]
}

const MultipleTemplate: Story<FormProps<MultipleProps>> = (
	args: FormProps<MultipleProps>
) => (
	<Form
		{...args}
		initialValues={{
			roles: ['sr-leadership', 'devops']
		}}
	>
		<Form.MultipleChoice
			items={multipleChoiceItems}
			mode='multiple'
			name='multipleChoice'
			required
		/>
		<Form.SubmitButton>Submit</Form.SubmitButton>
	</Form>
)

export const Multiple = MultipleTemplate.bind({})

interface SingleProps {
	role?: string
}

const SingleTemplate: Story<FormProps<SingleProps>> = (
	args: FormProps<SingleProps>
) => (
	<Form
		{...args}
		initialValues={{
			role: 'sr-leadership'
		}}
	>
		<Form.MultipleChoice
			items={multipleChoiceItems}
			mode='single'
			name='multipleChoice'
			required
		/>
	</Form>
)

export const Single = SingleTemplate.bind({})
