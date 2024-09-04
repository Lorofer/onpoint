const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const __base = path.resolve(__dirname, '..');
const __src = path.resolve(__base, 'src');

module.exports = {
    entry: path.resolve(__src, 'index.js'),

    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__base, 'dist'),
        clean: true
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__base, 'sourses'),
                    to:   path.resolve(__base, 'dist', 'sourses')
                }
            ]
        }),
        new HtmlWebpackPlugin({
            title: 'Тестовое задание | Onpoint',
            template: path.resolve(__src, 'index.html'),
        })
    ],

    module: {
        rules: [
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
                loader: 'file-loader',
                options: {
                    outputPath: 'sourses',
                }
            },
        ]
    }
}