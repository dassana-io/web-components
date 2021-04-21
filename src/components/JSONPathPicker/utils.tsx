import { Classes } from './styles'
import isNull from 'lodash/isNull'
import { JSONValue } from '.'
import React, { ReactNode } from 'react'

enum Types {
	array = 'array',
	boolean = 'boolean',
	null = 'null',
	number = 'number',
	object = 'object',
	string = 'string'
}

type RemainingJSON = JSONValue | Record<string, JSONValue>

interface RenderParams {
	classes: Classes
	pickedPath: string
	isLastItem?: boolean
	currPath?: string
	onChange: (pickedPath: string) => void
	remainingJSON: JSONValue | Record<string, JSONValue>
}

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

	return (
		<>
			{arr.length === 0 ? (
				<span>
					{renderPunctuation('[', classes)}
					{renderPunctuation(']', classes)}
					{renderComma({ classes, isLastItem })}
				</span>
			) : (
				<>
					<span>{renderPunctuation('[', classes)}</span>
					<ol className={classes.list}>
						{arr.map((item, i) => (
							<li key={i}>
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
}: RenderPrimitiveParams): ReactNode => (
	<>
		<span className={classes[type]}>
			{JSON.stringify(remainingJSON)}
			{renderComma({ classes, isLastItem })}
		</span>
	</>
)

const renderString = ({
	classes,
	pickedPath,
	remainingJSON,
	isLastItem,
	currPath
}: RenderParams): ReactNode => (
	<>
		<span className={classes.string}>
			{`"${remainingJSON}"`}
			{renderComma({ classes, isLastItem })}
		</span>
	</>
)

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

	return (
		<>
			{renderPunctuation('{', classes)}
			<ul className={classes.list}>
				{remainingKeys.map((key, i) => (
					<li key={i}>
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

		if (Object.values(Types).includes(type as Types)) return type as Types
	}
	return Types.null
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
