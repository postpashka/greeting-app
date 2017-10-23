module.exports = function () {
    return {
        devServer: {
        /*    proxy: { // proxy URLs to backend development server
            '/api/': 'http://localhost:8080/room-page/'
          },*/
        /*    contentBase: path.join(__dirname, 'app'), // boolean | string | array, static file location*/
          compress: true, // enable gzip compression
          historyApiFallback: true, // true for index.html upon 404, object for multiple paths
          hot: false, // hot module replacement. Depends on HotModuleReplacementPlugin
          https: false, // true for self-signed, object for cert authority
          noInfo: false,
          port: 8080
        }
    }
};