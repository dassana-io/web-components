import { action } from '@storybook/addon-actions'
import React from 'react'
import Button from '../components/Button'

export default {
	title: 'Button',
	component: Button,
	excludeStories: /.*Data$/
}

export const actionsData = {
	onClick: action('onClick')
}

export const Default = () => <Button {...actionsData}>Default</Button>

export const disabledData = {
	disabled: true
}

export const Disabled = () => (
	<Button {...actionsData} {...disabledData}>
		Disabled
	</Button>
)

export const primaryData = {
	primary: true
}

export const Primary = () => (
	<Button {...actionsData} {...primaryData}>
		Primary
	</Button>
)

export const primaryDisabledData = {
	primary: true,
	disabled: true
}

export const PrimaryDisabled = () => (
	<Button {...actionsData} {...primaryDisabledData}>
		Primary Disabled
	</Button>
)

export const googleData = {
	classes: ['google'],
	text: 'Google'
}

export const Google = () => (
	<Button {...actionsData} {...googleData}>
		Google
	</Button>
)
