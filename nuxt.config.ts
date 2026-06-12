export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "MaiHealth — Mai Jimenez",
      meta: [
        { name: "description", content: "MaiHealth — Mai Jimenez. Gut health & IBS specialist." },
        { name: "theme-color", content: "#F5F1EC" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "MaiHealth" },
        { property: "og:locale", content: "de_DE" },
        { property: "og:locale:alternate", content: "en_US" },
        { property: "og:locale:alternate", content: "hr_HR" },
        { property: "og:locale:alternate", content: "it_IT" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      script: [],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: [
    '@fortawesome/fontawesome-free/css/all.min.css',
  ],

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@nuxtjs/google-fonts",
  ],

  googleFonts: {
    families: {
      'Cormorant Garamond': [500, 600, 700],
      'Inter': [400, 500, 600],
    },
    display: 'swap',
  },

  i18n: {
    strategy: "no_prefix",
    locales: [
      { code: "en", name: "English", iso: "en-US", file: "en.json" },
      { code: "de", name: "Deutsch", iso: "de-DE", file: "de.json" },
      { code: "hr", name: "Hrvatski", iso: "hr-HR", file: "hr.json" },
      { code: "it", name: "Italiano", iso: "it-IT", file: "it.json" },
    ],
    defaultLocale: "en",
    langDir: "locales",
    lazy: true,
    vueI18n: "./i18n.config.ts",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_lang",
      alwaysRedirect: false,
      fallbackLocale: "en",
    },
  },

  tailwindcss: {
    cssPath: "~/assets/css/input.css",
  },

  runtimeConfig: {
    firebaseAdminProjectId: '',
    firebaseAdminClientEmail: '',
    firebaseAdminPrivateKey: '',
    resendApiKey: '',
    zoomAccountId: '',
    zoomClientId: '',
    zoomClientSecret: '',
    contactEmail: 'Mai.jimenez@gmx.de',
    public: {
      firebaseApiKey: '',
      firebaseAuthDomain: '',
      firebaseProjectId: '',
      firebaseStorageBucket: '',
      firebaseMessagingSenderId: '',
      firebaseAppId: '',
    },
  },

  build: {},

  plugins: [],

  compatibilityDate: "2025-02-14",
});
