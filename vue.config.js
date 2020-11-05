module.exports = {
    publicPath: './',
    devServer: {
        proxy: { //如需跨域请求多个域名，在此对象进行扩展即可
            '/api': {
                //http://testmobile.teiimwork.com/
                //https://devmobile.teiimwork.com/
                //http://demomobile.teiimwork.com/
                //http://angelmobile.teiimwork.com/
                //http://yihanmobile.teiimwork.com/
                //http://mobile.teiimwork.com/
                target: 'http://mobile.teiimwork.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}