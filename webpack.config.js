var path    = require('path');
var webpack = require('webpack');

module.exports = {
    entry:  [
        'webpack-dev-server/client?http://localhost:8080/',
        'webpack/hot/only-dev-server',
        './src/client.js'
    ],
    output: {
        path:     path.join(__dirname, 'public/react'),
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions:         ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test:    /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ["react-hot", 'babel-loader?stage=0']
            },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        proxy: {
            '*': 'http://localhost:' + (process.env.PORT || 3000)
        }
    }
};