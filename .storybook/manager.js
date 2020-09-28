import { addons } from '@storybook/addons'
import { themes } from '@storybook/theming'

addons.setConfig({
	isFullscreen: false,
	showNav: true,
	showPanel: true,
	panelPosition: 'bottom',
	sidebarAnimations: true,
	enableShortcuts: true,
	isToolshown: true,
	theme: undefined,
	selectedPanel: 'Controls',
	initialActive: 'sidebar',
	showRoots: false,
	theme: themes.dark
})
