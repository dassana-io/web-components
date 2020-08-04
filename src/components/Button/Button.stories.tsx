import { action } from '@storybook/addon-actions'
import React from 'react'
import Button, { ButtonProps, ButtonType } from './index'
import { withKnobs, boolean, array, select, text } from '@storybook/addon-knobs'

export default {
	title: 'Button',
	component: Button,
	decorators: [withKnobs],
	excludeStories: /.*Data$/
}

const actionsData = {
	onClick: action('onClick')
}

export const buttonData: ButtonProps = {
	onClick: actionsData.onClick
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
	const props: ButtonProps = { ...buttonData, classes: ['google', 'plus'] }
	return (
		<Button {...props}>
			<i className='google icon'></i>
			Google
		</Button>
	)
}

export const ButtonWithKnobs = () => {
	const typeOpts: Record<string, ButtonType> = {
		button: 'button',
		submit: 'submit',
		reset: 'reset'
	}

	const props: ButtonProps = {
		...buttonData,
		disabled: boolean('Disabled', false),
		primary: boolean('Primary', false),
		classes: array('Classes', ['twitter']),
		type: select<ButtonType>('Type', typeOpts, 'button')
	}

	const iconClasses = text('Icon name', 'twitter')

	return (
		<Button {...props}>
			{iconClasses && <i className={`${iconClasses} icon`}></i>}
			{text('Button text', 'Twitter')}
		</Button>
	)
}
