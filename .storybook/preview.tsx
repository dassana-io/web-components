import { addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks'
import React, { ReactNode } from 'react'

const infoOptions = {
	header: false,
	source: true,
	propTables: false
	// inline: true //uncomment for "story source" to be rendered inline
}

const storyWrapper = (story: () => ReactNode) => (
	<div style={{ padding: 10 }}>{story()}</div>
)

addParameters({
	docs: {
		container: DocsContainer,
		page: DocsPage
	}
})

addDecorator(withInfo(infoOptions))

addDecorator(storyWrapper)
