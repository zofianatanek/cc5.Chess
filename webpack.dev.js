const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname),
    filename: "dist/index.js"
  },
  resolve: {
    extensions: [".js"]
  },
  devtool: "source-map",
});