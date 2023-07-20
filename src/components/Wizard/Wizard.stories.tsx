import { createUseStyles } from 'react-jss'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { IconButton, IconSizes } from 'components/IconButton'
import { type Meta, type Story } from '@storybook/react'
import React, { type FC, type ReactNode } from 'react'
import { styleguide, themedStyles, ThemeType } from '../assets/styles'
import { useWizard, Wizard, type WizardProps } from '.'

const { light, dark } = ThemeType
const { font, spacing } = styleguide

export default {
	argTypes: {
		steps: { control: { disable: true } }
	},
	component: Wizard,
	title: 'Wizard'
} as Meta

const Template: Story<WizardProps> = args => <Wizard {...args} />

const useStyles = createUseStyles({
	container: {
		...font.body,
		color: themedStyles[light].base.color,
		padding: { left: spacing.s, right: spacing.s }
	},
	header: {
		...font.bodyLarge,
		borderBottom: `1px solid ${themedStyles[light].base.borderColor}`,
		margin: { bottom: spacing.m },
		padding: { bottom: spacing.m, top: spacing.m }
	},
	iconArrow: { position: 'absolute' },
	iconLeftArrow: { right: 10 },
	iconRightArrow: { left: 10 },
	title: { position: 'relative', textAlign: 'center' },
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': {
				color: themedStyles[dark].base.color
			},
			'& $header': {
				borderBottom: `1px solid ${themedStyles[dark].base.borderColor}`
			}
		}
	}
})

interface Props {
	title: ReactNode
	content: string
}

const WizardStep: FC<Props> = ({ title, content }: Props) => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<div className={classes.header}>
				<div className={classes.title}>{title}</div>
			</div>
			<div>{content}</div>
		</div>
	)
}

const WizardStepOne = () => {
	const classes = useStyles()
	const { nextStep } = useWizard()

	return (
		<WizardStep
			content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua.'
			title={
				<>
					Foo
					<IconButton
						classes={[classes.iconArrow, classes.iconLeftArrow]}
						icon={faArrowRight}
						onClick={() => nextStep()}
						size={IconSizes.xs}
					/>
				</>
			}
		/>
	)
}

const WizardStepTwo = () => {
	const classes = useStyles()
	const { prevStep } = useWizard()

	return (
		<WizardStep
			content='Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.'
			title={
				<>
					Bar
					<IconButton
						classes={[classes.iconArrow, classes.iconRightArrow]}
						icon={faArrowLeft}
						onClick={() => prevStep()}
						size={IconSizes.xs}
					/>
				</>
			}
		/>
	)
}

export const Default = Template.bind({})
Default.args = {
	steps: [
		{ render: () => <WizardStepOne /> },
		{ render: () => <WizardStepTwo /> }
	]
}
