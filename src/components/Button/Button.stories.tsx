import { action } from '@storybook/addon-actions'
import { createUseStyles } from 'react-jss'
import GoogleOutlined from '@ant-design/icons/GoogleOutlined'
import React from 'react'
import Button, { ButtonProps } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	argTypes: {
		children: { control: 'text' },
		classes: { control: 'array' },
		onClick: { defaultValue: action('onClick') }
	},
	component: Button,
	title: 'Button'
} as Meta

const Template: Story<ButtonProps> = args => (
	<Button {...args}>{args.children}</Button>
)

export const Default = Template.bind({})
Default.args = { children: 'Default' }

export const Disabled = Template.bind({})
Disabled.args = { children: 'Disabled', disabled: true }

export const Loading = Template.bind({})
Loading.args = { children: 'Loading', loading: true }

export const Primary = Template.bind({})
Primary.args = { children: 'Primary', primary: true }

export const PrimaryDisabled = Template.bind({})
PrimaryDisabled.args = {
	children: 'Primary Disabled',
	disabled: true,
	primary: true
}

// Google Icon Button
const useStyles = createUseStyles({
	google: {
		'&:hover': {
			backgroundColor: '#e36e60',
			color: 'white'
		},
		backgroundColor: '#dd4b39',
		border: 'none',
		color: 'white'
	}
})

const GoogleTemplate: Story<ButtonProps> = ({ ...args }: ButtonProps) => {
	const classes = useStyles()
	args.classes = [classes.google]
	return (
		<Button {...args}>
			<GoogleOutlined />
			{args.children}
		</Button>
	)
}

export const Google = GoogleTemplate.bind({})
Google.args = {
	children: 'Sign in with Google',
	classes: ['google']
}
