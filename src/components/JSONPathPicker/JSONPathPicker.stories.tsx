import { Input } from 'components/Input'
import { JSONPathPicker, JSONPathPickerProps } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { useState } from 'react'

export default {
	component: JSONPathPicker,
	title: 'JSONPathPicker'
} as Meta

const Template: Story<JSONPathPickerProps> = args => {
	const [path, setPath] = useState('')

	return (
		<div>
			<Input
				fullWidth
				onChange={e => setPath(e.target.value)}
				value={path}
			/>
			<div style={{ padding: 10 }}></div>
			<JSONPathPicker
				{...args}
				onChange={path => {
					setPath(path)
					console.log(path)
				}}
				// path={path}
			/>
		</div>
	)
}

/* eslint-disable sort-keys */
const sampleJSON = {
	test: null,
	undef: undefined,
	num: 1,
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
		}
	}
}
/* eslint-enable sort-keys */

export const Default = Template.bind({})
Default.args = {
	json: sampleJSON
}
