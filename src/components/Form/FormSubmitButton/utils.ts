import { FormButtonProps } from './index'
import { UseShortcutConfig } from '@dassana-io/web-utils'

interface Params {
	useShortcutProps?: FormButtonProps['useShortcutProps']
	additionalConditionalFn: UseShortcutConfig['additionalConditionalFn']
	callback: UseShortcutConfig['callback']
}

export const getUseShortcutProps = ({
	additionalConditionalFn,
	callback,
	useShortcutProps
}: Params): UseShortcutConfig => {
	const defaultConfig: UseShortcutConfig = {
		additionalConditionalFn,
		callback,
		key: 'Enter',
		keyEvent: 'keydown'
	}

	if (!useShortcutProps) return defaultConfig

	if ('key' in useShortcutProps) {
		const { key, keyEvent } = useShortcutProps

		return {
			additionalConditionalFn,
			callback,
			key,
			keyEvent
		}
	}

	if ('keys' in useShortcutProps) {
		const { keys } = useShortcutProps

		return {
			additionalConditionalFn,
			callback,
			keys
		}
	}

	return defaultConfig
}
