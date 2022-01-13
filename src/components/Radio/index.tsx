import 'antd/lib/radio/style/index.css'
import RadioGroup from './RadioGroup'
import { Radio as AntDRadio, RadioChangeEvent } from 'antd'
import React, { ReactNode } from 'react'

export interface RadioProps {
	children: ReactNode | string
	disabled?: boolean
	value: string
}

export function Radio({ children, ...rest }: RadioProps) {
	return <AntDRadio {...rest}>{children}</AntDRadio>
}

Radio.Group = RadioGroup

export type { RadioChangeEvent }
