const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader',
                    }),
                },
            ]
        },
        plugins: [
            new ExtractTextPlugin('./[name].css'),
        ],
    };
};