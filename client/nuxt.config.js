require('dotenv').config()
const { join } = require('path')
const { copySync, removeSync } = require('fs-extra')

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  srcDir: __dirname,

  // buildDir: 'public/_nuxt',

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  env: {
    apiUrl: process.env.API_URL || process.env.APP_URL + '/api',
    appName: process.env.APP_NAME || 'Laravel Nuxt',
    appLocale: process.env.APP_LOCALE || 'en',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'client',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: { color: '#007bff' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: '~/assets/sass/app.scss', lang: 'scss' }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/nuxt-client-init',
    '~/plugins/axios',
    '~/plugins/bootstrap-vue',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    { path: '~/components/app', extensions: ['vue'] },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/router'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
  },

  hooks: {
    generate: {
      done(generator) {
        // Copy dist files to public/_nuxt
        if (
          generator.nuxt.options.dev === false &&
          generator.nuxt.options.mode === 'spa'
        ) {
          const publicDir = join(
            generator.nuxt.options.rootDir,
            'public',
            '_nuxt'
          )
          removeSync(publicDir)
          copySync(
            join(generator.nuxt.options.generate.dir, '_nuxt'),
            publicDir
          )
          copySync(
            join(generator.nuxt.options.generate.dir, '200.html'),
            join(publicDir, 'index.html')
          )
          removeSync(generator.nuxt.options.generate.dir)
        }
      },
    },
  },
}
