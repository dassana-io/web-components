import initStoryshots, {
	shallowSnapshot,
	snapshot
} from '@storybook/addon-storyshots'

jest.mock('react-dom', () => {
	const original = jest.requireActual('react-dom')

	return {
		...original,
		createPortal: (node: any) => node
	}
})

const componentsToShallowRender = ['Tree']

initStoryshots({
	test: data =>
		componentsToShallowRender.includes(data.context.kind)
			? shallowSnapshot(data)
			: snapshot(data)
})
