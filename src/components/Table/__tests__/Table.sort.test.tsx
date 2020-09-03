import React from 'react'
import mockData0, { Person } from '../fixtures/0_sample_data'
import mockData2, { Client } from '../fixtures/2_sample_data'
import mockData3, { Client1 } from '../fixtures/3_sample_data'
import { mount, ReactWrapper } from 'enzyme'
import Table, { TableProps } from '..'

/* Helper functions */
function createTable<DataType>(tableProps: TableProps<DataType>) {
	return (
		<div>
			<Table<DataType> {...tableProps} />
		</div>
	)
}

function renderedData(wrapper: ReactWrapper, dataIndex: string) {
	// @ts-ignore
	return wrapper.find('BodyRow').map(row => row.props().record[dataIndex])
}

type ObjectType = object | undefined

function compareArrsOfObjs(arr1: ObjectType[], arr2: ObjectType[]) {
	arr1.forEach((obj1, i) => {
		obj1 === undefined
			? expect(obj1).toEqual(arr2[i])
			: expect(obj1).toMatchObject(arr2[i] as object)
	})
}

function createDataCopy<DataType>(tableProps: TableProps<DataType>) {
	return JSON.parse(JSON.stringify(tableProps))
}

// ---------x---------x---------x---------x---------
/* Tests */
describe('Table sort: Column type - "string', () => {
	let wrapper: ReactWrapper

	beforeEach(() => {
		wrapper = mount(createTable<Person>(mockData0))
	})

	afterEach(() => {
		wrapper.unmount()
	})
	it('allows sorting by default', () => {
		const sorter = wrapper.find('thead').find('th').first()
		expect(sorter).toHaveLength(1)
		expect(sorter.text()).toEqual('Name')
		expect(sorter.hasClass('ant-table-column-has-sorters')).toEqual(true)
	})

	it('does not allow sorting if column sort is set to false', () => {
		const mockData = { ...createDataCopy(mockData0) }
		mockData.columns[0].sort = false
		wrapper = mount(createTable<Person>(mockData))

		const sorter = wrapper.find('thead').find('th').first()
		expect(sorter).toHaveLength(1)
		expect(sorter.text()).toEqual('Name')
		expect(sorter.hasClass('ant-table-column-has-sorters')).toEqual(false)
	})

	it('sorts columns in correct ascending and correct descending order', () => {
		const sorter = wrapper.find('.ant-table-column-has-sorters').first()
		// ascending order
		sorter.simulate('click')
		expect(renderedData(wrapper, 'name')).toEqual([
			'Amet',
			'Dolor',
			'Ipsum',
			'Lorem'
		])

		// descending order
		sorter.simulate('click')
		expect(renderedData(wrapper, 'name')).toEqual([
			'Lorem',
			'Ipsum',
			'Dolor',
			'Amet'
		])
	})

	it('sorts columns with missing cells in correct ascending and correct descending order', () => {
		wrapper = mount(createTable<Client1>(mockData3))

		const sorter = wrapper.find('.ant-table-column-has-sorters').first()
		// ascending order
		sorter.simulate('click')
		expect(renderedData(wrapper, 'name')).toEqual([
			undefined,
			'Amet Consectetur',
			'Duis Irure',
			'Lorem Ipsum'
		])

		// descending order
		sorter.simulate('click')
		expect(renderedData(wrapper, 'name')).toEqual([
			'Lorem Ipsum',
			'Duis Irure',
			'Amet Consectetur',
			undefined
		])
	})
})

describe('Table sort: Column type - "number', () => {
	let wrapper: ReactWrapper

	beforeEach(() => {
		wrapper = mount(createTable<Person>(mockData0))
	})

	afterEach(() => {
		wrapper.unmount()
	})
	it('allows sorting by default', () => {
		const sorter = wrapper.find('thead').find('th').at(1)
		expect(sorter).toHaveLength(1)
		expect(sorter.text()).toEqual('Age')
		expect(sorter.hasClass('ant-table-column-has-sorters')).toEqual(true)
	})

	it('does not allow sorting if column sort is set to false', () => {
		const mockData = { ...createDataCopy(mockData0) }
		mockData.columns[1].sort = false
		wrapper = mount(createTable<Person>(mockData))

		const sorter = wrapper.find('thead').find('th').at(1)
		expect(sorter).toHaveLength(1)
		expect(sorter.text()).toEqual('Age')
		expect(sorter.hasClass('ant-table-column-has-sorters')).toEqual(false)
	})

	it('sorts columns in correct ascending and correct descending order', () => {
		const sorter = wrapper.find('.ant-table-column-has-sorters').at(1)
		expect(sorter.text()).toEqual('Age')
		// ascending order
		sorter.simulate('click')
		expect(renderedData(wrapper, 'age')).toEqual([22, 32, 36, 45])

		// descending order
		sorter.simulate('click')
		expect(renderedData(wrapper, 'age')).toEqual([45, 36, 32, 22])
	})

	it('sorts columns with missing cells in correct ascending and correct descending order', () => {
		wrapper = mount(createTable<Client1>(mockData3))
		const sorter = wrapper.find('thead').find('th').at(1)
		expect(sorter.text()).toEqual('Client Since')
		// ascending order
		sorter.simulate('click')
		expect(renderedData(wrapper, 'start_date')).toEqual([
			undefined,
			1519782342212,
			1531932342212,
			1553932342212
		])

		// descending order
		sorter.simulate('click')
		expect(renderedData(wrapper, 'start_date')).toEqual([
			1553932342212,
			1531932342212,
			1519782342212,
			undefined
		])
	})
})

