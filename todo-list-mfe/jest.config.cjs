module.exports = {
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    testEnvironment: "jsdom",
    moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    testMatch: [
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[jt]s?(x)"
    ],
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    collectCoverageFrom: [
      "src/components/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.d.ts",
      "!src/index.tsx"
    ],
    coverageReporters: ["json", "lcov", "text", "clover"],
    coveragePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/build/"],
    globals: {
      "ts-jest": {
        tsconfig: "tsconfig.json"
      }
    }
  };