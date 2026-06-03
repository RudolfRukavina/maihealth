
// @ts-nocheck


export const localeCodes =  [
  "en",
  "de",
  "hr",
  "it"
]

export const localeLoaders = {
  "en": [{ key: "../locales/en.json", load: () => import("../locales/en.json" /* webpackChunkName: "locale__Users_Rudolf_Work_mai_locales_en_json" */), cache: true }],
  "de": [{ key: "../locales/de.json", load: () => import("../locales/de.json" /* webpackChunkName: "locale__Users_Rudolf_Work_mai_locales_de_json" */), cache: true }],
  "hr": [{ key: "../locales/hr.json", load: () => import("../locales/hr.json" /* webpackChunkName: "locale__Users_Rudolf_Work_mai_locales_hr_json" */), cache: true }],
  "it": [{ key: "../locales/it.json", load: () => import("../locales/it.json" /* webpackChunkName: "locale__Users_Rudolf_Work_mai_locales_it_json" */), cache: true }]
}

export const vueI18nConfigs = [
  () => import("../i18n.config.ts?hash=bffaebcb&config=1" /* webpackChunkName: "__i18n_config_ts_bffaebcb" */)
]

export const nuxtI18nOptions = {
  "experimental": {
    "localeDetector": "",
    "switchLocalePathLinkSSR": false,
    "autoImportTranslationFunctions": false
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false
  },
  "compilation": {
    "jit": true,
    "strictMessage": true,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "./i18n.config.ts",
  "locales": [
    {
      "code": "en",
      "name": "English",
      "language": "en-US",
      "files": [
        "/Users/Rudolf/Work/mai/locales/en.json"
      ]
    },
    {
      "code": "de",
      "name": "Deutsch",
      "language": "de-DE",
      "files": [
        "/Users/Rudolf/Work/mai/locales/de.json"
      ]
    },
    {
      "code": "hr",
      "name": "Hrvatski",
      "language": "hr-HR",
      "files": [
        "/Users/Rudolf/Work/mai/locales/hr.json"
      ]
    },
    {
      "code": "it",
      "name": "Italiano",
      "language": "it-IT",
      "files": [
        "/Users/Rudolf/Work/mai/locales/it.json"
      ]
    }
  ],
  "defaultLocale": "en",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "no_prefix",
  "lazy": true,
  "langDir": "locales",
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "i18n_lang",
    "cookieSecure": false,
    "fallbackLocale": "en",
    "redirectOn": "root",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "",
  "dynamicRouteParams": false,
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false,
  "multiDomainLocales": false,
  "i18nModules": []
}

export const normalizedLocales = [
  {
    "code": "en",
    "name": "English",
    "language": "en-US",
    "files": [
      {
        "path": "/Users/Rudolf/Work/mai/locales/en.json"
      }
    ]
  },
  {
    "code": "de",
    "name": "Deutsch",
    "language": "de-DE",
    "files": [
      {
        "path": "/Users/Rudolf/Work/mai/locales/de.json"
      }
    ]
  },
  {
    "code": "hr",
    "name": "Hrvatski",
    "language": "hr-HR",
    "files": [
      {
        "path": "/Users/Rudolf/Work/mai/locales/hr.json"
      }
    ]
  },
  {
    "code": "it",
    "name": "Italiano",
    "language": "it-IT",
    "files": [
      {
        "path": "/Users/Rudolf/Work/mai/locales/it.json"
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false

export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18n"
export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
