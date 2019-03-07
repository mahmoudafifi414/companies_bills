var webpack = require('webpack')
var path = require('path')

var DIST_DIR = path.resolve(__dirname, "dist")
var SRC_DIR = path.resolve(__dirname, "src")

var config = {
    mode: 'none',
    devServer: {
        watchOptions: {
            poll: true
        }
    },
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        rules: [{
            test: /\.js?/,
            include: SRC_DIR,
            loader: "babel-loader",
            exclude: /node_modules/,
            query: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-transform-object-assign', '@babel/plugin-proposal-class-properties']
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }]
    }
};
module.exports = config