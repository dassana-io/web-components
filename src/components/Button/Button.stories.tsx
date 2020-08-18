import { action } from '@storybook/addon-actions'
import { createUseStyles } from 'react-jss'
import GoogleOutlined from '@ant-design/icons/GoogleOutlined'
import React from 'react'
import Button, { ButtonProps } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	argTypes: {
		children: { control: 'text' },
		classes: { control: 'array' }
	},
	component: Button,
	title: 'Button'
} as Meta

const actionsData = {
	onClick: action('onClick')
}

const Template: Story<ButtonProps> = args => (
	<Button {...args}>{args.children}</Button>
)

export const Default = Template.bind({})
Default.args = { ...actionsData, children: 'Default' }

export const Disabled = Template.bind({})
Disabled.args = { ...actionsData, children: 'Disabled', disabled: true }

export const Primary = Template.bind({})
Primary.args = { ...actionsData, children: 'Primary', primary: true }

export const PrimaryDisabled = Template.bind({})
PrimaryDisabled.args = {
	...actionsData,
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
	...actionsData,
	children: 'Sign in with Google',
	classes: ['google']
}
