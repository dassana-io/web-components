import React from 'react'
import Input from '../components/Input'

export default {
	title: 'Input',
	component: Input,
	excludeStories: /.*Data$/
}

export const defaultInputData = {
	id: 'test-input'
}
export const DefaultInput = () => <Input {...defaultInputData} />
