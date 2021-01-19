import { MultipleChoiceItemConfig } from './types'

export const getSelectedKeysArr = (
	items: MultipleChoiceItemConfig[],
	selectedKeys: Record<string, boolean>
) => items.filter(item => !!selectedKeys[item.key]).map(item => item.key)
