import { recursiveRender } from './utils'
import { useStyles } from './styles'
import React, { FC } from 'react'

export type JSONValue =
	| string
	| number
	| boolean
	| null
	| JSONValue[]
	| { [key: string]: JSONValue }

export interface JSONPathPickerProps {
	json: Record<string, JSONValue>
	path: string
	onChange: (path: string) => void
}

export const JSONPathPicker: FC<JSONPathPickerProps> = ({
	json,
	path,
	onChange
}: JSONPathPickerProps) => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			{recursiveRender({
				classes,
				currPath: '$',
				isLastItem: true,
				onChange,
				pickedPath: path,
				remainingJSON: json
			})}
		</div>
	)
}
