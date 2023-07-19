import { act } from 'react-dom/test-utils'
import moment from 'moment'
import React from 'react'
import { TableSkeleton } from '../TableSkeleton'
import { Input as AntDInput, Table as AntDTable } from 'antd'
import mockData, { type Data, dateFormat } from '__mocks__/table_mock_data'
import mockData0, { type Person } from '../fixtures/0_sample_data'
import mockData1, { type File } from '../fixtures/4_sample_data'
import mockData2, { type JSONPathData } from '../fixtures/7_sample_data'
import { mount, type ReactWrapper, shallow, type ShallowWrapper } from 'enzyme'
import { Table, type TableProps } from '..'

/* Helper functions */
export function createTable<Data> (tableProps: TableProps<Data>) {
	return (
		<div>
			<Table<Data> {...tableProps} />
		</div>
	)
}

export function renderedData (wrapper: ReactWrapper, dataIndex = '') {
	const bodyRow = wrapper.find('BodyRow')

	if (dataIndex) {
		// @ts-expect-error
		return bodyRow.map(row => row.props().record[dataIndex])
	} else {
		// @ts-expect-error
		return bodyRow.map(row => row.props().record)
	}
}

interface FormatDateParams {
	displayFormat?: string
	fromNow?: boolean
	unixTS: number
}

export function formatDate ({
	unixTS,
	displayFormat = '',
	fromNow = false
}: FormatDateParams) {
	return fromNow
		? moment(unixTS).fromNow()
		: moment(unixTS).format(displayFormat)
}

const mockOnRowClick = jest.fn()
let wrapper: ReactWrapper

beforeEach(() => {
	wrapper = mount(createTable<Person>(mockData0))
})

afterEach(() => {
	jest.resetAllMocks()
})

describe('Table', () => {
	it('renders', () => {
		const table = wrapper.find(Table)

		expect(table).toHaveLength(1)
	})

	it('renders table with a table header and a table body', () => {
		const table = wrapper.find(Table)
			const tableHead = table.find('thead')
			const tableBody = table.find('tbody')

		expect(tableHead).toHaveLength(1)
		expect(tableBody).toHaveLength(1)
	})

	it('renders table rows with react keys if IDs are not provided in data objects', () => {
		const table = wrapper.find(Table)
			const tableBody = table.find('tbody')

		expect(tableBody.find('tr')).toHaveLength(5)

		tableBody.find('tr').forEach((node, i) => {
			expect(node.find(`tr[data-row-key=${i}]`)).toHaveLength(1)
		})
	})

	it('renders all types and formats of data', () => {
		wrapper = mount(createTable<Data>(mockData))
		const expected = {
			_FORMATTED_DATA: [
				formatDate({
					displayFormat: dateFormat,
					unixTS: 1599193037581
				}),
				'1 KB',
				'typescript'
			],
			byte: 1024,
			date: 1599193037581,
			dot: 'test',
			icon: 'test',
			iconKey: 'dassana',
			id: 0,
			key: 0,
			link: 'test',
			number: 0,
			string: 'Dassana',
			tag: 'typescript',
			toggle: false
		}

		expect(expected).toEqual(renderedData(wrapper)[0])
	})

	it('renders all types and formats of data if col dataIndex is a JSONPath', () => {
		const { columns, data } = mockData2

		wrapper = mount(
			createTable<JSONPathData>({
				columns,
				data: [data[0]]
			})
		)

		const expected = {
			_FORMATTED_DATA: [
				formatDate({
					displayFormat: dateFormat,
					unixTS: 1519782342212
				})
			],
			buildHrefIconJSONPath: {
				id: 'H',
				label: 'H'
			},
			company: { id: 'c1', name: 'azure', value: 'azure' },
			icon: 'A',
			id: 0,
			key: 0,
			name: { id: 'n1', value: 'Lorem ipsum' },
			'name.value': 'Lorem ipsum',
			start_date: { date: 1519782342212, id: 'sd1' },
			'start_date.date': 1519782342212,
			vendors: [
				{
					id: 'v1',
					name: 'C',
					value: 'https://dummyimage.com/300x300/a92323/fff&text=C'
				}
			]
		}

		expect(expected).toEqual(renderedData(wrapper)[0])
	})
})

