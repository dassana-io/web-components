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

const getRgba = (color: string, a: number) => {
	const [r, g, b] = Color(color).rgb().array()

	return `rgba(${r}, ${g}, ${b}, ${a})`
}

export enum ColorManipulationTypes {
	darken = 'darken',
	fade = 'fade',
	lighten = 'lighten'
}

export const manipulateColor = (
	color: string,
	percent: number,
	colorChangeType: ColorManipulationTypes
) => {
	if (percent < 0 || percent > 100)
		throw new Error('please provide a valid percentage')

	const clr = Color(color)

	const ratio = percent / 100

	switch (colorChangeType) {
		case ColorManipulationTypes.darken:
			return clr.darken(ratio).hex()

		case ColorManipulationTypes.fade: {
			const fadedColor = clr.fade(ratio)

			return getRgba(fadedColor.hex(), fadedColor.alpha())
		}

		case ColorManipulationTypes.lighten:
			return clr.lighten(ratio).hex()
	}
}
