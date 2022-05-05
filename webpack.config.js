const path = require('path'); const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    name: 'browser',
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.csv$/, loader: 'csv-loader', options: {
                    dynamicTyping: true,
                    header: true,
                    skipEmptyLines: true
                }
            }, {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {

                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.mp3$/,
                loader: 'file-loader',
                query: {
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    plugins: [HtmlWebpackPluginConfig]
}