const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.sass|scss$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        publicPath: '../',
                        use: ['css-loader','sass-loader'],
                    }),
                }
            ]
        }
    };
};