import React from 'react'
import { type Meta, type StoryFn } from '@storybook/react'
import { TruncatedText, type TruncatedTextProps } from './index'

export default {
	component: TruncatedText,
	title: 'TruncatedText'
} as Meta

const Template: StoryFn<TruncatedTextProps> = args => (
	<TruncatedText {...args} />
)

export const Default = Template.bind({})
Default.args = { text: 'Some really really long text' }
