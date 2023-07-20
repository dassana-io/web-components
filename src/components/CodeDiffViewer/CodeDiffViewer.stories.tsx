import React from 'react'
import { CodeDiffViewer, type CodeDiffViewerProps, CodeLanguages } from 'components'
import { type Meta, type Story } from '@storybook/react'

export default {
	component: CodeDiffViewer,
	title: 'Code Diff Viewer'
} as Meta

const Template: Story<CodeDiffViewerProps> = args => (
	<CodeDiffViewer {...args} />
)

const oldCodeYaml = `
schema: 1
type: normalize

vendor-id: foo-cloud
id: foo-cloud-normalize-1

filters: 
  - match-type: all
    rules:
      - .badThingJustHappened and .badThingJustHappened.description
      - .badThingJustHappened.description | contains ("fubar")

output:
  - name: vendorId
    value: foo-cloud
    value-type: STRING
  - name: alertId
    value: demo-alert-id
    value-type: STRING
  - name: canonicalId
    value: demo-canonicalId
    value-type: STRING
  - name: vendorPolicy
    value: dempo-vendorPolicy
    value-type: STRING
  - name: csp
    value: demo-csp
    value-type: STRING
  - name: resourceContainer
    value: demo-resourceContainer
    value-type: STRING
  - name: region
    value: demo-region
    value-type: STRING
  - name: service
    value: demo-service
    value-type: STRING
  - name: resourceType
    value: demo-resourceType
    value-type: STRING
  - name: resourceId
    value: demo-resoureceId
    value-type: STRING

output-queue:
  enabled: true
`
const newCodeYaml = `
schema: 1
type: normalize

vendor-id: foo-cloud
id: foo-cloud-normalize-1

filters: 
  - match-type: all
    rules:
      - .badThingJustHappened and .badThingJustHappened.description
      - .badThingJustHappened.description | contains ("fubar")

output:
  - name: vendorIds
    value: foo-cloud
    value-type: STRING
  - name: alertId
    value: demo-alert-id
    value-type: STRING
  - name: canonicalId
    value: demo-canonicalId
    value-type: STRING
  - name: vendorPolicy
    value: dempo-vendorPolicy
    value-type: STRING
  - name: csp
    value: demo-csp
    value-type: STRING
  - name: resourceContainer
    value: demo-resourceContainer
    value-type: STRING
  - name: region
    value: demo-region
    value-type: STRING
  - name: service
    value: demo-service
    value-type: STRING
  - name: resourceType
    value: demo-resourceType
    value-type: STRING
  - name: resourceId
    value: demo-resoureceId
    value-type: STRING

output-queue:
  enabled: true
`

export const Yaml = Template.bind({})
Yaml.args = {
	language: CodeLanguages.yaml,
	leftTitle: 'Old Code',
	newCode: newCodeYaml,
	oldCode: oldCodeYaml,
	rightTitle: 'New Code'
}

const oldCodeJs = `
const a = 10
const b = 10
const c = () => console.log('foo')
 
if(a > 10) {
  console.log('bar')
}
 
console.log('done')
`
const newCodeJs = `
const a = 10
const boo = 10
 
if(a === 10) {
  console.log('bar')
}
`

export const Javascript = Template.bind({})
Javascript.args = {
	language: CodeLanguages.javascript,
	leftTitle: 'Old Code',
	newCode: newCodeJs,
	oldCode: oldCodeJs,
	rightTitle: 'New Code'
}
