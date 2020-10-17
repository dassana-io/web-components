import initStoryshots, {
	shallowSnapshot,
	snapshot
} from '@storybook/addon-storyshots'

const componentsToShallowRender = ['Tree', 'NotificationV2']

initStoryshots({
	test: data =>
		componentsToShallowRender.includes(data.context.kind)
			? shallowSnapshot(data)
			: snapshot(data)
})
