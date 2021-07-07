import { images } from './_fixtures_/image-data'
import React from 'react'
import Carousel, { CarouselProps } from '.'
import { Meta, Story } from '@storybook/react'

export default {
	argTypes: {
		autoplayInterval: { control: 'number' },
		bulletClasses: { control: 'array' },
		containerClasses: { control: 'array' },
		imageClasses: { control: 'array' },
		titleClasses: { control: 'array' }
	},
	args: {
		images
	},
	component: Carousel,
	title: 'Carousel'
} as Meta

const CarouselTemplate: Story<CarouselProps> = args => <Carousel {...args} />

export const SimpleCarousel = CarouselTemplate.bind({})
