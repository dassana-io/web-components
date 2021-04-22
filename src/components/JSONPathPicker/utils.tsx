import { Classes } from './styles'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'
import isNull from 'lodash/isNull'
import { JSONPath } from 'jsonpath-plus'
import { JSONValue } from '.'
import React, { ReactNode } from 'react'

enum Relationship {
	other,
	self,
	ancestor
}

/**
 * Takes a JSON path as string and converts to an array
 */
const getJSONPathArr = (path: string): string[] =>
	//@ts-ignore
	JSONPath.toPathArray(path)

/**
 * Gets the relationship between current path and the picked path
 * @returns { Relationship } - Can either be "other", "self" or "ancestor"
 */
const getPathRelationship = (
	currPath: string,
	pickedPath: string
): Relationship => {
	const { other, self, ancestor } = Relationship

	if (!pickedPath) return 0

	const pickedAttrs = getJSONPathArr(pickedPath) || []
	const pickedLen = pickedAttrs.length

	const currAttrs = getJSONPathArr(currPath) || []
	const currLen = currAttrs.length

	if (currLen > pickedLen) return 0

	for (let i = 0; i < currLen; i++) {
		let isInPath: boolean

		if (currAttrs[i] === pickedAttrs[i] || pickedAttrs[i] === '*') {
			isInPath = true
		} else {
			isInPath = false
		}

		if (!isInPath) return other
	}

	return currLen === pickedLen ? self : ancestor
}

/* -x-x-x-x- Helper functions to render JSON -x-x-x-x- */

// ----------------------- Types -----------------------

type RemainingJSON = JSONValue | Record<string, JSONValue>

interface RenderParams {
	classes: Classes
	pickedPath: string
	isLastItem?: boolean
	currPath: string
	onChange: (pickedPath: string) => void
	remainingJSON: RemainingJSON
}

enum Types {
	array = 'array',
	boolean = 'boolean',
	null = 'null',
	number = 'number',
	object = 'object',
	string = 'string'
}

// -----------------------------------------------------

const renderComma = ({
	classes,
	isLastItem
}: Pick<RenderParams, 'classes' | 'isLastItem'>): ReactNode =>
	isLastItem ? <></> : renderPunctuation(',', classes)

const renderPunctuation = (
	punctuation: string,
	classes: RenderParams['classes']
): ReactNode => <span className={classes.punctuation}>{punctuation}</span>

const renderArray = ({
	classes,
	isLastItem,
	onChange,
	pickedPath,
	currPath,
	remainingJSON
}: RenderParams): ReactNode => {
	const arr = remainingJSON as Record<string, JSONValue>[]
	const relation = getPathRelationship(currPath, pickedPath)

	const pickedItemClasses = cn({
		[classes.pickedItem]: relation === Relationship.self
	})

	return (
		<>
			{arr.length === 0 ? (
				<span className={pickedItemClasses}>
					{renderPunctuation('[', classes)}
					{renderPunctuation(']', classes)}
					{renderComma({ classes, isLastItem })}
				</span>
			) : (
				<>
					<span>{renderPunctuation('[', classes)}</span>
					<ol>
						{arr.map((item, i) => (
							<li className={pickedItemClasses} key={i}>
								{recursiveRender({
									classes,
									currPath: `${currPath}[${i}]`,
									isLastItem: arr.length - 1 === i,
									onChange,
									pickedPath,
									remainingJSON: item
								})}
							</li>
						))}
					</ol>
					<span>
						{renderPunctuation(']', classes)}
						{renderComma({ classes, isLastItem })}
					</span>
				</>
			)}
		</>
	)
}

const renderObject = ({
	classes,
	isLastItem,
	onChange,
	pickedPath,
	remainingJSON,
	currPath
}: RenderParams): ReactNode => {
	const json = remainingJSON as Record<string, JSONValue>
	const remainingKeys = Object.keys(json)

	const relation = getPathRelationship(currPath, pickedPath)

	const pickedItemClasses = cn({
		[classes.pickedItem]: relation === Relationship.self
	})

	return isEmpty(json) ? (
		<span className={pickedItemClasses}>
			{renderPunctuation('{', classes)}
			{renderPunctuation('}', classes)}
			{renderComma({ classes, isLastItem })}
		</span>
	) : (
		<>
			{renderPunctuation('{', classes)}
			<ul>
				{remainingKeys.map((key, i) => (
					<li className={pickedItemClasses} key={i}>
						<span
							className={classes.property}
							onClick={() => onChange(`${currPath}.${key}`)}
						>{`"${key}"`}</span>
						<span className={classes.operator}>:</span>
						{recursiveRender({
							classes,
							currPath: `${currPath}.${key}`,
							isLastItem: remainingKeys.length - 1 === i,
							onChange,
							pickedPath,
							remainingJSON: json[key]
						})}
					</li>
				))}
			</ul>
			<span>
				{renderPunctuation('}', classes)}
				{renderComma({ classes, isLastItem })}
			</span>
		</>
	)
}

interface RenderPrimitiveParams extends RenderParams {
	type: Types.boolean | Types.number | Types.null
}
const renderPrimitive = ({
	classes,
	pickedPath,
	remainingJSON,
	isLastItem,
	currPath,
	type
}: RenderPrimitiveParams): ReactNode => {
	const relation = getPathRelationship(currPath, pickedPath)

	const pickedItemClasses = cn({
		[classes[type]]: true,
		[classes.pickedItem]: relation === Relationship.self
	})

	return (
		<>
			<span className={pickedItemClasses}>
				{JSON.stringify(remainingJSON)}
			</span>
			{renderComma({ classes, isLastItem })}
		</>
	)
}

const renderString = ({
	classes,
	pickedPath,
	remainingJSON,
	isLastItem,
	currPath
}: RenderParams): ReactNode => {
	const relation = getPathRelationship(currPath, pickedPath)

	const pickedItemClasses = cn({
		[classes.string]: true,
		[classes.pickedItem]: relation === Relationship.self
	})

	return (
		<>
			<span className={pickedItemClasses}>{`"${remainingJSON}"`}</span>
			{renderComma({ classes, isLastItem })}
		</>
	)
}

// -------------------------------------------------

const mappedTypesToRenderFns = {
	[Types.array]: renderArray,
	[Types.boolean]: (params: RenderParams) =>
		renderPrimitive({ ...params, type: Types.boolean }),
	[Types.null]: (params: RenderParams) =>
		renderPrimitive({ ...params, type: Types.null }),
	[Types.number]: (params: RenderParams) =>
		renderPrimitive({ ...params, type: Types.number }),
	[Types.object]: renderObject,
	[Types.string]: renderString
}

const getRemainingJSONType = (remainingJSON: RemainingJSON) => {
	if (isNull(remainingJSON)) return Types.null
	else if (Array.isArray(remainingJSON)) return Types.array
	else {
		const type = typeof remainingJSON

		switch (type) {
			case 'number':
			case 'bigint':
				return Types.number
			case 'object':
				return Types.object
			case 'string':
				return Types.string
			case 'boolean':
				return Types.boolean
			default:
				return Types.null
		}
	}
}

export const recursiveRender = ({
	classes,
	pickedPath,
	isLastItem,
	currPath,
	onChange,
	remainingJSON
}: RenderParams): ReactNode =>
	mappedTypesToRenderFns[getRemainingJSONType(remainingJSON)]({
		classes,
		currPath,
		isLastItem,
		onChange,
		pickedPath,
		remainingJSON
	})

// -x-x-x-x--x-x-x-x--x-x-x-x--x-x-x-x--x-x-x-x-
