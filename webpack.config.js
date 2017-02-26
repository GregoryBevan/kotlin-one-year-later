var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    externals: {
        'reveal': 'Reveal'
    },
    resolve: {
        alias: {
            'reveal$': 'reveal.js/js/reveal.js'
        }
    },
    module: {
        loaders: [
            { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
            { test: /\.(eot|svg|ttf|woff|woff2)$/, loaders: ['file-loader'] }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CopyWebpackPlugin([
            { from: { glob: 'slides/*.md' } }
        ])
    ],
    devServer: {
        noInfo: true,
        port: 8000
    }
};