const path = require('path');

module.exports = {
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    entry: {
        bindx: path.join(__dirname, './src/index.js')
    },
    output: {
        path: __dirname,
        filename: "[name].js",
        libraryTarget: 'umd'
    }
}
