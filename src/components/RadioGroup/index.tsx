import 'antd/lib/radio/style/index.css'
import { Radio as AntDRadio } from 'antd'
import { CommonComponentProps } from '../types'
import { createUseStyles } from 'react-jss'
import { generateRadioSkeletonStyles } from './utils'
import { Skeleton } from '../Skeleton'
import { ThemeType } from 'components/assets/styles/themes'
import times from 'lodash/times'
import { getDataTestAttributeProp, TAG } from '../utils'
import React, { ChangeEventHandler, FC } from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	container: {
		display: 'flex'
	},
	skeleton: {
		borderRadius: 'unset'
	},
	skeletonButton: generateRadioSkeletonStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $skeletonButton': generateRadioSkeletonStyles(dark)
		}
	}
})

const RadioGroupSkeleton: FC<RadioGroupProps> = ({
	options
}: RadioGroupProps) => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			{times(options.length, i => (
				<div className={classes.skeletonButton} key={i}>
					<Skeleton
						classes={[classes.skeleton]}
						height={32}
						width={75}
					/>
				</div>
			))}
		</div>
	)
}

export interface RadioGroupOptions {
	disabled?: boolean
	label: string
	value: string
}

export interface RadioGroupProps extends CommonComponentProps {
	/**
	 * Default value for radio group. Without this, the first option will be defaulted
	 */
	defaultValue?: string
	/**
	 * Adds the disabled attribute and styles (opacity, gray scale filter, no pointer events)
	 * @default false
	 */
	disabled?: boolean
	/**
	 * Whether or not to show skeleton loader
	 * @default false
	 */
	loading?: boolean
	/**
	 * Callback that runs when element is updated
	 */
	onChange?: ChangeEventHandler
	/**
	 * Array of options to be rendered in the form of buttons
	 */
	options: RadioGroupOptions[]
	/**
	 * Element content value for controlled input elements. Requires an onChange to be passed
	 */
	value?: string
}

export const RadioGroup: FC<RadioGroupProps> = (props: RadioGroupProps) => {
	const {
		defaultValue,
		dataTag,
		disabled = false,
		loading = false,
		onChange,
		options,
		value
	} = props

	let controlledCmpProps = {}

	if (onChange) {
		controlledCmpProps = {
			onChange,
			value
		}
	}

	return loading ? (
		<RadioGroupSkeleton {...props} />
	) : (
		<AntDRadio.Group
			buttonStyle='solid'
			defaultValue={defaultValue || options[0].value}
			disabled={disabled}
			name={getDataTestAttributeProp('radioGroup', dataTag)[TAG]}
			optionType='button'
			options={options}
			{...controlledCmpProps}
		/>
	)
}
