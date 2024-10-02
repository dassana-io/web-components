import { images } from './_fixtures_/image-data'
import React from 'react'
import { Carousel, type CarouselProps } from '.'
import { type Meta, type StoryFn } from '@storybook/react'

export default {
	argTypes: {
		autoplayInterval: { control: 'number' },
		bulletClasses: { control: 'object' },
		containerClasses: { control: 'object' },
		imageClasses: { control: 'object' },
		titleClasses: { control: 'object' }
	},
	args: {
		images
	},
	component: Carousel,
	parameters: {
		storyshots: { disable: true }
	},
	title: 'Carousel'
} as Meta

const CarouselTemplate: StoryFn<CarouselProps> = args => <Carousel {...args} />

export const SimpleCarousel = CarouselTemplate.bind({})
