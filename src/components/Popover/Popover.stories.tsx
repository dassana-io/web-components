import { action } from '@storybook/addon-actions'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { placementOptions } from '../utils'
import { SbTheme } from '../../../.storybook/preview'
import { ThemeType } from 'components/assets/styles/themes'
import { useTheme } from 'react-jss'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Popover, PopoverProps } from './index'
import React, { FC } from 'react'

export default {
	argTypes: {
		children: { control: { disable: true } },
		content: {
			control: { disable: true },
			defaultValue: (
				<>
					<div style={{ paddingBottom: 10 }}>View account info</div>
					<Button onClick={() => action('onClick')}>Click Me</Button>
				</>
			)
		},
		placement: {
			control: {
				options: placementOptions,
				type: 'select'
			}
		},
		title: { control: { type: 'text' } }
	},
	component: Popover,
	decorators: [
		(PopoverStory: Story) => (
			<div style={{ padding: 75 }}>
				<PopoverStory />
			</div>
		)
	],
	title: 'Popover'
} as Meta

const { dark, light } = ThemeType

const ThemedPopover: FC<PopoverProps> = (props: PopoverProps) => {
	const theme: SbTheme = useTheme()

	const popupContainerSelector =
		theme.type === dark ? `.${dark}` : `.${light}`
	return (
		<Popover popupContainerSelector={popupContainerSelector} {...props}>
			<Icon iconKey='dassana' />
		</Popover>
	)
}

const Template: Story<PopoverProps> = args => <ThemedPopover {...args} />

export const Default = Template.bind({})

export const Title = Template.bind({})
Title.args = {
	title: 'Account Info'
}
