const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/main.jsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
				loader: "babel-loader",
              }
				},
				{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					'file-loader',
					{
					loader: 'image-webpack-loader',
					options: {
						bypassOnDebug: true, // webpack@1.x
						disable: true, // webpack@2.x and newer
						outputPath: 'images'
					},
					},
				],
				},
				{
				test: /\.less$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
							modules: true,
							localIdentName: "[local]___[hash:base64:5]"
						}
					},
					{
						loader: "less-loader"
					}
				]
				}
        ]
		},
		plugins: [
			new HtmlWebPackPlugin({
				template: "./src/index.html",
				filename: "./index.html"
			})
		],
		devServer: {
			host: 'localhost',//your ip address
			port: 8080
		},
    stats: {
        colors: true
    },
    devtool: 'source-map'
};