var webpack = require('webpack');

module.exports = {
  entry: __dirname + "/src/app.tsx",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".ts", ".tsx", ".js"]
  },
  devServer: {
    inline: true,
    port: 10180
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
