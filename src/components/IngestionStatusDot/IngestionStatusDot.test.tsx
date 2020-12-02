import React from 'react'
import { IngestionStatusDot, Status } from '.'
import { mount, ReactWrapper } from 'enzyme'

let wrapper: ReactWrapper

describe('IngestionStatusDot', () => {
	beforeEach(() => {
		wrapper = mount(<IngestionStatusDot status={Status.HASISSUES} />)
	})

	it('renders', () => {
		expect(wrapper).toHaveLength(1)
	})

	it('has correct conditional classnames', () => {
		expect(wrapper.find('span').hasClass(/hasIssues-*/)).toBeTruthy()

		wrapper = mount(<IngestionStatusDot status={Status.NEEDSCONFIG} />)

		expect(wrapper.find('span').hasClass(/needsConfig-*/)).toBeTruthy()
	})
})
