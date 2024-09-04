const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CopyPlugin = require('copy-webpack-plugin');

const __base = path.resolve(__dirname, '..');
const __src = path.resolve(__base, 'src');

module.exports = {
    entry: path.resolve(__src, 'index.js'),

    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__base, 'dist'),
        clean: true,
        assetModuleFilename: "assets/images/[name][ext]"
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Тестовое задание | Onpoint',
            template: path.resolve(__src, 'index.html'),
        })
    ],

    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
        ]
    }
}