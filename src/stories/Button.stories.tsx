import { action } from '@storybook/addon-actions'
import React from 'react'
import Button from '../components/Button'

export default {
	title: 'Button',
	component: Button,
	excludeStories: /.*Data$/
}

const actionsData = {
	onClick: action('onClick')
}

export const Default = () => <Button {...actionsData} text='Default' />

const googleData = {
	classes: 'google plus',
	primary: false,
	text: 'Google'
}

export const Google = () => (
	<Button {...actionsData} {...googleData}>
		<i className='google icon'></i>
	</Button>
)
