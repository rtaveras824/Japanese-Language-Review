module.exports = {
	entry: './client/src/app.jsx',
	output: {
		path: __dirname + '/client/dist/js',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader',
			query: {
				presets: ['react', 'es2015']
			}
		}]
	},
	watch: true
}