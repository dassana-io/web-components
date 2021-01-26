import { action } from '@storybook/addon-actions'
import { SbTheme } from '../../../.storybook/preview'
import { styleguide } from 'components/assets/styles/styleguide'
import { themedModalStyles } from 'components/Modal/utils'
import { createUseStyles, useTheme } from 'react-jss'
import { Meta, Story } from '@storybook/react/types-6-0'
import { MultipleChoice, MultipleChoiceProps } from './index'
import React, { FC, Fragment, useRef } from 'react'

const { font, fontWeight } = styleguide

const useStyles = createUseStyles({
	eventTarget: ({ theme }) => ({
		'&:focus': {
			outline: 'none'
		},
		...themedModalStyles(theme.type),
		border: `1px solid ${theme.text.disabled}`,
		padding: 60
	}),
	heading: {
		color: ({ theme }) => theme.text.primary,
		fontWeight: fontWeight.light
	},
	info: {
		...font.body,
		color: ({ theme }) => theme.text.primary,
		fontWeight: fontWeight.light
	}
})

export default {
	argTypes: {
		loading: { control: 'boolean' },
		onChange: { defaultValue: action('onChange') },
		popupContainerSelector: { control: { disable: true } },
		singleColumnItemsCount: { control: 'number', defaultValue: 8 },
		skeletonItemCount: { control: 'number' }
	},
	title: 'MultipleChoice'
} as Meta

const ThemedMultipleChoice: FC<MultipleChoiceProps> = (
	props: MultipleChoiceProps
) => {
	const theme: SbTheme = useTheme()
	const divRef = useRef<HTMLDivElement>(null)

	const classes = useStyles({ theme })

	const popupContainerSelector = `.${theme.type}`

	const getEventTarget = () => divRef

	return (
		<Fragment key={theme.type}>
			<h3 className={classes.heading}>
				Click on the bordered box to use keyboard shortcuts
			</h3>
			<p className={classes.info}>
				Press Tab or Up, Down, Left, Right arrow keys to navigate. Press
				enter or alphabet keys to select/deselect
			</p>
			<div className={classes.eventTarget} ref={divRef} tabIndex={0}>
				<MultipleChoice
					{...props}
					getEventTarget={getEventTarget}
					popupContainerSelector={popupContainerSelector}
				/>
			</div>
		</Fragment>
	)
}

const Template: Story<MultipleChoiceProps> = args => (
	<ThemedMultipleChoice {...args} />
)

const items = [
	'CISCO',
	'Sr Leadership',
	'SecOps',
	'Cloud Architect',
	'DevOps',
	'NetSec',
	'AppDev',
	'Compliance',
	'Other'
]

const multichoiceItems = items.map(item => ({
	label: item,
	value: item.toLowerCase().split(' ').join('-')
}))

export const Multiple = Template.bind({})
Multiple.args = {
	defaultValues: ['sr-leadership', 'devops'],
	items: multichoiceItems
}

export const Single = Template.bind({})
Single.args = {
	defaultValue: 'sr-leadership',
	items: multichoiceItems,
	mode: 'single'
}

export const SingleColumn = Template.bind({})
SingleColumn.args = {
	items: multichoiceItems.slice(2)
}
