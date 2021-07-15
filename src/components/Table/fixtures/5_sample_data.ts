import { ColumnFormats } from '../types'
import { styleguide } from 'components/assets/styles'
import { ColumnType, ColumnTypes, TableProps } from '..'

const {
	colors: { blacks, oranges }
} = styleguide

export interface Dot {
	statusLabel: string
	id: number | string
	ingestionStatus: string
}

const { coloredDot } = ColumnFormats
const { component, string } = ColumnTypes

const columns: ColumnType[] = [
	{
		dataIndex: 'statusLabel',
		title: 'Status Label',
		type: string
	},
	{
		dataIndex: 'ingestionStatus',
		format: coloredDot,
		renderProps: {
			colorMap: {
				disabled: null,
				hasIssues: {
					color: oranges.base,
					tooltipText: 'Test'
				},
				needsConfig: {
					color: blacks['lighten-40'],
					tooltipText: 'Needs Config'
				},
				ok: null
			}
		},
		title: 'Ingestion Status',
		type: component
	}
]

const data: Dot[] = [
	{
		id: 0,
		ingestionStatus: 'ok',
		statusLabel: 'ok'
	},
	{
		id: 1,
		ingestionStatus: 'needsConfig',
		statusLabel: 'needs config'
	},
	{
		id: 2,
		ingestionStatus: 'disabled',
		statusLabel: 'paused'
	},
	{
		id: 3,
		ingestionStatus: 'hasIssues',
		statusLabel: 'issues'
	}
]

const tableData4: TableProps<Dot> = { columns, data }

export default tableData4
