import { QueryDisplay } from './index'
import React from 'react'
import { type Meta, type Story } from '@storybook/react'

export default {
	component: QueryDisplay,
	parameters: {
		storyshots: { disable: true }
	},
	title: 'Query Display'
} as Meta

const Template: Story = args => (
	<QueryDisplay
		onQueryClick={() => console.log('hello')}
		query={
			// eslint-disable-next-line quotes
			"Select userIdentity.principalId, eventSource, eventName \nfrom \"tutorial_app\" \nwhere eventSource = 's3.amazonaws.com' and eventName = 'ListBuckets' and userIdentity.principalId like '%:i-%"
		}
		renderControls={() => <div>Controls</div>}
		renderFooter={() => <div>Footer</div>}
		renderName={() =>
			'Discover potentially compromised EC2 instances performing S3 enumeration'
		}
	/>
)

export const Default = Template.bind({})
