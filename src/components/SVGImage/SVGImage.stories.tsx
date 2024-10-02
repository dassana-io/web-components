import React from 'react'
import { ThemeType } from '../assets/styles'
import { type Meta, type StoryFn } from '@storybook/react'
import { SVGImage, type SVGImageProps } from './index'
import svgImageMap, { ImageTypes } from './fixtures/mockSVGImageMap'

export default {
	argTypes: {
		imageMap: { control: { disable: true } },
		theme: { control: { disable: true } },
		type: {
			control: { options: Object.keys(svgImageMap), type: 'select' }
		}
	},
	component: SVGImage,
	title: 'SVGImage'
} as Meta

const Template: StoryFn<SVGImageProps<ImageTypes>> = args => (
	<SVGImage {...args} />
)

export const Default = Template.bind({})

Default.args = {
	imageMap: svgImageMap,
	theme: ThemeType.dark,
	type: ImageTypes.aws
}
