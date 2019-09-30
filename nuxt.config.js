const createProxy = (context, config) => {
  let target = 'https://www.nnwxy.cn'
  return [context, {
    target,
    changeOrigin: true,
    https: true,
    xfwd: true,
    cookieDomainRewrite: { '.nnwxy.cn': 'localhost' },
    ...config
  }]
}

const proxy = (function () {
  if (process.env.NODE_ENV === 'development') {
    return [
      createProxy('/api', {}),
      createProxy('/Content', {}),
      createProxy('/lessionnew', {})
    ]
  } else {
    return []
  }
})()

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '红色教育-延安培训-延安南泥湾学院',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: '红色教育,延安培训,延安南泥湾学院' },
      {
        hid: 'description',
        name: 'description',
        content: '南泥湾是延安精神的发祥地，是中国军垦、农垦事业的发源地。 为了贯彻落实习近平总书记:“用好这笔财富，用活这部教材”的指示精神， 2019年3月，中共延安市委、延安市人民政府批准成立了延安南泥湾学院。 学院以弘扬“自力更生、艰苦奋斗”的南泥湾精神为宗旨， 努力建成党政领导干部、广大党员、企事业单位职工、知识分子、军队干部和青少年进行中共党史、党建理论、革命精神、红色文化教育、爱国主义教育、营地教育和新时代国情教育的新一代教育培训基地。'
      },
      { name: 'site', content: 'https://www.yannw.cn' },
      { name: 'baidu-site-verification', content: 'mC09DZZ8rC' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'bookmark', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://hm.baidu.com/hm.js?16fcc4371be27a6037ee42147ed188b8' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: '@/components/Loading.vue',
  /*
  ** Global CSS
  */
  css: [
    '@/assets/styles/iview.less',
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
    '@plugins/directives',
    '@/plugins/print',
    { src: '@/plugins/share', ssr: false }
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
  proxy,
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.devtool = 'cheap-module-eval-source-map'
    },
    loaders: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  server: {
    port: 9000
  },
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'error',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  }
}
