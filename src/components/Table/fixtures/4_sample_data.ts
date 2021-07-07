import cloneDeep from 'lodash/cloneDeep'
import { TableProps } from '..'
import tableData1, { File } from './1_sample_data'

const paginatedData = [
	...cloneDeep(tableData1.data),
	...cloneDeep(tableData1.data.slice(0, 3)),
	...cloneDeep(tableData1.data),
	...cloneDeep(tableData1.data.slice(1, 4)),
	...cloneDeep(tableData1.data),
	...cloneDeep(tableData1.data.slice(0, 2)),
	...cloneDeep(tableData1.data.slice(0, 2)),
	...cloneDeep(tableData1.data.slice(0, 2)),
	...cloneDeep(tableData1.data),
	...cloneDeep(tableData1.data),
	...cloneDeep(tableData1.data),
	...cloneDeep(tableData1.data),
	...cloneDeep(tableData1.data),
	...cloneDeep(tableData1.data),
	...cloneDeep(tableData1.data),
	...cloneDeep(tableData1.data),
	...cloneDeep(tableData1.data)
]

const tableData4: TableProps<File> = {
	columns: tableData1.columns,
	data: paginatedData.map((item, i) => {
		item.id = i
		return item
	})
}

export type { File }
export default tableData4
