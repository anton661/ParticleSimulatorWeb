const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/ts/ParticleSimulatorWeb.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
//        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      fs: false,
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
};