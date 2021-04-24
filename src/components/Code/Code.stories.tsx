import React from 'react'
import { Code, CodeProps } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	argTypes: {
		height: { defaultValue: 64 }
	},
	component: Code,
	title: 'Code'
} as Meta

const Template: Story<CodeProps> = args => <Code {...args} />

/* eslint-disable sort-keys */
const sampleJSON = {
	dassana: {
		context: {
			attachedResources: {
				'count-of-attached-eni': 3,
				'does-any-eni-have-public-ip': true,
				'are-there-flows-from-internet-in-vpcflows': false,
				'a-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-reallyreally-really-really-long-key': null
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
	code: sampleJSON,
	search: { placeholder: 'Search...' }
}

export const HTML = Template.bind({})
HTML.args = {
	code: `<div>
  <p>Lorem Ipsum</p>
  <span>dolor sit amet</span>
</div>`,
	language: 'html'
}
