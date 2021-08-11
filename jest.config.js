
const { resolve } = require('path');

module.exports = {
  rootDir: resolve(__dirname, 'src'),
  transform: {
    '\\.jsx?$': 'babel-jest',
    '\\.tsx?$': 'ts-jest',
  },
  // 需要收集覆盖率的文件
  collectCoverageFrom: [
    '<rootDir>/**/*.ts',
  ],
  // 指定需要进行单元测试的文件匹配规则
  testMatch: [
    '<rootDir>/**/__tests__/*.test.js'
  ],
};
