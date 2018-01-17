var path = require('path');
var webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
    entry: './squib.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'squib.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    plugins: [
        new MinifyPlugin(),
    ]
};