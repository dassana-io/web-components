import { type Classes } from './styles'
import cn from 'classnames'
import { getJSONPathArr } from 'components/utils'
import isEmpty from 'lodash/isEmpty'
import isNull from 'lodash/isNull'
import { type JSONValue } from '.'
import React, { type ReactNode } from 'react'

enum Relationship {
	other,
	self,
	ancestor
}

const { other, self, ancestor } = Relationship
/**
 * Gets the relationship between current path and the picked path
 * @returns { Relationship } - Can either be "other", "self" or "ancestor"
 */
const getPathRelationship = (
	currPath: string,
	pickedPath: string
): Relationship => {
	if (!pickedPath) return other

	const pickedAttrs = getJSONPathArr(pickedPath)
	const pickedLen = pickedAttrs.length

	const currAttrs = getJSONPathArr(currPath)
	const currLen = currAttrs.length

	if (currLen > pickedLen) return other

	for (let i = 0; i < currLen; i++) {
		const isInPath =
			currAttrs[i] === pickedAttrs[i] || pickedAttrs[i] === '*'

		if (!isInPath) return other
	}

	return currLen === pickedLen ? self : ancestor
}

/* -x-x-x-x- Helper functions to render JSON -x-x-x-x- */

// ----------------------- Types -----------------------

type RemainingJSON = JSONValue | Record<string, JSONValue>

interface RenderParams {
	classes: Classes
	disableKeyClick?: boolean
	pickedPath: string
	isLastItem?: boolean
	currPath: string
	onChange: (pickedPath: string) => void
	remainingJSON: RemainingJSON
}

export enum JSONDataTypes {
	array = 'array',
	boolean = 'boolean',
	null = 'null',
	number = 'number',
	object = 'object',
	string = 'string'
}

const { array, boolean, null: nullType, number, object, string } = JSONDataTypes

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
	const arr = remainingJSON as Array<Record<string, JSONValue>>
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
	disableKeyClick,
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
							onClick={() =>
								!disableKeyClick &&
								onChange(`${currPath}.${key}`)
							}
						>
							{`"${key}"`}
						</span>
						<span className={classes.operator}>:</span>
						{recursiveRender({
							classes,
							currPath: `${currPath}.${key}`,
							disableKeyClick,
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
	type: JSONDataTypes.boolean | JSONDataTypes.number | JSONDataTypes.null
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
	[array]: renderArray,
	[boolean]: (params: RenderParams) =>
		renderPrimitive({ ...params, type: boolean }),
	[nullType]: (params: RenderParams) =>
		renderPrimitive({ ...params, type: nullType }),
	[number]: (params: RenderParams) =>
		renderPrimitive({ ...params, type: number }),
	[object]: renderObject,
	[string]: renderString
}

export const getJSONValueType = (json: RemainingJSON) => {
	if (isNull(json)) {
		return nullType
	} else if (Array.isArray(json)) {
		return array
	} else {
		const type = typeof json

		switch (type) {
			case 'number':
			case 'bigint':
				return number
			case 'object':
				return object
			case 'string':
				return string
			case 'boolean':
				return boolean
			default:
				return nullType
		}
	}
}

export const recursiveRender = ({
	classes,
	disableKeyClick,
	pickedPath,
	isLastItem,
	currPath,
	onChange,
	remainingJSON
}: RenderParams): ReactNode =>
	mappedTypesToRenderFns[getJSONValueType(remainingJSON)]({
		classes,
		currPath,
		disableKeyClick,
		isLastItem,
		onChange,
		pickedPath,
		remainingJSON
	})

/* -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x- */
