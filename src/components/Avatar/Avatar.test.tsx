import React from 'react'
import { Avatar, AvatarProps } from '.'
import { render, screen } from '@testing-library/react'

describe('Avatar', () => {
	it('renders', () => {
		render(<Avatar>A</Avatar>)

		expect(screen.getByText('A')).toBeTruthy()
	})
})
