module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  restoreMocks: true,
  clearMocks: true,
  globals: {
    'ts-jest': {
      isolatedModules: false
    }
  }
};