describe('Table sort: Column type - "component", format - "tag', () => {
	let wrapper: ReactWrapper

	beforeEach(() => {
		wrapper = mount(createTable<Client>(mockData2))
	})

	afterEach(() => {
		wrapper.unmount()
	})
	it('allows sorting by default', () => {
		const sorter = wrapper.find('thead').find('th').at(2)
		expect(sorter).toHaveLength(1)
		expect(sorter.text()).toEqual('Role')
		expect(sorter.hasClass('ant-table-column-has-sorters')).toEqual(true)
	})

	it('does not allow sorting if column sort is set to false', () => {
		const mockData = { ...createDataCopy(mockData2) }
		mockData.columns[2].sort = false
		wrapper = mount(createTable<Person>(mockData))

		const sorter = wrapper.find('thead').find('th').at(2)
		expect(sorter.text()).toEqual('Role')
		expect(sorter).toHaveLength(1)
		expect(sorter.hasClass('ant-table-column-has-sorters')).toEqual(false)
	})

	it('sorts columns in correct ascending and correct descending order', () => {
		const sorter = wrapper.find('.ant-table-column-has-sorters').at(2)

		// ascending order
		sorter.simulate('click')
		const sorted = renderedData(wrapper, 'role')
		const expected = [
			{ color: 'purple', name: 'Business Development' },
			{ color: 'blue', name: 'CEO' },
			{ color: 'green', name: 'Designer' },
			{ color: 'magenta', name: 'Software Engineer' }
		]
		compareArrsOfObjs(sorted, expected)

		// descending order
		sorter.simulate('click')
		const sorted1 = renderedData(wrapper, 'role')
		const expected1 = [
			{ color: 'magenta', name: 'Software Engineer' },
			{ color: 'green', name: 'Designer' },
			{ color: 'blue', name: 'CEO' },
			{ color: 'purple', name: 'Business Development' }
		]
		compareArrsOfObjs(sorted1, expected1)
	})

	it('sorts columns with missing cells in correct ascending and correct descending order', () => {
		wrapper = mount(createTable<Client1>(mockData3))
		const sorter = wrapper.find('thead').find('th').at(2)
		// ascending order
		sorter.simulate('click')
		const sorted = renderedData(wrapper, 'role')

		const expected = [
			undefined,
			{ color: 'purple', name: 'Business Development' },
			{ color: 'blue', name: 'CEO' },
			{ color: 'magenta', name: 'Software Engineer' }
		]
		compareArrsOfObjs(sorted, expected)

		// descending order
		sorter.simulate('click')
		const sorted1 = renderedData(wrapper, 'role')
		const expected1 = [
			{ color: 'magenta', name: 'Software Engineer' },
			{ color: 'blue', name: 'CEO' },
			{ color: 'purple', name: 'Business Development' },
			undefined
		]

		compareArrsOfObjs(sorted1, expected1)
	})
})

describe('Table sort: Column type - "component", format - "link', () => {
	let wrapper: ReactWrapper

	beforeEach(() => {
		wrapper = mount(createTable<Client>(mockData2))
	})

	afterEach(() => {
		wrapper.unmount()
	})
	it('allows sorting by default', () => {
		const sorter = wrapper.find('thead').find('th').at(3)
		expect(sorter).toHaveLength(1)
		expect(sorter.text()).toEqual('LinkedIn')
		expect(sorter.hasClass('ant-table-column-has-sorters')).toEqual(true)
	})

	it('does not allow sorting if column sort is set to false', () => {
		const mockData = { ...createDataCopy(mockData2) }
		mockData.columns[3].sort = false
		wrapper = mount(createTable<Person>(mockData))

		const sorter = wrapper.find('thead').find('th').at(3)
		expect(sorter.text()).toEqual('LinkedIn')
		expect(sorter).toHaveLength(1)
		expect(sorter.hasClass('ant-table-column-has-sorters')).toEqual(false)
	})

	it('sorts columns in correct ascending and correct descending order', () => {
		const sorter = wrapper.find('.ant-table-column-has-sorters').at(3)

		// ascending order
		sorter.simulate('click')
		expect(renderedData(wrapper, 'linked_in')).toEqual([
			'/in/amet-c',
			'/in/dolor-s',
			'/in/duis-irure',
			'/in/lorem-i'
		])

		// descending order
		sorter.simulate('click')
		expect(renderedData(wrapper, 'linked_in')).toEqual([
			'/in/lorem-i',
			'/in/duis-irure',
			'/in/dolor-s',
			'/in/amet-c'
		])
	})

	it('sorts columns with missing cells in correct ascending and correct descending order', () => {
		wrapper = mount(createTable<Client1>(mockData3))
		const sorter = wrapper.find('thead').find('th').at(3)

		// ascending order
		sorter.simulate('click')
		expect(renderedData(wrapper, 'linked_in')).toEqual([
			undefined,
			'/in/amet-c',
			'/in/duis-irure',
			'/in/lorem-i'
		])

		// descending order
		sorter.simulate('click')
		expect(renderedData(wrapper, 'linked_in')).toEqual([
			'/in/lorem-i',
			'/in/duis-irure',
			'/in/amet-c',
			undefined
		])
	})
})

