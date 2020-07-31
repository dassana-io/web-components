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

export const Disabled = () => {
	const props: ButtonProps = { ...buttonData, disabled: true }
	return <Button {...props}>Disabled</Button>
}

export const Primary = () => {
	const props: ButtonProps = { ...buttonData, primary: true }
	return <Button {...props}>Primary</Button>
}

export const Submit = () => {
	const props: ButtonProps = { ...buttonData, type: 'submit' }
	return <Button {...props}>Submit</Button>
}

export const PrimaryDisabled = () => {
	const props: ButtonProps = { ...buttonData, primary: true, disabled: true }
	return <Button {...props}>Primary Disabled</Button>
}

export const Google = () => {
	const props: ButtonProps = { ...buttonData, classes: ['red'] }
	return (
		<Button {...props}>
			<i className='google icon'></i>
			Google
		</Button>
	)
}
