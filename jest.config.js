module.exports = {
	collectCoverageFrom: ['lib/**/*.{ts,tsx,js,jsx}'],
	coverageDirectory: 'coverage',
	preset: 'ts-jest',
	resetMocks: false,
	coveragePathIgnorePatterns: [
		'.stories.tsx',
		'fixtures/*',
		'types.ts',
		'components/index.ts'
	],
	roots: ['<rootDir>/src/'],
	testEnvironment: 'jsdom',
	moduleDirectories: ['node_modules', 'src'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'^.+\\.svg$': 'jest-svg-transformer',
		'^jss$': require.resolve('jss'),
		'^uuid$': require.resolve('uuid'),
		'^jsonpath-plus$': require.resolve('jsonpath-plus')
	},
	setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				diagnostics: false
			}
		]
	}
}
