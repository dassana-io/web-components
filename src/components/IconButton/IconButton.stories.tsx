import { action } from '@storybook/addon-actions'
import React from 'react'
import { IconButton, IconButtonProps, IconSizes } from './index'
import { Meta, Story } from '@storybook/react'

export default {
	argTypes: {
		icon: { control: { disable: true } },
		onClick: { defaultValue: action('onClick') },
		size: {
			control: {
				options: [
					IconSizes.xs,
					IconSizes.sm,
					IconSizes.lg,
					IconSizes.xl
				],
				type: 'select'
			},
			defaultValue: IconSizes.sm
		}
	},
	component: IconButton,
	title: 'IconButton'
} as Meta

const Template: Story<IconButtonProps> = args => <IconButton {...args} />

export const Default = Template.bind({})
Default.argTypes = {
	circle: { control: { disable: true } },
	pending: { control: { disable: true } },
	primary: { control: { disable: true } }
}

export const Circle = Template.bind({})
Circle.argTypes = {
	circle: { control: { disable: true } },
	hasBorder: { control: { disable: true } },
	size: { defaultValue: IconSizes.lg }
}
Circle.args = {
	circle: true
}

export const Pending = Template.bind({})
Pending.argTypes = {
	circle: { control: { disable: true } },
	hasBorder: { control: { disable: true } },
	size: { defaultValue: IconSizes.lg }
}
Pending.args = {
	circle: true,
	pending: true
}
