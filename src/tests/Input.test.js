import { render } from '@testing-library/react'
import React from 'react'
import { DefaultInput } from '../stories/Input.stories'

describe('<DefaultInput />', () => {
	it('renders', () => {
		const tree = render(<DefaultInput />)
		expect(tree).toMatchSnapshot
	})
})
