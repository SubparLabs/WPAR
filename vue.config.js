const SWPrecache = require('sw-precache-webpack-plugin')

module.exports = {
    configureWebpack: {
        plugins: [
        new SWPrecache({
            cacheId: 'dc-covers',
            filepath: 'service-worker.js',
            staticFileGlobs: [
                'index.html',
                'manifest.json',
                'dist/*.js'
            ],
            stripPrefix: '/'
            })
        ]
    }
}