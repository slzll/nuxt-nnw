module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#00c48d' },
  /*
  ** Global CSS
  */
  css: [
    'iview/dist/styles/iview.css',
    'swiper/dist/css/swiper.css',
    'animate.css',
    '@/assets/styles/main.less'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/iview',
    { src: '@/plugins/swiper', ssr: false },
    '@/plugins/filters',
    '@plugins/directives'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true
  },
  proxy: [
    ['/api', {
      target: 'https://www.nnwxy.cn',
      changeOrigin: true,
      https: true,
      cookieDomainRewrite: { '.nnwxy.cn': 'localhost' }
    }],
    ['/lessionnew', {
      target: 'https://www.nnwxy.cn',
      changeOrigin: true,
      https: true,
      cookieDomainRewrite: { '.nnwxy.cn': 'localhost' }
    }],
    ['/Content', {
      target: 'https://www.nnwxy.cn',
      changeOrigin: true,
      https: true,
      cookieDomainRewrite: { '.nnwxy.cn': 'localhost' }
    }]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.devtool = 'cheap-module-eval-source-map'
    }
  },
  server: {
    port: 9000
  }
}
