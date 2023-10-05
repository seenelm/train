module.exports = {
  preset: "react-native",
  transform: {
    "^.+\\.js$": "babel-jest", // Use babel-jest for JavaScript files
  },
  setupFilesAfterEnv: ["./setup-jest.js"],
};
