const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: 'app.bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    fallback: {
        "querystring": require.resolve("querystring-es3"),
        "crypto": require.resolve("crypto-browserify"),
         stream: require.resolve('stream-browserify'),
        "url": require.resolve("url/"),
        "https": require.resolve("https-browserify"),
        "http": require.resolve("stream-http"),
        "path": require.resolve("path-browserify"),
        "util": require.resolve("util/"),
        "assert": require.resolve("assert/"),
        "zlib": require.resolve("browserify-zlib"),
        "os":   require.resolve("os-browserify/browser")
      }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(@angular|esm5)/,
      path.resolve(__dirname, 'src')
    ),
    new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
  ],
  stats: {
    warningsFilter: /System.import/
  }
};
