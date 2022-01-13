import 'antd/lib/radio/style/index.css'
import { createUseStyles } from 'react-jss'
import { generateRadioGroupStyles } from './utils'
import { ThemeType } from '../assets/styles/themes'
import { Radio as AntDRadio, RadioChangeEvent } from 'antd'
import React, { FC, ReactNode } from 'react'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	radioGroup: generateRadioGroupStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $radioGroup': generateRadioGroupStyles(dark)
		}
	}
})

export interface RadioGroupProps {
	children: ReactNode
	defaultValue?: string
	disabled?: boolean
	name?: string
	onChange: (e: RadioChangeEvent) => void
	value: string
}

const RadioGroup: FC<RadioGroupProps> = ({
	children,
	...rest
}: RadioGroupProps) => {
	const classes = useStyles()

	return (
		<AntDRadio.Group className={classes.radioGroup} {...rest}>
			{children}
		</AntDRadio.Group>
	)
}

export default RadioGroup
