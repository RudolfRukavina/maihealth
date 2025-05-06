// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      script: [],
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-swiper",
    "dayjs-nuxt",
    "@nuxtjs/i18n",
    "nuxt-marquee",
    "@vueuse/nuxt",
  ],

  i18n: {
    strategy: "no_prefix",
    locales: [
      {
        code: "en",
        name: "English",
        iso: "en-US",
      },
      {
        code: "hr",
        name: "Hrvatski",
        iso: "hr-HR",
      },
      {
        code: "it",
        name: "Italiano",
        iso: "it-IT",
      },
      {
        code: "de",
        name: "Deutsch",
        iso: "de-DE",
      },
    ],

    vueI18n: "./i18n.config.ts", // if you are using custom path
    detectBrowserLanguage: {
      useCookie: false, // Enable to persist the user's choice
      cookieKey: "i18n_redirected",
      alwaysRedirect: true, // Redirect the user to the preferred language
      fallbackLocale: "en",
    },
  },

  dayjs: {
    locales: ["hr"], // Croatian locale
    defaultLocale: "hr", // Set Croatian as the default locale
    defaultTimezone: "Europe/Zagreb", // Set the default timezone for Croatia
    plugins: ["relativeTime", "utc", "timezone"], // Use desired plugins
  },

  tailwindcss: {
    cssPath: "~/assets/css/input.css",
  },

  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },

  plugins: [],

  compatibilityDate: "2025-02-14",
});
