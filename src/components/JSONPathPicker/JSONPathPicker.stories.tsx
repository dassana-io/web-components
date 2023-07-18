import { Input } from 'components/Input'
import { JSONPathPicker, JSONPathPickerProps } from '.'
import { Meta, StoryFn } from '@storybook/react'
import React, { useState } from 'react'

export default {
	component: JSONPathPicker,
	title: 'JSONPathPicker'
} as Meta

const Template: StoryFn<JSONPathPickerProps> = args => {
	const [path, setPath] = useState('$.dassana')

	return (
		<div>
			<Input
				fullWidth
				onChange={e => setPath(e.target.value)}
				value={path}
			/>
			<div style={{ padding: 8 }}></div>
			<JSONPathPicker
				{...args}
				onChange={path => {
					setPath(path)
					console.log(path)
				}}
				path={path}
			/>
		</div>
	)
}

/* eslint-disable sort-keys */
const sampleJSON = {
	dassana: {
		context: {
			attachedResources: {
				'count-of-attached-eni': 3,
				'does-any-eni-have-public-ip': true,
				'are-there-flows-from-internet-in-vpcflows': false
			}
		}
	},
	resourceConfig: {
		configuration: {
			description: 'ssh-from-world',
			groupName: 'prod-cache',
			ipPermissions: [
				{
					fromPort: 22,
					ipProtocol: 'tcp',
					ipv6Ranges: [
						{
							cidrIpv6: '::/0'
						}
					],
					prefixListIds: [],
					toPort: 22,
					userIdGroupPairs: [],
					ipv4Ranges: [
						{
							cidrIp: '0.0.0.0/0'
						}
					]
				}
			]
		},
		'a-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-reallyreally-really-really-long-key':
			null
	}
}
/* eslint-enable sort-keys */

export const Default = Template.bind({})
Default.args = {
	json: sampleJSON
}
