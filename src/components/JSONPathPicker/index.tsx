import isNull from 'lodash/isNull'
import isUndefined from 'lodash/isUndefined'
import { Classes, useStyles } from './styles'
import React, { FC, ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'

type JSONValue =
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

const getPathArr = (path = ''): string[] =>
	path.match(/(\..+?)|(\[.+?\])/g) || []

type RemainingJSON = JSONValue | Record<string, JSONValue>

interface RenderParams {
	classes: Classes
	pickedPath: string
	isLastItem?: boolean
	nextPath?: string
	remainingJSON: JSONValue | Record<string, JSONValue>
}

const renderNumber = ({
	classes,
	pickedPath,
	remainingJSON,
	isLastItem,
	nextPath
}: RenderParams): ReactNode => {
	return <div></div>
}

const renderArray = ({
	classes,
	pickedPath,
	remainingJSON,
	isLastItem,
	nextPath
}: RenderParams): ReactNode => {
	return <div></div>
}

const renderUndefined = ({
	classes,
	pickedPath,
	remainingJSON,
	isLastItem,
	nextPath
}: RenderParams): ReactNode => {
	return <div></div>
}

const renderBoolean = ({
	classes,
	pickedPath,
	remainingJSON,
	isLastItem,
	nextPath
}: RenderParams): ReactNode => {
	return <div></div>
}

const renderNull = ({
	classes,
	pickedPath,
	remainingJSON,
	isLastItem,
	nextPath
}: RenderParams): ReactNode => {
	return <div></div>
}

const renderString = ({
	classes,
	pickedPath,
	remainingJSON,
	isLastItem,
	nextPath
}: RenderParams): ReactNode => {
	return <div></div>
}

const renderObject = ({
	classes,
	pickedPath,
	remainingJSON,
	nextPath
}: RenderParams): ReactNode => {
	const json = remainingJSON as Record<string, JSONValue>
	const remainingKeys = Object.keys(json)

	return (
		<>
			<span
				className={classes.pathPickerIcon}
				data-json-path={nextPath}
			></span>
			<span>{'{'}</span>
			<ul className={classes.jsonObj}>
				{remainingKeys.map((key, i) => {
					return (
						<li key={i}>
							<span>{key}</span>
							<span> : </span>
							{recursiveRender({
								classes,
								isLastItem: remainingKeys.length - 1 === i,
								nextPath: `${nextPath}.${key}`,
								pickedPath,
								remainingJSON: json[key]
							})}
						</li>
					)
				})}
			</ul>
			<span>{'}'}</span>
		</>
	)
}

enum Types {
	array = 'array',
	boolean = 'boolean',
	null = 'null',
	number = 'number',
	object = 'object',
	string = 'string',
	undefined = 'undefined'
}

const mappedTypesToRenderFns = {
	[Types.array]: renderArray,
	[Types.boolean]: renderBoolean,
	[Types.null]: renderNull,
	[Types.number]: renderNumber,
	[Types.object]: renderObject,
	[Types.string]: renderString,
	[Types.undefined]: renderUndefined
}

const getRemainingJSONType = (remainingJSON: RemainingJSON) => {
	if (isUndefined(remainingJSON)) return Types.undefined
	else if (Array.isArray(remainingJSON)) return Types.array
	else if (isNull(remainingJSON)) return Types.null
	else {
		const type = typeof remainingJSON

		if (Object.values(Types).includes(type as Types)) return type as Types
	}
	return Types.undefined
}

const recursiveRender = ({
	classes,
	pickedPath,
	isLastItem,
	nextPath,
	remainingJSON
}: RenderParams): ReactNode =>
	mappedTypesToRenderFns[getRemainingJSONType(remainingJSON)]({
		classes,
		isLastItem,
		nextPath,
		pickedPath,
		remainingJSON
	})

export const JSONPathPicker: FC<JSONPathPickerProps> = ({
	json,
	path,
	onChange
}: JSONPathPickerProps) => {
	const classes = useStyles()

	// console.log(json, path, onChange)

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
