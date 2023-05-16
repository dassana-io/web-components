import colors from './colors'

export const defaultFieldWidth = '300px'
export const fieldErrorStyles = {
	'@global': {
		'@keyframes shake': {
			'0%, 100%': { left: '0rem' },
			'20%, 60%': { left: '0.5rem' },
			'40%, 80%': { left: '-0.5rem' }
		}
	},
	error: {
		animation: 'shake 0.2s ease-in-out 0s 2'
	}
}

export const styleguide = {
	borderRadius: 4,
	colors,
	flexAlignCenter: {
		alignItems: 'center',
		display: 'flex'
	},
	flexAlignEnd: {
		alignItems: 'flex-end',
		display: 'flex'
	},
	flexAlignStart: {
		alignItems: 'flex-start',
		display: 'flex'
	},
	flexCenter: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center'
	},
	flexDown: {
		display: 'flex',
		flexDirection: 'column'
	},
	flexJustifyCenter: {
		display: 'flex',
		justifyContent: 'center'
	},
	flexJustifyEnd: {
		display: 'flex',
		justifyContent: 'flex-end'
	},
	flexJustifyStart: {
		display: 'flex',
		justifyContent: 'flex-start'
	},
	flexSpaceAround: {
		display: 'flex',
		justifyContent: 'space-around'
	},
	flexSpaceBetween: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	/* eslint-disable sort-keys */
	font: {
		labelSmall: { fontSize: 10, lineHeight: '14px' },
		label: { fontSize: 12, lineHeight: '20px' },
		body: { fontSize: 14, lineHeight: '22px' },
		bodyLarge: { fontSize: 16, lineHeight: '24px' },
		h3: { fontSize: 20, lineHeight: '28px' },
		h2: { fontSize: 24, lineHeight: '32px' },
		h1: { fontSize: 32, lineHeight: '40px' }
	},
	fontWeight: { light: 300, regular: 400, bold: 500 },
	spacing: {
		xs: 4,
		s: 8,
		's+': 12,
		m: 16,
		'm+': 20,
		l: 24,
		'l+': 28,
		xl: 32
	},
	/* eslint-enable sort-keys */
	topNavHeight: 64
}
