import { action } from '@storybook/addon-actions'
import React from 'react'
import { IconButton, IconButtonProps, IconSizes } from './index'
import { Meta, Story } from '@storybook/react/types-6-0'

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
			}
		}
	},
	component: IconButton,
	title: 'IconButton'
} as Meta

const Template: Story<IconButtonProps> = args => <IconButton {...args} />

export const Default = Template.bind({})