describe('Table sort: Column type - "component", format - "toggle', () => {
	let wrapper: ReactWrapper

	beforeEach(() => {
		wrapper = mount(createTable<Client>(mockData2))
	})

	afterEach(() => {
		wrapper.unmount()
	})
	it('allows sorting by default', () => {
		const sorter = wrapper.find('thead').find('th').at(4)
		expect(sorter).toHaveLength(1)
		expect(sorter.text()).toEqual('Has Admin Access')
		expect(sorter.hasClass('ant-table-column-has-sorters')).toEqual(true)
	})

	it('does not allow sorting if column sort is set to false', () => {
		const mockData = { ...createDataCopy(mockData2) }
		mockData.columns[4].sort = false
		wrapper = mount(createTable<Person>(mockData))

		const sorter = wrapper.find('thead').find('th').at(4)
		expect(sorter.text()).toEqual('Has Admin Access')
		expect(sorter).toHaveLength(1)
		expect(sorter.hasClass('ant-table-column-has-sorters')).toEqual(false)
	})

	it('sorts columns in correct ascending and correct descending order', () => {
		const sorter = wrapper.find('.ant-table-column-has-sorters').at(4)

		// ascending order
		sorter.simulate('click')
		expect(renderedData(wrapper, 'admin_access')).toEqual([
			false,
			false,
			true,
			true
		])

		// descending order
		sorter.simulate('click')
		expect(renderedData(wrapper, 'admin_access')).toEqual([
			true,
			true,
			false,
			false
		])
	})

	it('sorts columns with missing cells in correct ascending and correct descending order', () => {
		wrapper = mount(createTable<Client1>(mockData3))
		const sorter = wrapper.find('thead').find('th').at(4)

		// ascending order
		sorter.simulate('click')
		expect(renderedData(wrapper, 'admin_access')).toEqual([
			undefined,
			undefined,
			false,
			true
		])

		// descending order
		sorter.simulate('click')
		expect(renderedData(wrapper, 'admin_access')).toEqual([
			true,
			false,
			undefined,
			undefined
		])
	})
})

describe('Table sort: Column type - "component", format - "icon', () => {
	let wrapper: ReactWrapper

	beforeEach(() => {
		wrapper = mount(createTable<Client>(mockData2))
	})

	afterEach(() => {
		wrapper.unmount()
	})
	it('allows sorting by default', () => {
		const sorter = wrapper.find('thead').find('th').at(5)
		expect(sorter).toHaveLength(1)
		expect(sorter.text()).toEqual('Company')
		expect(sorter.hasClass('ant-table-column-has-sorters')).toEqual(true)
	})

	it('does not allow sorting if column sort is set to false', () => {
		const mockData = { ...createDataCopy(mockData2) }
		mockData.columns[5].sort = false
		wrapper = mount(createTable<Person>(mockData))

		const sorter = wrapper.find('thead').find('th').at(5)
		expect(sorter.text()).toEqual('Company')
		expect(sorter).toHaveLength(1)
		expect(sorter.hasClass('ant-table-column-has-sorters')).toEqual(false)
	})

	it('sorts columns in correct ascending and correct descending order', () => {
		const sorter = wrapper.find('.ant-table-column-has-sorters').at(5)

		// ascending order
		sorter.simulate('click')

		expect(renderedData(wrapper, 'company')).toEqual([
			'aws',
			'azure',
			'dassana',
			'google-cloud'
		])

		// descending order
		sorter.simulate('click')
		expect(renderedData(wrapper, 'company')).toEqual([
			'google-cloud',
			'dassana',
			'azure',
			'aws'
		])
	})

	it('sorts columns with missing cells in correct ascending and correct descending order', () => {
		wrapper = mount(createTable<Client1>(mockData3))
		const sorter = wrapper.find('thead').find('th').at(5)

		// ascending order
		sorter.simulate('click')
		expect(renderedData(wrapper, 'company')).toEqual([
			undefined,
			'azure',
			'dassana',
			'google-cloud'
		])

		// descending order
		sorter.simulate('click')
		expect(renderedData(wrapper, 'company')).toEqual([
			'google-cloud',
			'dassana',
			'azure',
			undefined
		])
	})
})
