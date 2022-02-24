import 'antd/lib/date-picker/style/index.css'
import 'antd/lib/time-picker/style/index.css'
import dateFnsGenerateConfig from './dateFnsGenerateConfig'
import generatePicker from 'antd/es/date-picker/generatePicker'

export const DatePicker = generatePicker(dateFnsGenerateConfig as any)
