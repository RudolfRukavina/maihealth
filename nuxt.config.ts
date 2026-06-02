export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Dr. Mai Jimenez — Functional Medicine & Longevity",
      meta: [
        { name: "description", content: "Dr. Mai Jimenez — Physician for Functional Medicine & Longevity. Evidence-based holistic medicine for long-term health." },
        { name: "theme-color", content: "#F5F1EC" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" },
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
  ],

  i18n: {
    strategy: "no_prefix",
    locales: [
      { code: "en", name: "English", iso: "en-US" },
      { code: "de", name: "Deutsch", iso: "de-DE" },
      { code: "hr", name: "Hrvatski", iso: "hr-HR" },
      { code: "it", name: "Italiano", iso: "it-IT" },
    ],
    defaultLocale: "en",
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

  build: {
    transpile: ['gsap'],
  },

  plugins: [],

  compatibilityDate: "2025-02-14",
});
