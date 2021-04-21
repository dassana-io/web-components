import { recursiveRender } from './utils'
import { useStyles } from './styles'
import React, { FC } from 'react'

export type JSONValue =
	| string
	| number
	| boolean
	| null
	| undefined // undefined isn't valid JSON value type
	| JSONValue[]
	| { [key: string]: JSONValue }

export interface JSONPathPickerProps {
	json: Record<string, JSONValue>
	path?: string
	onChange?: (path: string) => void
}

export const JSONPathPicker: FC<JSONPathPickerProps> = ({
	json,
	path,
	onChange
}: JSONPathPickerProps) => {
	const classes = useStyles()

	const onClick = (e: any) => {
		const target = e.target

		if (target.hasAttribute('data-json-path')) {
			const jsonPath = target.getAttribute('data-json-path')
			// let choosenPath

			// if (target.hasAttribute('data-choosearr')) {
			// 	const tmp = getPathArr(path)

			// 	const idx = getPathArr(pathKey).length
			// 	tmp[idx] = '[*]'
			// 	choosenPath = tmp.join('')
			// } else {
			// choosenPath = pathKey
			// }

			// onChange && onChange(choosenPath)
			onChange && onChange(jsonPath)
		}
	}
	return (
		<div className={classes.container} onClick={onClick}>
			{recursiveRender({
				classes,
				nextPath: '$',
				pickedPath: path || '',
				remainingJSON: json
			})}
		</div>
	)
}
