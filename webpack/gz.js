module.exports = function(paths) {
    return {
        module: {
            rules: [
              { 
              test: /\.gz$/,
              include: paths,
              enforce: 'pre',
              use: 'gzip-loader'
            }
            ]
        }
    };
};