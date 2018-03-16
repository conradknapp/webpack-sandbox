const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const glob = require("glob");

module.exports = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader"
            }
          ],
          fallback: "style-loader"
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css"),
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, "index.html"))
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin());
}
