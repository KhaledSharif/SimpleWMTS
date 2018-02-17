const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

module.exports = [{
    context: __dirname,
    entry: {
        app: './main.js'
    },
    output: {
        filename: '../bundle.js'
    },
    amd: {
        toUrlUndefined: true
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            use: ['url-loader']
        }]
    },
    plugins: [
        new CopyWebpackPlugin([{from: path.join(cesiumSource, cesiumWorkers), to: '../Workers'}]),
        new CopyWebpackPlugin([{from: path.join(cesiumSource, 'Assets'), to: '../Assets'}]),
        new CopyWebpackPlugin([{from: path.join(cesiumSource, 'Widgets'), to: '../Widgets'}]),
    ]
}];