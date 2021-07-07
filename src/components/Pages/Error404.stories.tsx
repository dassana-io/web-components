import Error404 from './Error404'
import React from 'react'
import { Meta, Story } from '@storybook/react'

export default {
	component: Error404,
	title: 'Error 404 Page'
} as Meta

const Template: Story = () => <Error404 />

export const Error = Template.bind({})
