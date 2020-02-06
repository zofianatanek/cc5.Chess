const path = require("path");

module.exports = {
  entry: "./src/main.js",
  resolve: {
    extensions: [".js"]
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loaders: ["babel-loader"],
        exclude: /node_modules/
      }
    ]
  }
};
