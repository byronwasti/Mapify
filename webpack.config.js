var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.join(__dirname, '/react_components/App.jsx'),
    output: {
        path: path.join(__dirname, '/public/'),
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
    }
}
