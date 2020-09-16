import { Select as AntDSelect } from 'antd'
import Icon from '../Icon'
import IconsMap from '../Icon/IconsMap'
import React from 'react'
import Select from './index'
import Skeleton from '../Skeleton'
import { basicOptions, iconOptions } from './fixtures/sample_options'
import { mount, ReactWrapper, shallow } from 'enzyme'

let wrapper: ReactWrapper

beforeEach(() => {
	wrapper = mount(<Select options={basicOptions} />)
})

describe('Select', () => {
	it('renders', () => {
		const select = wrapper.find(Select)

		expect(select).toHaveLength(1)
	})

	it('throws an error if value is passed without an onClick', () => {
		expect(() =>
			shallow(<Select options={iconOptions} value='aws' />)
		).toThrow()
	})

	it('should pass onChange and value to the input component if the props exist', () => {
		const mockOnChange = jest.fn()
		wrapper = mount(
			<Select onChange={mockOnChange} options={iconOptions} value='aws' />
		)

		expect(wrapper.find(AntDSelect).props().onChange).toEqual(mockOnChange)
		expect(wrapper.find(AntDSelect).props().value).toEqual('aws')
	})

	it('correctly passes the disabled prop', () => {
		wrapper = mount(<Select disabled options={basicOptions} />)

		expect(wrapper.find(AntDSelect).props().disabled).toBeTruthy()
	})

	it('correctly passes the placeholder prop', () => {
		wrapper = mount(<Select options={basicOptions} placeholder='Testing' />)

		expect(wrapper.find(AntDSelect).props().placeholder).toEqual('Testing')
	})

	describe('loading', () => {
		it('renders a loading skeleton', () => {
			wrapper = mount(<Select loading options={basicOptions} />)

			expect(wrapper.find(Skeleton)).toHaveLength(1)
		})
	})

	describe('fullWidth', () => {
		beforeEach(() => {
			// Mounting to document.body throws a React error, so create a temporary container div for the tests to mount the element to
			const div = document.createElement('div')
			div.setAttribute('id', 'container')
			document.body.appendChild(div)
		})

		afterEach(() => {
			const div = document.getElementById('container')

			if (div) {
				document.body.removeChild(div)
			}
		})

		it('renders a container that will span the width of its parent container if set to true', () => {
			wrapper = mount(<Select fullWidth options={basicOptions} />, {
				attachTo: document.getElementById('container')
			})

			const style = window.getComputedStyle(wrapper.getDOMNode())

			expect(style.width).toEqual('100%')
		})

		it('does not render a container that will span the width of its parent container by default', () => {
			wrapper = mount(<Select options={basicOptions} />, {
				attachTo: document.getElementById('container')
			})

			const style = window.getComputedStyle(wrapper.getDOMNode())

			expect(style.width).not.toEqual('100%')
		})
	})

	describe('error', () => {
		it('passes the correct error class to select', () => {
			wrapper = mount(<Select error options={iconOptions} />)

			expect(wrapper.find(AntDSelect).hasClass(/error-*/)).toBeTruthy()
		})
	})

	describe('icon', () => {
		it('should render an icon for the option if it is passed in', () => {
			const select = mount(<Select options={iconOptions} />)

			select.find('.ant-select-selector').simulate('mousedown')
			select.update()

			expect(select.find(Icon).length).toBe(iconOptions.length)
		})

		it('should only render icons if an icon key is passed', () => {
			const select = mount(
				<Select
					options={[
						...iconOptions,
						{ text: 'Dassana', value: 'dassana' }
					]}
				/>
			)

			select.find('.ant-select-selector').simulate('mousedown')
			select.update()

			expect(select.find(Icon).length).toBe(iconOptions.length)
		})

		it('should render icons with the iconMap if one is provided', () => {
			const select = mount(
				<Select
					options={iconOptions}
					optionsConfig={{ iconMap: IconsMap }}
				/>
			)

			select.find('.ant-select-selector').simulate('mousedown')
			select.update()

			const iconProps = select.find(Icon).first().props()

			expect(iconProps).toHaveProperty('icon')
			expect(iconProps).not.toHaveProperty('iconKey')
			expect(select.find(Icon).length).toBe(iconOptions.length)
		})
	})

	describe('search', () => {
		beforeEach(() => {
			wrapper = mount(<Select options={iconOptions} showSearch />)
		})

		it('should render an input as a search bar if search is enabled', () => {
			expect(wrapper.find('input')).toHaveLength(1)
		})

		it('should filter down the select options', () => {
			wrapper.find('.ant-select-selector').simulate('mousedown')

			expect(wrapper.find('.ant-select-item-option').length).toBe(
				iconOptions.length
			)

			wrapper
				.find('input')
				.simulate('change', { target: { value: 'aws' } })
			wrapper.update()

			expect(wrapper.find('.ant-select-item-option').length).toBe(1)
		})
	})
})
