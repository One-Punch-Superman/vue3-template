const PROXY = {
    target: 'http://wwwbaidu.com',
    secure: false,
    ws: true,
    changeOrigin: true
};

module.exports = {
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === 'production' ? '/app' : '/',
    configureWebpack: {
        output: {
            library: 'app',
            libraryTarget: 'window'
        }
    },
    devServer: {
        host: '0.0.0.0',
        port: '8080',
        open: true,
        contentBase: './public',
        historyApiFallback: true,
        disableHostCheck: true,
        inline: true,
        hot: true,
        proxy: {
            '/rest/*': PROXY,
            '/websocket/*': PROXY
        },
        overlay: {
            warnings: false,
            errors: false
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With,content-type,Authorization'
        }
    }
}
};
