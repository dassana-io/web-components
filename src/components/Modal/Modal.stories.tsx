import { Button } from '../Button'
import { Emitter } from '@dassana-io/web-utils'
import { ModalConfig } from './utils'
import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { ModalProvider, useModal } from './index'

const mockEmitter = new Emitter()

export default {
	decorators: [
		Story => (
			<ModalProvider emitter={mockEmitter}>
				<Story />
			</ModalProvider>
		)
	],
	title: 'Modal'
} as Meta

const Template: Story<ModalConfig> = args => {
	const { setModalConfig } = useModal()

	return <Button onClick={() => setModalConfig(args)}>Open Modal</Button>
}

export const Default = Template.bind({})
Default.args = {
	content: <div>Modal Content</div>,
	options: {
		disableKeyboardShortcut: false,
		hideCloseButton: false
	}
}
