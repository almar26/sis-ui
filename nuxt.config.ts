import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: `%s %separator %siteName`,
      templateParams: {
        siteName: 'Student Information System',
        separator: '|'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  build: {
    transpile: ['vuetify'],
  },
  ssr: false,
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify({ autoImport: true}))
      })
    },
    '@pinia/nuxt'
  ],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:1337',
    }
  },
  vite: {
   vue: {
    template: {
      transformAssetUrls,
    }
   }
  },
})
