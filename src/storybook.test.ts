import initStoryshots, {
	shallowSnapshot,
	snapshot
} from '@storybook/addon-storyshots'

const componentsToShallowRender = ['Tree']

initStoryshots({
	test: data =>
		componentsToShallowRender.includes(data.context.kind)
			? shallowSnapshot(data)
			: snapshot(data)
})
