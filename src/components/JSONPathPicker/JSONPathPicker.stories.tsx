import React, { useState } from 'react'
import { JSONPathPicker, JSONPathPickerProps } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	component: JSONPathPicker,
	title: 'JSONPathPicker'
} as Meta

const Template: Story<JSONPathPickerProps> = args => {
	// const [path, setPath] = useState('')

	return (
		<JSONPathPicker
			{...args}
			onChange={path => {
				// setPath(path)
				console.log(path)
			}}
			// path={path}
		/>
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
		}
	}
}
/* eslint-enable sort-keys */

export const Default = Template.bind({})
Default.args = {
	json: sampleJSON
}
