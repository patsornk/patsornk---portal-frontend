export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  // ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',

  mode:'spa',
  loading: '~/components/atoms/Loading.vue',

  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'The1-Admin-Portal',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vSelect',
    // '@/plugins/vuetify',
    '@/plugins/google-maps',
    '@/plugins/vuelidate',
    '@/plugins/axios',
    '@/plugins/directives',
    //{src: '~/plugins/vuelidate.js', mode: 'client'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
    // '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-i18n',
    '@nuxtjs/dotenv',
    '@nuxtjs/toast',
    'nuxt-material-design-icons',
    '@nuxtjs/auth-next'
  ],

  toast: {
    position: 'top-right',
    duration: 5000,
    register: [ // Register custom toasts
      {
        name: 'error',
        message: message => message,
        options: {
          type: 'error',
          icon: {
            name: 'cancel',
            after: false
          }
        }
      },
      {
        name: 'success',
        message: message => message,
        options: {
          type: 'success',
          icon: {
            name: 'check_circle',
            after: false
          }
        }
      }
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxyHeaders: false,
    headers: {
      common: {
        'Accept': 'application/json, text/plain, */*'
      },
      get: {
        'Content-Type': 'application/json'
      }
    },
    baseURL: process.env.PORTAL_ENDPOINT
  },

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          maxAge: 1800
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 1800
        },
        endpoints: {
          login: {
            url:
              '/auth/token',
            method: 'post',
            headers: {
              'Content-Type':
                'application/x-www-form-urlencoded'
            },
            propertyName: 'data'
          },
          // login: {
          //   url: 'login',
          //   method: 'post',
          //   propertyName: 'data.token'
          // },
          // user: {
          //   url: '',
          //   method: 'get',
          //   propertyName: false
          // },
          user: false,
          logout: false
        }
      }
    },
    redirect: {
      login: '/login'
    }
  },

  router: {
    middleware: ['auth']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'ag-grid-vue',
      'vue-smart-pagination',
      'vee-validate/dist/rules',
      'vue2-google-maps',
    ]
  },
  tailwindcss: {
    viewer: false
  },
  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        iso: 'en',
        name: 'English'
      },
      {
        code: 'th',
        iso: 'th',
        name: 'ไทย'
      }
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'th',
      messages: {
        en: require('./locales/en.js'),
        th: require('./locales/th.js')
      }
    }
  },
  vuex: {
    // Module namespace
    moduleName: 'i18n',

    // If enabled, current app's locale is synced with nuxt-i18n store module
    syncLocale: false,

    // If enabled, current translation messages are synced with nuxt-i18n store module
    syncMessages: false,

    // Mutation to commit to set route parameters translations
    syncRouteParams: false
  },

  router: {
    middleware: ['guard']
  }
}
