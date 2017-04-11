var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        app: './main.js',
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
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
        rules: [
            { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
            { test: /\.(eot|svg|ttf|woff|woff2)$/, loaders: ['file-loader'] },
            { test: /\.json$/, loaders: ['json-loader'] }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CopyWebpackPlugin([
            { from: { glob: 'slides/*.*' } },
            { from: { glob: 'images/*.*' } },
            { from: '../node_modules/reveal.js', to: 'revealjs'}
        ])
    ],
    devServer: {
        noInfo: true,
        port: 8100
    },
    devtool: '#eval-source-map      '
};
