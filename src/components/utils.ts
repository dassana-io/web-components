import Color from 'color'
import { JSONPath } from 'jsonpath-plus'
import mapValues from 'lodash/mapValues'
import { PopupContainerProps } from './types'
import { TooltipPlacement } from 'antd/es/tooltip'
import { useEffect, useState } from 'react'

export const placementOptions: TooltipPlacement[] = [
	'bottom',
	'bottomLeft',
	'bottomRight',
	'left',
	'leftBottom',
	'leftTop',
	'right',
	'rightBottom',
	'rightTop',
	'top',
	'topLeft',
	'topRight'
]

export const TAG = 'data-test'

/* ------------ Utilities related to colors ------------ */

type RGB = {
	r: number
	g: number
	b: number
}

const rgbToHex = (rgb: RGB) => Color(rgb).hex()

export const getRgba = (color: string, a: number) => {
	const [r, g, b] = Color(color).rgb().array()

	return `rgba(${r}, ${g}, ${b}, ${a})`
}

const tintFormula = (colorVal: number, ratio: number) =>
	colorVal + (255 - colorVal) * ratio

const shadeFormula = (colorVal: number, ratio: number) => colorVal * (1 - ratio)

export enum ColorManipulationTypes {
	fade = 'fade',
	shade = 'shade',
	tint = 'tint'
}

export const manipulateColor = (
	color: string,
	percent: number,
	colorChangeType: ColorManipulationTypes
) => {
	if (percent < 0 || percent > 100)
		throw new Error('please provide a valid percentage')

	const clr = Color(color)
	const rgb = Color(color).rgb().object() as RGB

	const ratio = percent / 100

	switch (colorChangeType) {
		case ColorManipulationTypes.fade: {
			const fadedColor = clr.fade(ratio)

			return getRgba(fadedColor.hex(), fadedColor.alpha())
		}

		case ColorManipulationTypes.shade: {
			const shade = mapValues(rgb, value => shadeFormula(value, ratio))

			return rgbToHex(shade)
		}

		case ColorManipulationTypes.tint: {
			const shade = mapValues(rgb, value => tintFormula(value, ratio))

			return rgbToHex(shade)
		}
	}
}

/* ---------------------------------------------------- */

export const fakeApiCallSuccess: () => Promise<void> = async (
	timeoutDuration = 1000
) => await new Promise(resolve => setTimeout(resolve, timeoutDuration))

// -*-*-*-*-*- filterMap -*-*-*-*-*-
// TODO: move this into web-utils

interface FilterMapConfig<T, U> {
	filterConditionFn: (item: T) => boolean
	items: T[]
	mapFn: (item: T) => U
}

export const filterMap = <T, U>({
	filterConditionFn,
	items,
	mapFn
}: FilterMapConfig<T, U>) =>
	items.reduce((filterAndMapped: U[], item: T) => {
		if (filterConditionFn(item)) {
			filterAndMapped.push(mapFn(item))
		}

		return filterAndMapped
	}, [])

//  -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

export const generatePopupSelector = (
	popupContainerSelector: string
) => (): HTMLElement =>
	document.querySelector(popupContainerSelector) as HTMLElement

export const getDataTestAttributeProp = (
	cmpName: string,
	dataTag?: string
): { [TAG]: string } => ({
	[TAG]: dataTag ? `${cmpName}-${dataTag}` : cmpName
})

export const getJSONPathValue = (path: string, obj: Record<string, any>) => {
	const value = JSONPath({
		json: obj,
		path
	})

	if (value && Array.isArray(value)) return value[0]
}

/**
 * Takes a JSON path as string and converts to an array
 */
export const getJSONPathArr = (path: string): string[] =>
	JSONPath.toPathArray(path)

export const getPopupContainerProps = (
	popupContainerSelector = ''
): PopupContainerProps => {
	let popupContainerProps = {}

	if (popupContainerSelector) {
		popupContainerProps = {
			getPopupContainer: generatePopupSelector(popupContainerSelector)
		}
	}

	return popupContainerProps
}

// Appends a div to the document, usually for use with React portals
// Optional popup container function can be provided as an argument. Otherwise, it defaults to appending the div to document.body
export const useCreateDomElement = (
	divId: string,
	getPopupContainer: () => HTMLElement = () => document.body
) => {
	const [domElement, setDomElement] = useState<HTMLDivElement | null>(null)

	const root = getPopupContainer() || document.body

	useEffect(() => {
		const element = document.createElement('div')
		element.setAttribute('id', divId)

		root.appendChild(element)
		setDomElement(element)

		return () => {
			root.removeChild(element)
		}
	}, [divId, root])

	return domElement
}
