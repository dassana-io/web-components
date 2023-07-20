import React from 'react'
import { type BreadcrumbConfig, Breadcrumbs } from '../index'
import { render, screen } from '@testing-library/react'

const mockOnClick = jest.fn()

const mockBreadCrumbs: BreadcrumbConfig[] = [
	{
		label: 'foo',
		onClick: mockOnClick
	},
	{
		label: 'bar'
	}
]

beforeEach(() => {
	render(<Breadcrumbs config={mockBreadCrumbs} />)
})

it('should render', () => {
	expect(screen.getByText('bar')).toBeTruthy()
})

it('should render a link with an onClick if one is provided in the config', () => {
	const link = screen.getByText('foo')

	link.click()

	expect(mockOnClick).toHaveBeenCalled()
})
