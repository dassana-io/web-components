import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { TruncatedText, TruncatedTextProps } from './index'

export default {
	component: TruncatedText,
	title: 'TruncatedText'
} as Meta

const Template: Story<TruncatedTextProps> = args => <TruncatedText {...args} />

export const Default = Template.bind({})
Default.args = { text: 'Some really really long text' }
