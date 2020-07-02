module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/**/__tests__/**/*.(test|spec).(js)"],
  moduleDirectories: ["node_modules"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  transformIgnorePatterns: [],
};
