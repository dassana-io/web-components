import { action } from '@storybook/addon-actions'
import React from 'react'
import { Code, CodeProps } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	argTypes: {
		onChange: { defaultValue: action('onChange') }
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
				'a-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-reallyreally-really-really-long-key':
					null
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
	height: '900px',
	width: '900px'
}

export const Yaml = Template.bind({})
Yaml.args = {
	code: `schema: 1.0
  type: normalize
  vendor-name: foo-cloud
  id: foo-cloud-normalize
  
  filter:
    match-type: all
    rules:
      - .badThingJustHappened and .badThingJustHappened.description
      - .badThingJustHappened.description | contains ("fubar")
  
  steps:
    - id: demo-resource-info
      uses: DemoCloudNormalizer
  
  normalized-output:
    step-id: demo-resource-info
    output:
      alertId: ."demo-resource-info".alertId
      canonicalId: ."demo-resource-info".canonicalId
      vendorPolicy: ."demo-resource-info".vendorPolicy
      csp: ."demo-resource-info".csp
      resourceContainer: ."demo-resource-info".resourceContainer
      region: ."demo-resource-info".region
      service: ."demo-resource-info".service
      resourceType: ."demo-resource-info".resourceType
      resourceId: ."demo-resource-info".resourceId
  
  output-queue:
    enabled: true
  `,
	language: 'yaml'
}
