var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './react_components/App.jsx'],
    output: {
        //path: path.join(__dirname, '/public/'),
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
                //tell webpack to use jsx-loader for all *.jsx files
                test: [/\.js$/,/\.jsx$/],
                exclude: '/node_modules/',
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['react']
                }
        },
        {
            test: require.resolve("react"), 
            loader: "expose?React" 
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
