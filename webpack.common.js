const path = require("path");

module.exports = {
  entry: "./src/main.js",
  resolve: {
    extensions: [".js"]
  },
  output: {
    path: path.resolve(__dirname),
    filename: "dist/index.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loaders: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
           'style-loader',
           'css-loader',
        ],
      },
    ]
  }
};
