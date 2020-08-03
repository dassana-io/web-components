import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import 'semantic-ui-css/semantic.css'
import React, { ReactNode } from 'react'

type infoOptionsType = {
	inline: boolean
	header: boolean
	source: boolean
	propTables: boolean
}

const infoOptions: infoOptionsType = {
	inline: true,
	header: false,
	source: true,
	propTables: false
}

const storyWrapper = (story: () => ReactNode) => (
	<div style={{ margin: 35 }}>{story()}</div>
)

addDecorator(withInfo(infoOptions))
addDecorator(storyWrapper)
