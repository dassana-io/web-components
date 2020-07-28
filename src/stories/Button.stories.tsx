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

export const DefaultButton = () => <Button {...actionsData} text='Default' />

export const googleButtonData = {
	classes: 'google plus',
	primary: false,
	text: 'Google'
}

export const GoogleButton = () => (
	<Button {...actionsData} {...googleButtonData}>
		<i className='google icon'></i>
	</Button>
)
