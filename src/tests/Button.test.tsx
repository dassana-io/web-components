import { render } from '@testing-library/react'
import React from 'react'
import { DefaultButton } from '../stories/Button.stories'

describe('<DefaultButton />', () => {
	it('renders', () => {
		const tree = render(<DefaultButton />)
		expect(tree).toMatchSnapshot
	})
})
