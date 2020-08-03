import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import 'semantic-ui-css/semantic.css'
import React, { ReactNode } from 'react'

const infoOptions = {
	header: false,
	source: true,
	propTables: false
}

const storyWrapper = (story: () => ReactNode) => (
	<div style={{ padding: 10 }}>{story()}</div>
)

addDecorator(withInfo(infoOptions))

addDecorator(storyWrapper)