describe('Table props', () => {
	it('passes required props data and columns', () => {
		const table = wrapper.find(Table)

		expect(table.props().data).not.toBeFalsy()
		expect(table.props().columns).not.toBeFalsy()
	})

	it('passes correct data prop and correct columns prop', () => {
		const table = wrapper.find(Table)

		expect(table.props().data).toEqual(
			expect.arrayContaining(mockData0.data)
		)
		expect(table.props().columns).toEqual(
			expect.arrayContaining(mockData0.columns)
		)
	})

	it('throws an error if passed skeletonRowCount prop is less than 1', () => {
		expect(() =>
			shallow(
				<Table<Person>
					columns={mockData0.columns}
					data={[]}
					loading
					skeletonRowCount={0}
				/>
			)
		).toThrow()
	})
})

describe('Table search and searchProps', () => {
	it('renders by default', () => {
		const table = wrapper.find(Table)
		const searchBar = table.find('input')

		expect(searchBar).toHaveLength(1)
	})

	it('does not render if search prop is set to false', () => {
		wrapper = mount(createTable<Person>({ ...mockData0, search: false }))

		const table = wrapper.find(Table)
		const searchBar = table.find('input')

		expect(searchBar).toHaveLength(0)
	})

	it('only renders rows that have the matching input value', async () => {
		const table = wrapper.find(Table)
		const searchBar = table.find('input')

		searchBar.simulate('change', { target: { value: 'lo' } })
		await act(async () => await new Promise(r => setTimeout(r, 250)))
		wrapper.update()

		expect(renderedData(wrapper)).toHaveLength(2)
	})

	it('it renders the search bar to the left by default', async () => {
		const table = wrapper.find(Table)
		const tableControls = table.find('[className*="tableControls"]')

		const style = window.getComputedStyle(tableControls.getDOMNode())

		expect(style.justifyContent).toBe('flex-start')
	})

	it('it renders the search bar to the right if searchProps.placement is passed as right', async () => {
		wrapper = mount(
			createTable<Data>({
				...mockData,
				searchProps: { placement: 'right' }
			})
		)

		const table = wrapper.find(Table)
		const tableControls = table.find('[className*="tableControls"]')

		const style = window.getComputedStyle(tableControls.getDOMNode())

		expect(style.justifyContent).toBe('flex-end')
	})

	it('correctly passes the placeholder prop to the searchbar input', () => {
		wrapper = mount(
			createTable<Data>({
				...mockData,
				searchProps: { placeholder: 'Mock placeholder' }
			})
		)

		expect(wrapper.find(AntDInput).props().placeholder).toEqual(
			'Mock placeholder'
		)
	})
})

describe('Table onRowClick, activeRowKey', () => {
	it('calls onRowClick handler when a table row is clicked', () => {
		wrapper = mount(
			createTable<Person>({ ...mockData0, onRowClick: mockOnRowClick })
		)

		const tableRow = wrapper.find('tbody').find('tr').at(1)

		tableRow.simulate('click')
		expect(mockOnRowClick).toHaveBeenCalledTimes(1)
	})

	it('does not pass an onRow prop if onRowClick prop does not exist', () => {
		expect(wrapper.find(AntDTable).props().onRow).toBeFalsy()
	})

	it('applies the active row styles if activeRowKey index is passed with a valid key', () => {
		wrapper = mount(
			createTable<Person>({
				...mockData0,
				activeRowKey: 0,
				onRowClick: mockOnRowClick
			})
		)

		const tableRow = wrapper.find('tr[data-row-key=0]')

		expect(tableRow.getDOMNode().classList.toString()).toContain('active')
	})
})

describe('Table pagination', () => {
	it('does not show pagination if there are less than 10 rows', () => {
		expect(wrapper.find(AntDTable).props().pagination).toBe(false)

		expect(wrapper.find('.ant-pagination').exists()).toBeFalsy()
	})

	it('shows pagination if there are more than 10 rows', () => {
		wrapper = mount(
			createTable<File>({
				...mockData1
			})
		)

		expect(wrapper.find(AntDTable).props().pagination).toEqual({
			defaultPageSize: 10,
			responsive: true,
			showSizeChanger: false
		})

		expect(wrapper.find('.ant-pagination').exists()).toBeTruthy()
	})
})

describe('Table loading', () => {
	it('renders a TableSkeleton if loading prop is passed as true', () => {
		const wrapper: ShallowWrapper = shallow(
			<Table<Person> columns={mockData0.columns} data={[]} loading />
		)

		expect(wrapper.find(TableSkeleton)).toHaveLength(1)
	})
})
