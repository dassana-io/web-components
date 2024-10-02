import { Error404 } from './Error404'
import React from 'react'
import { type Meta, type StoryFn } from '@storybook/react'

export default {
	component: Error404,
	parameters: {
		storyshots: { disable: true }
	},
	title: 'Error 404 Page'
} as Meta

const Template: StoryFn = () => (
	<Error404 onBtnClick={() => console.log('Clicked!')} />
)

export const Error = Template.bind({})
