import initStoryshots, {
	shallowSnapshot,
	snapshot
} from '@storybook/addon-storyshots'

const componentsToShallowRender = ['Tree']

initStoryshots({
	test: data => {
		if (componentsToShallowRender.includes(data.context.kind)) {
			return shallowSnapshot({
				...data
			})
		}

		return snapshot(data)
	}
})
