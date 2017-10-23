const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = function(paths) {
    return {
        module: {
            rules: [
              { 
                test: /\.exec\.js$/,
                include: paths,
                use: ['script-loader']
              }
            ]
        }
    };
};