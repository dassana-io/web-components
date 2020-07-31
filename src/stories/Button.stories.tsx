import { action } from '@storybook/addon-actions'
import React from 'react'
import Button, { ButtonProps } from '../components/Button'

export default {
	title: 'Button',
	component: Button,
	excludeStories: /.*Data$/
}

const actionsData = {
	onClick: action('onClick')
}

export const buttonData: ButtonProps = {
	onClick: actionsData.onClick,
	disabled: false,
	primary: false,
	type: 'button',
	classes: []
}

export const Default = () => <Button {...buttonData}>Default</Button>

export const Disabled = () => (
	<Button {...{ ...buttonData, disabled: true }}>Disabled</Button>
)

export const Primary = () => (
	<Button {...{ ...buttonData, primary: true }}>Primary</Button>
)

export const Submit = () => (
	<Button {...{ ...buttonData, type: 'submit' }}>Submit</Button>
)

export const PrimaryDisabled = () => (
	<Button {...{ ...buttonData, primary: true, disabled: true }}>
		Primary Disabled
	</Button>
)

export const Google = () => (
	<Button {...{ ...buttonData, classes: ['red'] }}>
		<i className='google icon'></i>
		Google
	</Button>
)
