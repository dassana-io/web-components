import { Button } from '../Button'
import { Emitter } from '@dassana-io/web-utils'
import { type ModalConfig } from './utils'
import React from 'react'
import { type SbTheme } from '../../../.storybook/preview'
import { useTheme } from 'react-jss'
import { type Meta, type StoryFn } from '@storybook/react'
import { ModalProvider, useModal } from './index'
const mockEmitter = new Emitter()

export default {
	decorators: [
		Story => {
			const theme: SbTheme = useTheme()

			return (
				<ModalProvider
					emitter={mockEmitter}
					popupContainerSelector={`.${theme.type}`}
				>
					<Story />
				</ModalProvider>
			)
		}
	],
	title: 'Modal'
} as Meta

const Template: StoryFn<ModalConfig> = args => {
	const { setModalConfig } = useModal()

	return <Button onClick={() => setModalConfig(args)}>Open Modal</Button>
}

export const Default = Template.bind({})
Default.args = {
	content: <div>Modal Content</div>,
	options: {
		disableKeyboardShortcut: false,
		drawer: true,
		hideCloseButton: false
	}
}
