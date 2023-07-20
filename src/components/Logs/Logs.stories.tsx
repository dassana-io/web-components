import { type SbTheme } from '../../../.storybook/preview'
import { useTheme } from 'react-jss'
import { Logs, type LogsProps } from '.'
import { type Meta, type Story } from '@storybook/react'
import React, { type FC } from 'react'

export default {
	argTypes: {
		classes: { control: { disable: true } },
		popupContainerSelector: { control: { disable: true } }
	},
	component: Logs,
	title: 'Logs'
} as Meta

const ThemedLogs: FC<LogsProps> = (props: LogsProps) => {
	const theme: SbTheme = useTheme()

	return <Logs {...props} popupContainerSelector={`.${theme.type}`} />
}

const Template: Story<LogsProps> = args => <ThemedLogs {...args} />

export const Default = Template.bind({})

const mockLogs = [
	{
		message: 'Lorem ipsum dolor sit amet',
		ts: 1602698523100
	},
	{
		message: 'consectetur adipiscing elit sed do',
		ts: 1602698523200
	},
	{
		message: 'eiusmod tempor',
		ts: 1602698523400
	},
	{
		message: 'incididunt ut labore et dolore magna aliqua',
		ts: 1602698523500
	},
	{
		message: 'Ut enim ad minim veniam',
		ts: 1602698523500
	},
	{
		message: 'Duis aute irure dolor',
		ts: 1602698523500
	},
	{
		message:
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		ts: 1602698523500
	},
	{
		message: 'Excepteur sint occaecat',
		ts: 1602698523500
	},
	{
		message: 'Sed ut perspiciatis unde omnis iste',
		ts: 1602698523500
	},
	{
		message:
			'totam rem aperiam, eaque ipsa quae ab illo inventore veritatis',
		ts: 1602698523500
	},
	{
		message:
			'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
		ts: 1602698523500
	},
	{
		message: 'et quasi architecto beatae vitae dicta sunt explicabo.',
		ts: 1602698523500
	},
	{
		message: 'Sed ut perspiciatis unde omnis iste natus error',
		ts: 1602698523500
	},
	{
		message: 'Nemo enim ipsam voluptatem quia voluptas sit',
		ts: 1602698523500
	},
	{
		message: 'sed quia consequuntur magni dolores eos',
		ts: 1602698523500
	},
	{
		message: 'qui ratione voluptatem sequi nesciunt.',
		ts: 1602698523500
	},
	{
		message: 'Neque porro quisquam est, qui dolorem',
		ts: 1602698523500
	},
	{
		message:
			'ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam',
		ts: 1602698523500
	},
	{
		message: 'eius modi tempora incidunt ut labore et',
		ts: 1602698523500
	},
	{
		message: 'dolore magnam aliquam quaerat voluptatem.',
		ts: 1602698523500
	},
	{
		message: 'Ut enim ad minima veniam, quis nostrum exercitationem',
		ts: 1602698523500
	},
	{
		message: 'ullam corporis suscipit laboriosam',
		ts: 1602698523500
	},
	{
		message: 'nisi ut aliquid ex ea commodi consequatur?',
		ts: 1602698523500
	},
	{
		message: 'Quis autem vel eum iure reprehenderit qui in ea voluptate',
		ts: 1602698523500
	},
	{
		message:
			'velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
		ts: 1602698523500
	},
	{
		message:
			'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis',
		ts: 1602698523500
	},
	{
		message: 'praesentium voluptatum deleniti atque corrupti',
		ts: 1602698523500
	},
	{
		message:
			'quos dolores et quas molestias excepturi sint occaecati cupiditate non provident',
		ts: 1602698523500
	},
	{
		message: 'similique sunt in culpa qui officia deserunt mollitia animi',
		ts: 1602698523500
	},
	{
		message: 'Et harum quidem rerum facilis est et expedita distinctio.',
		ts: 1602698523500
	},
	{
		message:
			'Nam libero tempore, cum soluta nobis est eligendi optio cumque',
		ts: 1602698523500
	},
	{
		message:
			'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet',
		ts: 1602698523500
	},
	{
		message:
			'ut et voluptates repudiandae sint et molestiae non recusandae.',
		ts: 1602698523500
	},
	{
		message: 'Itaque earum rerum hic tenetur a sapiente delectus',
		ts: 1602698523500
	}
]

Default.args = {
	filename: 'test_filename.txt',
	logs: mockLogs
}
