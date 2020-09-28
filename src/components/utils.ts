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
export const getRgba = ([r, g, b]: number[], a: number) =>
	`rgba(${r} ,${g} ,${b} ,${a})`

export const darkenColor = (color: string, darkenPercent: number) => {
	if (darkenPercent < 0 || darkenPercent > 100)
		throw new Error('please provide a valid percentage')

	return Color(color)
		.darken(darkenPercent / 100)
		.hex()
}

export const lightenColor = (color: string, lightenPercent: number) => {
	if (lightenPercent < 0 || lightenPercent > 100)
		throw new Error('please provide a valid percentage')

	return Color(color)
		.lighten(lightenPercent / 100)
		.hex()
}

export const fadeColor = (color: string, fadePercent: number) => {
	if (fadePercent < 0 || fadePercent > 100)
		throw new Error('please provide a valid percentage')

	const fadedColor = Color(color).fade(fadePercent / 100)

	return getRgba(fadedColor.rgb().array(), fadedColor.alpha())
}
