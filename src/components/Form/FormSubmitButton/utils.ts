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
	const commonShortcutConfigProps = {
		additionalConditionalFn,
		callback
	}

	const defaultConfig: UseShortcutConfig = {
		...commonShortcutConfigProps,
		key: 'Enter',
		keyEvent: 'keydown'
	}

	if (!useShortcutProps) return defaultConfig

	if ('key' in useShortcutProps) {
		const { key, keyEvent } = useShortcutProps

		return {
			...commonShortcutConfigProps,
			key,
			keyEvent
		}
	}

	if ('keys' in useShortcutProps) {
		const { keys } = useShortcutProps

		return {
			...commonShortcutConfigProps,
			keys
		}
	}

	return defaultConfig
}
