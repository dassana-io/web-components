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
	nextPath?: string
	onClick: (e: any) => void
	remainingJSON: JSONValue | Record<string, JSONValue>
}

const getPathArr = (path = ''): string[] =>
	path.match(/(\..+?)|(\[.+?\])/g) || []

const renderPicker = ({
	classes,
	nextPath
}: Pick<RenderParams, 'classes' | 'nextPath'>): ReactNode => (
	// <span className={classes.pathPickerIcon} data-json-path={nextPath}></span>
	<></>
)

const renderArray = ({
	classes,
	isLastItem,
	onClick,
	pickedPath,
	nextPath,
	remainingJSON
}: RenderParams): ReactNode => {
	const arr = remainingJSON as Record<string, JSONValue>[]

	return (
		<>
			{renderPicker({ classes, nextPath })}
			{arr.length === 0 ? (
				<span>
					{'[ ]'}
					{isLastItem ? '' : ','}
				</span>
			) : (
				<>
					<span>{'['}</span>
					<ol className={classes.list}>
						{arr.map((item, i) => (
							<li key={i}>
								{recursiveRender({
									classes,
									isLastItem: arr.length - 1 === i,
									nextPath: `${nextPath}[${i}]`,
									onClick,
									pickedPath,
									remainingJSON: item
								})}
							</li>
						))}
					</ol>
					<span>
						{']'}
						{isLastItem ? '' : ','}
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
	nextPath
}: RenderParams): ReactNode => (
	<>
		{renderPicker({ classes, nextPath })}
		<span>
			{Types.undefined}
			{isLastItem ? '' : ','}
		</span>
	</>
)

const renderPrimitive = ({
	classes,
	pickedPath,
	remainingJSON,
	isLastItem,
	nextPath
}: RenderParams): ReactNode => (
	<>
		{renderPicker({ classes, nextPath })}
		<span>
			{JSON.stringify(remainingJSON)}
			{isLastItem ? '' : ','}
		</span>
	</>
)

const renderString = ({
	classes,
	pickedPath,
	remainingJSON,
	isLastItem,
	nextPath
}: RenderParams): ReactNode => (
	<>
		{renderPicker({ classes, nextPath })}
		<span>
			{`"${remainingJSON}"`}
			{isLastItem ? '' : ','}
		</span>
	</>
)

const renderObject = ({
	classes,
	isLastItem,
	onClick,
	pickedPath,
	remainingJSON,
	nextPath
}: RenderParams): ReactNode => {
	const json = remainingJSON as Record<string, JSONValue>
	const remainingKeys = Object.keys(json)

	return (
		<>
			{renderPicker({ classes, nextPath })}
			<span>{'{'}</span>
			<ul className={classes.list}>
				{remainingKeys.map((key, i) => (
					<li key={i}>
						<span
							data-json-path={`${nextPath}.${key}`}
							onClick={onClick}
						>{`"${key}"`}</span>
						<span> : </span>
						{recursiveRender({
							classes,
							isLastItem: remainingKeys.length - 1 === i,
							nextPath: `${nextPath}.${key}`,
							onClick,
							pickedPath,
							remainingJSON: json[key]
						})}
					</li>
				))}
			</ul>
			<span>
				{'}'}
				{isLastItem ? '' : ','}
			</span>
		</>
	)
}

const mappedTypesToRenderFns = {
	[Types.array]: renderArray,
	[Types.boolean]: renderPrimitive,
	[Types.null]: renderPrimitive,
	[Types.number]: renderPrimitive,
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
	nextPath,
	onClick,
	remainingJSON
}: RenderParams): ReactNode =>
	mappedTypesToRenderFns[getRemainingJSONType(remainingJSON)]({
		classes,
		isLastItem,
		nextPath,
		onClick,
		pickedPath,
		remainingJSON
	})
