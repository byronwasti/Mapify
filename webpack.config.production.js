var path = require('path');
var autoprefixer = require('autoprefixer');
var precss       = require('precss');
var webpack = require('webpack');

module.exports = {
    entry: './react_components/App.jsx',
    output: {
        path: path.join(__dirname, '/public/'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
        {
            //tell webpack to use jsx-loader for all *.jsx files
            test: [/\.js$/,/\.jsx$/],
            exclude: '/node_modules/',
            loader: 'babel-loader',
            query: {
                cacheDirectory: true,
                presets: ['react', 'es2015']
            }
        },
        {
            test: require.resolve("react"), 
            loader: "expose?React" 
        },
        {
            test:   [/\.css$/, /\.scss$/],
            //loader: ['style-loader','css-loader','postcss-loader', 'sass']
            loaders: ['style','css','postcss-loader', 'sass']
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.css']
    },
    postcss: function () {
        return [autoprefixer, precss];
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        })
    ]
};
