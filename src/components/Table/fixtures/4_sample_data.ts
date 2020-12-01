import { ColumnFormats } from '../types'
import { Status } from 'components/IngestionStatusDot'
import { ColumnType, ColumnTypes, TableProps } from '../.'

export interface IngestionStatusType {
	status_label: string
	id: number | string
	ingestion_status: Status
}

const { ingestionStatusDot } = ColumnFormats
const { component, string } = ColumnTypes

const columns: ColumnType[] = [
	{
		dataIndex: 'status_label',
		title: 'Status Label',
		type: string
	},
	{
		dataIndex: 'ingestion_status',
		format: ingestionStatusDot,
		title: 'Ingestion Status Dot',
		type: component
	}
]

const data: IngestionStatusType[] = [
	{
		id: 0,
		ingestion_status: Status.OK,
		status_label: 'ok'
	},
	{
		id: 1,
		ingestion_status: Status.NEEDSCONFIG,
		status_label: 'needs config'
	},
	{
		id: 2,
		ingestion_status: Status.DISABLED,
		status_label: 'paused'
	},
	{
		id: 3,
		ingestion_status: Status.HASISSUES,
		status_label: 'issues'
	}
]

const tableData4: TableProps<IngestionStatusType> = { columns, data }

export default tableData4
