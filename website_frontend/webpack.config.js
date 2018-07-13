var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: __dirname + '/app/index.js',
	module: {
		rules: [
		    {
		 	    test: /\.js$/,
    		 	exclude: /node_modules/,
    		 	use: 'babel-loader'
		    },
		    {
		 	    test: /\.css$/,
        	   use: [ 'style-loader', 'css-loader' ]
		    },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
		]
	},
	output: {
		filename: 'transformed.js',
		path: __dirname + '/build'
	},
	plugins: [HTMLWebpackPluginConfig],
	mode: 'development'
};