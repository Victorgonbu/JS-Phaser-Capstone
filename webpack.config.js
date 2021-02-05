const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    }, 
    mode: 'development',

    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/'),
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
        
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },

    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
    },

    plugins: [
       new HTMLWebpackPlugin({
           template: path.resolve(__dirname, 'src/index.html'),
       })
    ]
};