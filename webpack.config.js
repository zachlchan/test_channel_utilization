const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Webpack Configuration
const config = {
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.[chunkhash].js'
    },

    module: {
        rules: [
            // JavaScript Files
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Webpack React Starter',
            template: './src/index.html',
            filename: 'index.html',
            hash: true
        })
    ],

    node: {
        fs: 'empty'
    }
};

module.exports = config;
