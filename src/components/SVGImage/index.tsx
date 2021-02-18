import { ThemeType } from '../assets/styles/themes'
import React, { FunctionComponent, SVGProps } from 'react'

type ImagePropKey = string | number | symbol

export type ImageMapProps<T extends ImagePropKey> = Record<
	T,
	Record<ThemeType, FunctionComponent<SVGProps<SVGSVGElement>>>
>

export interface SVGImageProps<T extends ImagePropKey> {
	height?: number | string
	imageMap: ImageMapProps<T>
	theme: ThemeType
	type: T
	width?: number | string
}

export type ImageProps<T extends ImagePropKey> = Pick<
	SVGImageProps<T>,
	'height' | 'width'
>

export const SVGImage = <T extends ImagePropKey>({
	height = '100%',
	imageMap,
	theme,
	type,
	width = '100%'
}: SVGImageProps<T>) => {
	const Image = imageMap[type][theme]

	return <Image height={height} width={width} />
}
