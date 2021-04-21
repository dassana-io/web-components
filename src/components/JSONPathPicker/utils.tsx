import { Classes } from './styles'
import isNull from 'lodash/isNull'
import isUndefined from 'lodash/isUndefined'
import { JSONValue } from '.'
import React, { ReactNode } from 'react'

enum Types {
	array = 'array',
	boolean = 'boolean',
	null = 'null',
	number = 'number',
	object = 'object',
	string = 'string',
	undefined = 'undefined'
}

type RemainingJSON = JSONValue | Record<string, JSONValue>

interface RenderParams {
	classes: Classes
	pickedPath: string
	isLastItem?: boolean
	currPath?: string
	onClick: (e: any) => void
	remainingJSON: JSONValue | Record<string, JSONValue>
}

const getPathArr = (path = ''): string[] =>
	path.match(/(\..+?)|(\[.+?\])/g) || []

const renderComma = ({
	classes,
	isLastItem
}: Pick<RenderParams, 'classes' | 'isLastItem'>) =>
	isLastItem ? <></> : <span className={classes.punctuation}>,</span>

const renderArray = ({
	classes,
	isLastItem,
	onClick,
	pickedPath,
	currPath,
	remainingJSON
}: RenderParams): ReactNode => {
	const arr = remainingJSON as Record<string, JSONValue>[]

	return (
		<>
			{arr.length === 0 ? (
				<span>
					{'[ ]'}
					{renderComma({ classes, isLastItem })}
				</span>
			) : (
				<>
					<span>{'['}</span>
					<ol className={classes.list}>
						{arr.map((item, i) => (
							<li key={i}>
								{recursiveRender({
									classes,
									currPath: `${currPath}[${i}]`,
									isLastItem: arr.length - 1 === i,
									onClick,
									pickedPath,
									remainingJSON: item
								})}
							</li>
						))}
					</ol>
					<span>
						{']'}
						{renderComma({ classes, isLastItem })}
					</span>
				</>
			)}
		</>
	)
}

const renderUndefined = ({
	classes,
	pickedPath,
	isLastItem,
	currPath
}: RenderParams): ReactNode => (
	<>
		<span>
			{Types.undefined}
			{renderComma({ classes, isLastItem })}
		</span>
	</>
)

interface RenderPrimitive extends RenderParams {
	type: Types.boolean | Types.number | Types.null
}

const renderPrimitive = ({
	classes,
	pickedPath,
	remainingJSON,
	isLastItem,
	currPath,
	type
}: RenderPrimitive): ReactNode => (
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
	onClick,
	pickedPath,
	remainingJSON,
	currPath
}: RenderParams): ReactNode => {
	const json = remainingJSON as Record<string, JSONValue>
	const remainingKeys = Object.keys(json)

	return (
		<>
			<span>{'{'}</span>
			<ul className={classes.list}>
				{remainingKeys.map((key, i) => (
					<li key={i}>
						<span
							className={classes.property}
							data-json-path={`${currPath}.${key}`}
							onClick={onClick}
						>{`"${key}"`}</span>
						<span className={classes.operator}>:</span>
						{recursiveRender({
							classes,
							currPath: `${currPath}.${key}`,
							isLastItem: remainingKeys.length - 1 === i,
							onClick,
							pickedPath,
							remainingJSON: json[key]
						})}
					</li>
				))}
			</ul>
			<span>
				{'}'}
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

export const recursiveRender = ({
	classes,
	pickedPath,
	isLastItem,
	currPath,
	onClick,
	remainingJSON
}: RenderParams): ReactNode =>
	mappedTypesToRenderFns[getRemainingJSONType(remainingJSON)]({
		classes,
		currPath,
		isLastItem,
		onClick,
		pickedPath,
		remainingJSON
	})
