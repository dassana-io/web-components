import Color from 'color'
import { TooltipPlacement } from 'antd/es/tooltip'

export const TAG = 'data-test'

export const getDataTestAttributeProp = (
	cmpName: string,
	dataTag?: string
): { [TAG]: string } => ({
	[TAG]: dataTag ? `${cmpName}-${dataTag}` : cmpName
})

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

interface RGB {
	r: number
	g: number
	b: number
}

const rgbToHex = (rgb: RGB) => Color(rgb).hex()

const getRgb = (colorValue: string) => Color(colorValue).rgb().object()

const getRgba = (color: string, a: number) => {
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

/* eslint-disable sort-keys */
export const manipulateColor = (
	color: string,
	percent: number,
	colorChangeType: ColorManipulationTypes
) => {
	if (percent < 0 || percent > 100)
		throw new Error('please provide a valid percentage')

	const rgb = getRgb(color)
	const clr = Color(color)

	const ratio = percent / 100

	switch (colorChangeType) {
		case ColorManipulationTypes.fade: {
			const fadedColor = clr.fade(ratio)

			return getRgba(fadedColor.hex(), fadedColor.alpha())
		}

		case ColorManipulationTypes.shade: {
			const shade = {
				r: shadeFormula(rgb.r, ratio),
				g: shadeFormula(rgb.g, ratio),
				b: shadeFormula(rgb.b, ratio)
			}

			return rgbToHex(shade)
		}

		case ColorManipulationTypes.tint: {
			const shade = {
				r: tintFormula(rgb.r, ratio),
				g: tintFormula(rgb.g, ratio),
				b: tintFormula(rgb.b, ratio)
			}

			return rgbToHex(shade)
		}
	}
}
