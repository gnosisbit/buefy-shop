const {
  NODE_ENV,
  ANALYZE,
  FB_DATABASE_URL,
  FB_PROJECT_ID,
  FB_API_KEY,
  FB_AUTH_DOMAIN,
  FB_STORAGE_BUCKET,
  FB_MESSAGE_SENDER_ID
} = process.env

const modules = [
  '@nuxtjs/pwa',
  '@nuxtjs/axios'
]
const isNotProdEnv = NODE_ENV !== 'production'
isNotProdEnv && modules.push('@nuxtjs/dotenv')

module.exports = {
  /*
  ** Build configuration
  */
  build: {
    postcss: [// will fix bulma warning about column
      require('postcss-cssnext')({
        features: {
          customProperties: false
        }
      })
    ],
    analyze: ANALYZE,
    vendor: [
      'buefy',
      'firebase'
    ],
    extend(config, { isDev }) {
      if (!isDev) {
        const BabiliPlugin = require('babili-webpack-plugin')
        config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'UglifyJsPlugin')
        config.plugins.push(new BabiliPlugin())
      }
    }
  },
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  head: {},
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Customize app manifest
  */
  manifest: {
    theme_color: '#3B8070'
  },
  /*
  ** Modules
  */
  modules,
  plugins: [
    '~plugins/buefy',
    '~plugins/firebase'
  ],
  env: {
    FB_DATABASE_URL,
    FB_PROJECT_ID,
    FB_API_KEY,
    FB_AUTH_DOMAIN,
    FB_STORAGE_BUCKET,
    FB_MESSAGE_SENDER_ID
  }
}
