const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    entry: {
        newsroom_js: './assets/index.js',
        newsroom_css: './assets/index.css'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:8080/assets/',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['flow', 'es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin('[name].[chunkhash].css'),
        new ManifestPlugin(path.resolve(__dirname, 'manifest.json'))
    ],
    devtool: 'eval'
};