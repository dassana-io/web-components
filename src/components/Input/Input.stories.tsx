import { action } from '@storybook/addon-actions'
import { faCopy } from '@fortawesome/pro-regular-svg-icons'
import { IconButton } from 'components/IconButton'
import React from 'react'
import { Tooltip } from 'components/Tooltip'
import { Input, type InputProps } from './index'
import { type Meta, type Story } from '@storybook/react'

export default {
	argTypes: {
		classes: { control: 'array' },
		onChange: { defaultValue: action('onChange') },
		value: { control: { disable: true } }
	},
	component: Input,
	title: 'Input'
} as Meta

const Template: Story<InputProps> = args => <Input {...args} />

export const Default = Template.bind({})

export const Placeholder = Template.bind({})
Placeholder.args = { placeholder: 'Search...' }

export const MultiLine = Template.bind({})
MultiLine.args = { multiLine: true }

export const Loading = Template.bind({})
Loading.args = { loading: true }

export const FullWidth = Template.bind({})
FullWidth.args = { fullWidth: true }

export const Error = Template.bind({})
Error.args = { error: true }

export const Disabled = Template.bind({})
Disabled.args = { disabled: true }

export const Addons = Template.bind({})
Addons.args = {
	addonAfter: '.com',
	addonBefore: '@',
	placeholder: 'yourdomain'
}

export const Suffix = Template.bind({})
Suffix.args = {
	suffix: (
		<Tooltip placement='bottom' title='Copy'>
			<IconButton
				icon={faCopy}
				onClick={() => console.log('copied')}
				size={14}
			/>
		</Tooltip>
	)
}
