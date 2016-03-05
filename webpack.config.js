var path = require('path');

module.exports = {
    entry: path.join(__dirname, "/public/Main.js"),
    output: {
        path: __dirname,
        filename: path.join("/dist/bundle.js")
    },
    module: {
        loaders: [{ 
            test: /\.css$/, 
            loader: "style!css" 
        },{
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
        },{
            test: /\.js?$/,
            exclude: '/node/modules/',
            loader: 'babel',
            query: {
                "presets": ["react" ]//, "es2015", "stage-0", "react-hmre"]
            }
        }
        ]
    }
};
