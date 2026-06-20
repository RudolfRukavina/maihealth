import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { getRequestHeader, splitCookiesString, setResponseStatus, setResponseHeader, send, getRequestHeaders, defineEventHandler, handleCacheHeaders, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, setResponseHeaders, createError, getRouterParam, readBody, getQuery as getQuery$1, getHeader, getRequestIP, getRequestURL, setHeader, getResponseStatusText } from 'file:///Users/Rudolf/Work/mai/node_modules/h3/dist/index.mjs';
import { Server } from 'node:http';
import { mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parentPort, threadId } from 'node:worker_threads';
import { getFirestore, Timestamp, FieldValue } from 'file:///Users/Rudolf/Work/mai/node_modules/firebase-admin/lib/esm/firestore/index.js';
import { randomBytes, randomUUID } from 'node:crypto';
import { Resend } from 'file:///Users/Rudolf/Work/mai/node_modules/resend/dist/index.mjs';
import { getApps, initializeApp, cert } from 'file:///Users/Rudolf/Work/mai/node_modules/firebase-admin/lib/esm/app/index.js';
import { getAuth } from 'file:///Users/Rudolf/Work/mai/node_modules/firebase-admin/lib/esm/auth/index.js';
import { getRequestDependencies, getPreloadLinks, getPrefetchLinks, createRenderer } from 'file:///Users/Rudolf/Work/mai/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { stringify, uneval } from 'file:///Users/Rudolf/Work/mai/node_modules/devalue/index.js';
import destr from 'file:///Users/Rudolf/Work/mai/node_modules/destr/dist/index.mjs';
import { renderToString } from 'file:///Users/Rudolf/Work/mai/node_modules/vue/server-renderer/index.mjs';
import { propsToString, renderSSRHead } from 'file:///Users/Rudolf/Work/mai/node_modules/@unhead/ssr/dist/index.mjs';
import { createHooks } from 'file:///Users/Rudolf/Work/mai/node_modules/hookable/dist/index.mjs';
import { createFetch as createFetch$1, Headers as Headers$1 } from 'file:///Users/Rudolf/Work/mai/node_modules/ofetch/dist/node.mjs';
import { createCall, createFetch } from 'file:///Users/Rudolf/Work/mai/node_modules/unenv/runtime/fetch/index.mjs';
import { klona } from 'file:///Users/Rudolf/Work/mai/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///Users/Rudolf/Work/mai/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///Users/Rudolf/Work/mai/node_modules/scule/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Users/Rudolf/Work/mai/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/Rudolf/Work/mai/node_modules/unstorage/drivers/fs.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/Rudolf/Work/mai/node_modules/radix3/dist/index.mjs';
import { getContext } from 'file:///Users/Rudolf/Work/mai/node_modules/unctx/dist/index.mjs';
import { AsyncLocalStorage } from 'node:async_hooks';
import { consola } from 'file:///Users/Rudolf/Work/mai/node_modules/consola/dist/index.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file:///Users/Rudolf/Work/mai/node_modules/errx/dist/index.js';
import { isVNode, unref, version } from 'file:///Users/Rudolf/Work/mai/node_modules/vue/index.mjs';
import { hash } from 'file:///Users/Rudolf/Work/mai/node_modules/ohash/dist/index.mjs';
import { createServerHead as createServerHead$1, CapoPlugin } from 'file:///Users/Rudolf/Work/mai/node_modules/unhead/dist/index.mjs';
import { defineHeadPlugin } from 'file:///Users/Rudolf/Work/mai/node_modules/@unhead/shared/dist/index.mjs';

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/");
  }
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/") ? input : input + "/";
  }
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error, isDev) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.unhandled || error.fatal) ? [] : (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.unhandled ? "internal server error" : error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: statusCode !== 404 ? `<pre>${stack.map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n")}</pre>` : "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, (error.message || error.toString() || "internal server error") + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return errorDev; }) ;
    {
      errorObject.description = errorObject.message;
    }
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _gtZIT93UES = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "/Users/Rudolf/Work/mai";

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"},{"name":"description","content":"MaiHealth — Mai Jimenez. Gut health & IBS specialist."},{"name":"theme-color","content":"#F5F1EC"},{"property":"og:type","content":"website"},{"property":"og:site_name","content":"MaiHealth"},{"property":"og:locale","content":"de_DE"},{"property":"og:locale:alternate","content":"en_US"}],"link":[{"rel":"icon","type":"image/x-icon","href":"/favicon.ico"},{"rel":"apple-touch-icon","sizes":"180x180","href":"/apple-touch-icon.png"},{"rel":"icon","type":"image/png","sizes":"32x32","href":"/favicon-32x32.png"},{"rel":"icon","type":"image/png","sizes":"16x16","href":"/favicon-16x16.png"},{"rel":"manifest","href":"/site.webmanifest"}],"style":[],"script":[],"noscript":[],"charset":"utf-8","viewport":"width=device-width, initial-scale=1","title":"MaiHealth — Mai Jimenez"};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _76nvq2ezMH = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola.wrapConsole();
}

const plugins = [
  _gtZIT93UES,
_76nvq2ezMH
];

const _lazy_M1nVnh = () => Promise.resolve().then(function () { return appointments_post$1; });
const _lazy_S6svPp = () => Promise.resolve().then(function () { return _id__patch$3; });
const _lazy_4llXf1 = () => Promise.resolve().then(function () { return availability_post$1; });
const _lazy_zXV6Yv = () => Promise.resolve().then(function () { return _id__patch$1; });
const _lazy_pGTbOi = () => Promise.resolve().then(function () { return reply_post$1; });
const _lazy_iTayOl = () => Promise.resolve().then(function () { return _id__post$1; });
const _lazy_Yu7KvH = () => Promise.resolve().then(function () { return book_post$1; });
const _lazy_XnNalK = () => Promise.resolve().then(function () { return request_post$1; });
const _lazy_1t0xXZ = () => Promise.resolve().then(function () { return bootstrap_post$1; });
const _lazy_Dm8u8d = () => Promise.resolve().then(function () { return config_get$1; });
const _lazy_OQeO2T = () => Promise.resolve().then(function () { return slots_get$1; });
const _lazy_amYChR = () => Promise.resolve().then(function () { return contact_post$1; });
const _lazy_8pmUOU = () => Promise.resolve().then(function () { return reminders$1; });
const _lazy_uTj6Uy = () => Promise.resolve().then(function () { return _id__get$1; });
const _lazy_HH9gBA = () => Promise.resolve().then(function () { return newsletter_post$1; });
const _lazy_gRZynU = () => Promise.resolve().then(function () { return confirm_get$1; });
const _lazy_ievdYf = () => Promise.resolve().then(function () { return unsubscribe_get$1; });
const _lazy_cjtSQX = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '/api/admin/appointments', handler: _lazy_M1nVnh, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/appointments/:id', handler: _lazy_S6svPp, lazy: true, middleware: false, method: "patch" },
  { route: '/api/admin/availability', handler: _lazy_4llXf1, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/patients/:id', handler: _lazy_zXV6Yv, lazy: true, middleware: false, method: "patch" },
  { route: '/api/admin/reply', handler: _lazy_pGTbOi, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/requests/:id', handler: _lazy_iTayOl, lazy: true, middleware: false, method: "post" },
  { route: '/api/appointments/book', handler: _lazy_Yu7KvH, lazy: true, middleware: false, method: "post" },
  { route: '/api/appointments/request', handler: _lazy_XnNalK, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/bootstrap', handler: _lazy_1t0xXZ, lazy: true, middleware: false, method: "post" },
  { route: '/api/availability/config', handler: _lazy_Dm8u8d, lazy: true, middleware: false, method: "get" },
  { route: '/api/availability/slots', handler: _lazy_OQeO2T, lazy: true, middleware: false, method: "get" },
  { route: '/api/contact', handler: _lazy_amYChR, lazy: true, middleware: false, method: "post" },
  { route: '/api/cron/reminders', handler: _lazy_8pmUOU, lazy: true, middleware: false, method: undefined },
  { route: '/api/join/:id', handler: _lazy_uTj6Uy, lazy: true, middleware: false, method: "get" },
  { route: '/api/newsletter', handler: _lazy_HH9gBA, lazy: true, middleware: false, method: "post" },
  { route: '/api/newsletter/confirm', handler: _lazy_gRZynU, lazy: true, middleware: false, method: "get" },
  { route: '/api/newsletter/unsubscribe', handler: _lazy_ievdYf, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_cjtSQX, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_cjtSQX, lazy: true, middleware: false, method: undefined }
];

const serverAssets = [{"baseName":"server","dir":"/Users/Rudolf/Work/mai/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/Rudolf/Work/mai","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/Rudolf/Work/mai/server","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/Rudolf/Work/mai/.nuxt","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/Rudolf/Work/mai/.nuxt/cache","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/Rudolf/Work/mai/.data/kv","ignore":["**/node_modules/**","**/.git/**"]}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[nitro] [cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "firebaseApiKey": "",
    "firebaseAuthDomain": "",
    "firebaseProjectId": "",
    "firebaseStorageBucket": "",
    "firebaseMessagingSenderId": "",
    "firebaseAppId": "",
    "i18n": {
      "baseUrl": "",
      "defaultLocale": "en",
      "defaultDirection": "ltr",
      "strategy": "no_prefix",
      "lazy": true,
      "rootRedirect": "",
      "routesNameSeparator": "___",
      "defaultLocaleRouteNameSuffix": "default",
      "skipSettingLocaleOnNavigate": false,
      "differentDomains": false,
      "trailingSlash": false,
      "configLocales": [
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
        }
      ],
      "locales": {
        "en": {
          "domain": ""
        },
        "de": {
          "domain": ""
        }
      },
      "detectBrowserLanguage": {
        "alwaysRedirect": false,
        "cookieCrossOrigin": false,
        "cookieDomain": "",
        "cookieKey": "i18n_lang",
        "cookieSecure": false,
        "fallbackLocale": "en",
        "redirectOn": "root",
        "useCookie": true
      },
      "experimental": {
        "localeDetector": "",
        "switchLocalePathLinkSSR": false,
        "autoImportTranslationFunctions": false
      },
      "multiDomainLocales": false
    }
  },
  "firebaseAdminProjectId": "",
  "firebaseAdminClientEmail": "",
  "firebaseAdminPrivateKey": "",
  "resendApiKey": "",
  "zoomAccountId": "",
  "zoomClientId": "",
  "zoomClientSecret": "",
  "cronSecret": "",
  "contactEmail": "Mai.jimenez@gmx.de"
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const r=Object.create(null),i=e=>globalThis.process?.env||globalThis._importMeta_.env||globalThis.Deno?.env.toObject()||globalThis.__env__||(e?r:globalThis),o=new Proxy(r,{get(e,s){return i()[s]??r[s]},has(e,s){const E=i();return s in E||s in r},set(e,s,E){const B=i(true);return B[s]=E,true},deleteProperty(e,s){if(!s)return  false;const E=i(true);return delete E[s],true},ownKeys(){const e=i(true);return Object.keys(e)}}),t=typeof process<"u"&&process.env&&"development"||"",f=[["APPVEYOR"],["AWS_AMPLIFY","AWS_APP_ID",{ci:true}],["AZURE_PIPELINES","SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"],["AZURE_STATIC","INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN"],["APPCIRCLE","AC_APPCIRCLE"],["BAMBOO","bamboo_planKey"],["BITBUCKET","BITBUCKET_COMMIT"],["BITRISE","BITRISE_IO"],["BUDDY","BUDDY_WORKSPACE_ID"],["BUILDKITE"],["CIRCLE","CIRCLECI"],["CIRRUS","CIRRUS_CI"],["CLOUDFLARE_PAGES","CF_PAGES",{ci:true}],["CODEBUILD","CODEBUILD_BUILD_ARN"],["CODEFRESH","CF_BUILD_ID"],["DRONE"],["DRONE","DRONE_BUILD_EVENT"],["DSARI"],["GITHUB_ACTIONS"],["GITLAB","GITLAB_CI"],["GITLAB","CI_MERGE_REQUEST_ID"],["GOCD","GO_PIPELINE_LABEL"],["LAYERCI"],["HUDSON","HUDSON_URL"],["JENKINS","JENKINS_URL"],["MAGNUM"],["NETLIFY"],["NETLIFY","NETLIFY_LOCAL",{ci:false}],["NEVERCODE"],["RENDER"],["SAIL","SAILCI"],["SEMAPHORE"],["SCREWDRIVER"],["SHIPPABLE"],["SOLANO","TDDIUM"],["STRIDER"],["TEAMCITY","TEAMCITY_VERSION"],["TRAVIS"],["VERCEL","NOW_BUILDER"],["VERCEL","VERCEL",{ci:false}],["VERCEL","VERCEL_ENV",{ci:false}],["APPCENTER","APPCENTER_BUILD_ID"],["CODESANDBOX","CODESANDBOX_SSE",{ci:false}],["CODESANDBOX","CODESANDBOX_HOST",{ci:false}],["STACKBLITZ"],["STORMKIT"],["CLEAVR"],["ZEABUR"],["CODESPHERE","CODESPHERE_APP_ID",{ci:true}],["RAILWAY","RAILWAY_PROJECT_ID"],["RAILWAY","RAILWAY_SERVICE_ID"],["DENO-DEPLOY","DENO_DEPLOYMENT_ID"],["FIREBASE_APP_HOSTING","FIREBASE_APP_HOSTING",{ci:true}]];function b(){if(globalThis.process?.env)for(const e of f){const s=e[1]||e[0];if(globalThis.process?.env[s])return {name:e[0].toLowerCase(),...e[2]}}return globalThis.process?.env?.SHELL==="/bin/jsh"&&globalThis.process?.versions?.webcontainer?{name:"stackblitz",ci:false}:{name:"",ci:false}}const l=b(),p=l.name;function n(e){return e?e!=="false":false}const I=globalThis.process?.platform||"",T=n(o.CI)||l.ci!==false,a=n(globalThis.process?.stdout&&globalThis.process?.stdout.isTTY);n(o.DEBUG);const R=t==="test"||n(o.TEST);n(o.MINIMAL)||T||R||!a;const A=/^win/i.test(I);!n(o.NO_COLOR)&&(n(o.FORCE_COLOR)||(a||A)&&o.TERM!=="dumb"||T);const C=(globalThis.process?.versions?.node||"").replace(/^v/,"")||null;Number(C?.split(".")[0])||null;const y=globalThis.process||Object.create(null),_={versions:{}};new Proxy(y,{get(e,s){if(s==="env")return o;if(s in e)return e[s];if(s in _)return _[s]}});const c=globalThis.process?.release?.name==="node",O=!!globalThis.Bun||!!globalThis.process?.versions?.bun,D=!!globalThis.Deno,L=!!globalThis.fastly,S=!!globalThis.Netlify,u=!!globalThis.EdgeRuntime,N=globalThis.navigator?.userAgent==="Cloudflare-Workers",F=[[S,"netlify"],[u,"edge-light"],[N,"workerd"],[L,"fastly"],[D,"deno"],[O,"bun"],[c,"node"]];function G(){const e=F.find(s=>s[0]);if(e)return {name:e[1]}}const P=G();P?.name||"";

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
function getAddress() {
  if (p === "stackblitz" || process.env.NITRO_NO_UNIX_SOCKET || process.versions.bun) {
    return 0;
  }
  const socketName = `worker-${process.pid}-${threadId}.sock`;
  if (A) {
    return join(String.raw`\\.\pipe\nitro`, socketName);
  }
  const socketDir = join(tmpdir(), "nitro");
  mkdirSync(socketDir, { recursive: true });
  return join(socketDir, socketName);
}
const listenAddress = getAddress();
server.listen(listenAddress, () => {
  const _address = server.address();
  parentPort?.postMessage({
    event: "listen",
    address: typeof _address === "string" ? { socketPath: _address } : { host: "localhost", port: _address?.port }
  });
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
trapUnhandledNodeErrors();
async function onShutdown(signal) {
  await nitroApp.hooks.callHook("close");
}
parentPort?.on("message", async (msg) => {
  if (msg && msg.event === "shutdown") {
    await onShutdown();
    parentPort?.postMessage({ event: "exit" });
  }
});

const _messages = { "appName": "Nuxt", "version": "", "statusCode": 500, "statusMessage": "Server error", "description": "An error occurred in the application and the page could not be served. If you are the application owner, check your server logs for details.", "stack": "" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + messages.statusCode + " - " + messages.statusMessage + " | " + messages.appName + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);bottom:-40vh;filter:blur(30vh);height:60vh;opacity:.8}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-size:1em;font-variation-settings:normal}h1,p,pre{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.fixed{position:fixed}.left-0{left:0}.right-0{right:0}.z-10{z-index:10}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.h-auto{height:auto}.min-h-screen{min-height:100vh}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.overflow-y-auto{overflow-y:auto}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.bg-black\\/5{background-color:#0000000d}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.pt-14{padding-top:3.5rem}.text-6xl{font-size:3.75rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:bg-white\\/10{background-color:#ffffff1a}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-8xl{font-size:6rem;line-height:1}}</style><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script></head><body class="antialiased bg-white dark:bg-black dark:text-white flex flex-col font-sans min-h-screen pt-14 px-10 text-black"><div class="fixed left-0 right-0 spotlight"></div><h1 class="font-medium mb-6 sm:text-8xl text-6xl">` + messages.statusCode + '</h1><p class="font-light leading-tight mb-8 sm:text-2xl text-xl">' + messages.description + '</p><div class="bg-black/5 bg-white dark:bg-white/10 flex-1 h-auto overflow-y-auto rounded-t-md"><pre class="font-light leading-tight p-8 text-xl z-10">' + messages.stack + "</pre></div></body></html>";
};

const errorDev = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template$1
});

let _auth;
let _db;
function normalizePrivateKey(raw) {
  if (typeof raw !== "string") return void 0;
  let key = raw.trim();
  if (key.startsWith('"') && key.endsWith('"') || key.startsWith("'") && key.endsWith("'")) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, "\n");
}
function ensureInitialized() {
  if (getApps().length === 0) {
    const config = useRuntimeConfig();
    const projectId = config.firebaseAdminProjectId;
    const clientEmail = config.firebaseAdminClientEmail;
    const privateKey = normalizePrivateKey(config.firebaseAdminPrivateKey);
    if (!projectId || !clientEmail || !privateKey) {
      const missing = [
        !projectId && "NUXT_FIREBASE_ADMIN_PROJECT_ID",
        !clientEmail && "NUXT_FIREBASE_ADMIN_CLIENT_EMAIL",
        !privateKey && "NUXT_FIREBASE_ADMIN_PRIVATE_KEY"
      ].filter(Boolean).join(", ");
      throw createError({
        statusCode: 500,
        statusMessage: `Firebase Admin is not configured. Missing env var(s): ${missing}. Add them to your .env file.`
      });
    }
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey })
    });
  }
  _auth = getAuth();
  _db = getFirestore();
}
function getAdminAuth() {
  ensureInitialized();
  return _auth;
}
function getAdminDb() {
  ensureInitialized();
  return _db;
}

async function verifyAuth(event) {
  const authorization = getHeader(event, "authorization");
  if (!(authorization == null ? void 0 : authorization.startsWith("Bearer "))) {
    throw createError({ statusCode: 401, statusMessage: "Missing or invalid authorization header" });
  }
  const token = authorization.slice(7);
  try {
    return await getAdminAuth().verifyIdToken(token);
  } catch {
    throw createError({ statusCode: 401, statusMessage: "Invalid or expired token" });
  }
}

let cachedToken = null;
async function getZoomAccessToken() {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 6e4) {
    return cachedToken.token;
  }
  const config = useRuntimeConfig();
  const credentials = Buffer.from(`${config.zoomClientId}:${config.zoomClientSecret}`).toString("base64");
  const response = await fetch("https://zoom.us/oauth/token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "account_credentials",
      account_id: config.zoomAccountId
    })
  });
  if (!response.ok) {
    throw new Error(`Zoom token request failed: ${response.statusText}`);
  }
  const data = await response.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1e3
  };
  return cachedToken.token;
}
async function createZoomMeeting(topic, startTime, duration = 60) {
  const token = await getZoomAccessToken();
  const response = await fetch("https://api.zoom.us/v2/users/me/meetings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      topic,
      type: 2,
      start_time: startTime,
      duration,
      timezone: "Europe/Berlin",
      settings: {
        join_before_host: false,
        waiting_room: true,
        meeting_authentication: false
      }
    })
  });
  if (!response.ok) {
    throw new Error(`Zoom meeting creation failed: ${response.statusText}`);
  }
  const meeting = await response.json();
  return {
    meetingId: String(meeting.id),
    joinUrl: meeting.join_url
  };
}
async function updateZoomMeeting(meetingId, updates) {
  const token = await getZoomAccessToken();
  const body = { timezone: "Europe/Berlin" };
  if (updates.topic !== void 0) body.topic = updates.topic;
  if (updates.startTime !== void 0) body.start_time = updates.startTime;
  if (updates.duration !== void 0) body.duration = updates.duration;
  const response = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!response.ok && response.status !== 404) {
    throw new Error(`Zoom meeting update failed: ${response.statusText}`);
  }
}
async function deleteZoomMeeting(meetingId) {
  const token = await getZoomAccessToken();
  const response = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!response.ok && response.status !== 404) {
    throw new Error(`Zoom meeting deletion failed: ${response.statusText}`);
  }
}

const ADMIN_EMAILS = ["noamaijimenez@gmail.com"];
async function getAdminRecipients() {
  const config = useRuntimeConfig();
  const recipients = new Set(ADMIN_EMAILS);
  if (config.contactEmail) recipients.add(String(config.contactEmail).toLowerCase());
  try {
    const snap = await getAdminDb().collection("users").where("role", "==", "admin").get();
    snap.forEach((doc) => {
      const email = doc.data().email;
      if (typeof email === "string" && email) recipients.add(email.toLowerCase());
    });
  } catch (err) {
    console.error("Failed to load admin users for notifications:", err);
  }
  return [...recipients];
}

let resendInstance = null;
function getResend() {
  const config = useRuntimeConfig();
  if (!config.resendApiKey) return null;
  if (!resendInstance) resendInstance = new Resend(config.resendApiKey);
  return resendInstance;
}
const FROM = "MaiHealth <noreply@mai-health.de>";
const SITE_URL = "https://mai-health.de";
function normLocale(value) {
  return value === "de" ? "de" : "en";
}
function formatDate(date, locale) {
  return date.toLocaleDateString(locale === "de" ? "de-DE" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function formatTime(date, locale) {
  return date.toLocaleTimeString(locale === "de" ? "de-DE" : "en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function textToHtml(text) {
  return text.trim().split(/\n{2,}/).map((para) => `<p style="margin: 0 0 16px; line-height: 1.7;">${escapeHtml(para).replace(/\n/g, "<br>")}</p>`).join("");
}
function layout(body, locale) {
  const tagline = locale === "de" ? "\xC4rztin f\xFCr Darmgesundheit & Reizdarm" : "Physician for Gut Health & IBS";
  return `
    <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 520px; margin: 0 auto; color: #2D3A24;">
      <div style="padding: 32px 0 16px; border-bottom: 1px solid #E8E4DF; margin-bottom: 24px;">
        <strong style="font-size: 18px; color: #2D3A24;">Mai</strong><span style="font-size: 18px; color: #8B9A6B;">Health</span>
      </div>
      ${body}
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E8E4DF; font-size: 12px; color: #999;">
        Mai Jimenez \xB7 ${tagline}<br>
        <a href="${SITE_URL}" style="color: #8B9A6B;">mai-health.de</a>
      </div>
    </div>
  `;
}
async function sendNewsletterConfirm(opts) {
  const resend = getResend();
  if (!resend) return;
  const { to, confirmUrl } = opts;
  const L = normLocale(opts.locale);
  const t = {
    de: {
      subject: "Bitte best\xE4tigen Sie Ihr Newsletter-Abonnement",
      heading: "Abonnement best\xE4tigen",
      p1: "Sie (oder jemand mit dieser E-Mail-Adresse) m\xF6chten den MaiHealth-Newsletter erhalten.",
      p2: "Bitte best\xE4tigen Sie \xFCber die Schaltfl\xE4che unten. Falls Sie das nicht angefordert haben, ignorieren Sie diese E-Mail einfach \u2014 es wird kein Abonnement angelegt.",
      button: "Abonnement best\xE4tigen",
      fallback: "Oder kopieren Sie diesen Link in Ihren Browser:"
    },
    en: {
      subject: "Please confirm your newsletter subscription",
      heading: "Confirm your subscription",
      p1: "You (or someone using this email address) asked to receive the MaiHealth newsletter.",
      p2: "Please confirm by clicking the button below. If you did not request this, simply ignore this email \u2014 no subscription will be created.",
      button: "Confirm subscription",
      fallback: "Or paste this link into your browser:"
    }
  }[L];
  await resend.emails.send({
    from: FROM,
    to,
    subject: t.subject,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">${t.heading}</h2>
      <p>${t.p1}</p>
      <p>${t.p2}</p>
      <p style="margin: 24px 0;">
        <a href="${confirmUrl}" style="background: #8B9A6B; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 999px; font-weight: 600; display: inline-block;">${t.button}</a>
      </p>
      <p style="font-size: 12px; color: #999;">${t.fallback}<br>${confirmUrl}</p>
    `, L)
  });
}
async function sendBookingConfirmation(opts) {
  const resend = getResend();
  if (!resend) return;
  const { to, name, date, duration, joinPageUrl, zoomJoinUrl } = opts;
  const L = normLocale(opts.locale);
  const t = {
    de: {
      subject: "Ihr MaiHealth-Termin ist best\xE4tigt",
      heading: "Termin best\xE4tigt",
      greeting: `Hallo ${name},`,
      intro: "Ihr Termin wurde gebucht:",
      lDate: "Datum",
      lTime: "Uhrzeit",
      lDuration: "Dauer",
      minutes: "Minuten",
      video: "Videogespr\xE4ch",
      join: "Zoom-Meeting beitreten",
      joinBtn: "Zum Videogespr\xE4ch",
      joinNote: "\xDCber diesen Button gelangen Sie ab 15 Minuten vor Beginn direkt in Ihr Videogespr\xE4ch.",
      outro: "Sie erhalten vor Ihrem Termin eine Erinnerung. Wenn Sie den Termin verschieben m\xF6chten, melden Sie sich gerne bei uns."
    },
    en: {
      subject: "Your MaiHealth appointment is confirmed",
      heading: "Appointment Confirmed",
      greeting: `Dear ${name},`,
      intro: "Your appointment has been booked:",
      lDate: "Date",
      lTime: "Time",
      lDuration: "Duration",
      minutes: "minutes",
      video: "Video Call",
      join: "Join Zoom Meeting",
      joinBtn: "Join your consultation",
      joinNote: "This button takes you straight into your video call, starting 15 minutes before your appointment.",
      outro: "You'll receive a reminder before your appointment. If you need to reschedule, please get in touch."
    }
  }[L];
  const cta = joinPageUrl ? `
      <div style="margin: 24px 0;">
        <a href="${joinPageUrl}" style="display: inline-block; background: #8B9A6B; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 999px; font-weight: 600;">${t.joinBtn}</a>
      </div>
      <p style="font-size: 13px; color: #777;">${t.joinNote}</p>` : zoomJoinUrl ? `<p><strong>${t.video}:</strong> <a href="${zoomJoinUrl}" style="color: #8B9A6B;">${t.join}</a></p>` : "";
  await resend.emails.send({
    from: FROM,
    to,
    subject: t.subject,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">${t.heading}</h2>
      <p>${t.greeting}</p>
      <p>${t.intro}</p>
      <div style="background: #F5F1EC; border-radius: 12px; padding: 16px; margin: 16px 0;">
        <p style="margin: 0 0 4px;"><strong>${t.lDate}:</strong> ${formatDate(date, L)}</p>
        <p style="margin: 0 0 4px;"><strong>${t.lTime}:</strong> ${formatTime(date, L)}</p>
        <p style="margin: 0;"><strong>${t.lDuration}:</strong> ${duration} ${t.minutes}</p>
      </div>
      ${cta}
      <p>${t.outro}</p>
    `, L)
  });
}
async function sendAppointmentReminder(opts) {
  const resend = getResend();
  if (!resend) return false;
  const { to, name, date, duration, joinPageUrl } = opts;
  const L = normLocale(opts.locale);
  const t = {
    de: {
      subject: "Erinnerung: Ihr MaiHealth-Termin in 1 Stunde",
      heading: "Ihr Termin beginnt bald",
      greeting: `Hallo ${name},`,
      intro: "Ihr Videogespr\xE4ch beginnt in etwa einer Stunde:",
      lDate: "Datum",
      lTime: "Uhrzeit",
      lDuration: "Dauer",
      minutes: "Minuten",
      joinBtn: "Zum Videogespr\xE4ch",
      joinNote: "Der Button ist ab 15 Minuten vor Beginn aktiv.",
      outro: "Bis gleich!"
    },
    en: {
      subject: "Reminder: your MaiHealth appointment in 1 hour",
      heading: "Your appointment is coming up",
      greeting: `Dear ${name},`,
      intro: "Your video consultation starts in about an hour:",
      lDate: "Date",
      lTime: "Time",
      lDuration: "Duration",
      minutes: "minutes",
      joinBtn: "Join your consultation",
      joinNote: "The button activates 15 minutes before the start.",
      outro: "See you soon!"
    }
  }[L];
  await resend.emails.send({
    from: FROM,
    to,
    subject: t.subject,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">${t.heading}</h2>
      <p>${t.greeting}</p>
      <p>${t.intro}</p>
      <div style="background: #F5F1EC; border-radius: 12px; padding: 16px; margin: 16px 0;">
        <p style="margin: 0 0 4px;"><strong>${t.lDate}:</strong> ${formatDate(date, L)}</p>
        <p style="margin: 0 0 4px;"><strong>${t.lTime}:</strong> ${formatTime(date, L)}</p>
        <p style="margin: 0;"><strong>${t.lDuration}:</strong> ${duration} ${t.minutes}</p>
      </div>
      ${joinPageUrl ? `
      <div style="margin: 24px 0;">
        <a href="${joinPageUrl}" style="display: inline-block; background: #8B9A6B; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 999px; font-weight: 600;">${t.joinBtn}</a>
      </div>
      <p style="font-size: 13px; color: #777;">${t.joinNote}</p>` : ""}
      <p>${t.outro}</p>
    `, L)
  });
  return true;
}
async function sendAdminAppointmentScheduled(opts) {
  const resend = getResend();
  if (!resend) return;
  const { patientName, date, duration, joinPageUrl } = opts;
  const L = normLocale(opts.locale);
  const t = {
    de: {
      subject: `Termin best\xE4tigt: ${patientName} \xB7 ${formatDate(date, L)}`,
      heading: "Termin im Kalender",
      lPatient: "Patient:in",
      lDate: "Datum",
      lTime: "Uhrzeit",
      lDuration: "Dauer",
      minutes: "Minuten",
      joinBtn: "Videogespr\xE4ch starten",
      joinNote: "Der Button ist ab 15 Minuten vor Beginn aktiv.",
      cta: "Im Admin-Bereich ansehen \u2192"
    },
    en: {
      subject: `Appointment confirmed: ${patientName} \xB7 ${formatDate(date, L)}`,
      heading: "Appointment Scheduled",
      lPatient: "Patient",
      lDate: "Date",
      lTime: "Time",
      lDuration: "Duration",
      minutes: "minutes",
      joinBtn: "Start video call",
      joinNote: "The button activates 15 minutes before the start.",
      cta: "View in admin panel \u2192"
    }
  }[L];
  await resend.emails.send({
    from: FROM,
    to: await getAdminRecipients(),
    subject: t.subject,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">${t.heading}</h2>
      <div style="background: #F5F1EC; border-radius: 12px; padding: 16px; margin: 16px 0;">
        <p style="margin: 0 0 4px;"><strong>${t.lPatient}:</strong> ${patientName}</p>
        <p style="margin: 0 0 4px;"><strong>${t.lDate}:</strong> ${formatDate(date, L)}</p>
        <p style="margin: 0 0 4px;"><strong>${t.lTime}:</strong> ${formatTime(date, L)}</p>
        <p style="margin: 0;"><strong>${t.lDuration}:</strong> ${duration} ${t.minutes}</p>
      </div>
      ${joinPageUrl ? `
      <div style="margin: 24px 0;">
        <a href="${joinPageUrl}" style="display: inline-block; background: #8B9A6B; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 999px; font-weight: 600;">${t.joinBtn}</a>
      </div>
      <p style="font-size: 13px; color: #777;">${t.joinNote}</p>` : ""}
      <p><a href="${SITE_URL}/portal/admin/appointments" style="color: #8B9A6B;">${t.cta}</a></p>
    `, L)
  });
}
async function sendRequestReceived(opts) {
  const resend = getResend();
  if (!resend) return;
  const { to, name, date } = opts;
  const L = normLocale(opts.locale);
  const t = {
    de: {
      subject: "Wir haben Ihre Terminanfrage erhalten",
      heading: "Anfrage erhalten",
      greeting: `Hallo ${name},`,
      intro: "Vielen Dank f\xFCr Ihre Terminanfrage. Wir haben sie erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.",
      lSlot: "Gew\xFCnschter Termin",
      lTime: "Uhrzeit",
      outro: "Bei Fragen k\xF6nnen Sie jederzeit einfach auf diese E-Mail antworten."
    },
    en: {
      subject: "We received your appointment request",
      heading: "Request Received",
      greeting: `Dear ${name},`,
      intro: "Thank you for your appointment request. We've received it and will get back to you within 24 hours.",
      lSlot: "Requested slot",
      lTime: "Time",
      outro: "If you have any questions in the meantime, feel free to reply to this email."
    }
  }[L];
  await resend.emails.send({
    from: FROM,
    to,
    subject: t.subject,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">${t.heading}</h2>
      <p>${t.greeting}</p>
      <p>${t.intro}</p>
      <div style="background: #F5F1EC; border-radius: 12px; padding: 16px; margin: 16px 0;">
        <p style="margin: 0 0 4px;"><strong>${t.lSlot}:</strong> ${formatDate(date, L)}</p>
        <p style="margin: 0;"><strong>${t.lTime}:</strong> ${formatTime(date, L)}</p>
      </div>
      <p>${t.outro}</p>
    `, L)
  });
}
async function sendRequestDeclined(opts) {
  const resend = getResend();
  if (!resend) return;
  const { to, name } = opts;
  const L = normLocale(opts.locale);
  const t = {
    de: {
      subject: "Update zu Ihrer MaiHealth-Terminanfrage",
      heading: "Update zu Ihrer Terminanfrage",
      greeting: `Hallo ${name},`,
      p1: "Leider konnten wir Ihren Wunschtermin nicht best\xE4tigen. Das kann vorkommen, wenn ein Termin nicht mehr verf\xFCgbar ist oder nicht in den aktuellen Kalender passt.",
      p2pre: "Gerne finden wir einen passenden Termin f\xFCr Sie. Bitte ",
      link: "buchen Sie einen neuen Termin",
      p2post: " oder melden Sie sich direkt bei uns."
    },
    en: {
      subject: "Update on your MaiHealth appointment request",
      heading: "Appointment Request Update",
      greeting: `Dear ${name},`,
      p1: "Unfortunately, we were unable to accommodate your requested time slot. This can happen when a slot is no longer available or doesn't fit the current schedule.",
      p2pre: "We'd love to find a time that works for you. Please ",
      link: "book a new slot",
      p2post: " or reach out to us directly."
    }
  }[L];
  await resend.emails.send({
    from: FROM,
    to,
    subject: t.subject,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">${t.heading}</h2>
      <p>${t.greeting}</p>
      <p>${t.p1}</p>
      <p>${t.p2pre}<a href="${SITE_URL}/book" style="color: #8B9A6B;">${t.link}</a>${t.p2post}</p>
    `, L)
  });
}
async function sendAppointmentCancelled(opts) {
  const resend = getResend();
  if (!resend) return;
  const { to, name, date } = opts;
  const L = normLocale(opts.locale);
  const t = {
    de: {
      subject: "Ihr MaiHealth-Termin wurde abgesagt",
      heading: "Termin abgesagt",
      greeting: `Hallo ${name},`,
      p1: `Ihr Termin am <strong>${formatDate(date, L)}</strong> um <strong>${formatTime(date, L)}</strong> wurde abgesagt.`,
      p2pre: "Wenn Sie einen neuen Termin vereinbaren m\xF6chten, ",
      link: "buchen Sie einen neuen Termin",
      p2post: " oder melden Sie sich bei uns."
    },
    en: {
      subject: "Your MaiHealth appointment has been cancelled",
      heading: "Appointment Cancelled",
      greeting: `Dear ${name},`,
      p1: `Your appointment on <strong>${formatDate(date, L)}</strong> at <strong>${formatTime(date, L)}</strong> has been cancelled.`,
      p2pre: "If you'd like to reschedule, please ",
      link: "book a new time",
      p2post: " or get in touch."
    }
  }[L];
  await resend.emails.send({
    from: FROM,
    to,
    subject: t.subject,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">${t.heading}</h2>
      <p>${t.greeting}</p>
      <p>${t.p1}</p>
      <p>${t.p2pre}<a href="${SITE_URL}/book" style="color: #8B9A6B;">${t.link}</a>${t.p2post}</p>
    `, L)
  });
}
async function sendAdminReply(opts) {
  const resend = getResend();
  if (!resend) return { ok: false, reason: "not_configured" };
  const config = useRuntimeConfig();
  const L = normLocale(opts.locale);
  await resend.emails.send({
    from: FROM,
    to: opts.to,
    // Patient replies land in the practice inbox, not the noreply address.
    replyTo: config.contactEmail || void 0,
    subject: opts.subject,
    html: layout(textToHtml(opts.message), L)
  });
  return { ok: true };
}
async function sendAdminNewRequest(opts) {
  const resend = getResend();
  if (!resend) return;
  const { name, email, phone, date, type, reason } = opts;
  const L = normLocale(opts.locale);
  const t = {
    de: {
      subject: `Neue Terminanfrage von ${name}`,
      heading: "Neue Terminanfrage",
      lPatient: "Patient:in",
      lPhone: "Telefon",
      lSlot: "Gew\xFCnschter Termin",
      at: "um",
      lType: "Art",
      lReason: "Grund",
      notProvided: "Nicht angegeben",
      cta: "Im Admin-Bereich ansehen \u2192"
    },
    en: {
      subject: `New appointment request from ${name}`,
      heading: "New Appointment Request",
      lPatient: "Patient",
      lPhone: "Phone",
      lSlot: "Requested slot",
      at: "at",
      lType: "Type",
      lReason: "Reason",
      notProvided: "Not provided",
      cta: "Review in admin panel \u2192"
    }
  }[L];
  await resend.emails.send({
    from: FROM,
    to: await getAdminRecipients(),
    subject: t.subject,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">${t.heading}</h2>
      <div style="background: #F5F1EC; border-radius: 12px; padding: 16px; margin: 16px 0;">
        <p style="margin: 0 0 4px;"><strong>${t.lPatient}:</strong> ${name} (${email})</p>
        ${phone ? `<p style="margin: 0 0 4px;"><strong>${t.lPhone}:</strong> ${phone}</p>` : ""}
        <p style="margin: 0 0 4px;"><strong>${t.lSlot}:</strong> ${formatDate(date, L)} ${t.at} ${formatTime(date, L)}</p>
        <p style="margin: 0 0 4px;"><strong>${t.lType}:</strong> ${type}</p>
        <p style="margin: 0;"><strong>${t.lReason}:</strong> ${reason || t.notProvided}</p>
      </div>
      <p><a href="${SITE_URL}/portal/admin/appointments" style="color: #8B9A6B;">${t.cta}</a></p>
    `, L)
  });
}
async function sendAdminContactForm(opts) {
  const resend = getResend();
  if (!resend) return;
  const { firstName, lastName, email, phone, message } = opts;
  const L = normLocale(opts.locale);
  const t = {
    de: {
      subject: `Neue Kontaktanfrage von ${firstName} ${lastName}`,
      heading: "Neue Nachricht \xFCber das Kontaktformular",
      lName: "Name",
      lEmail: "E-Mail",
      lPhone: "Telefon",
      lMessage: "Nachricht"
    },
    en: {
      subject: `New contact from ${firstName} ${lastName}`,
      heading: "New Contact Form Submission",
      lName: "Name",
      lEmail: "Email",
      lPhone: "Phone",
      lMessage: "Message"
    }
  }[L];
  await resend.emails.send({
    from: FROM,
    to: await getAdminRecipients(),
    subject: t.subject,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">${t.heading}</h2>
      <div style="background: #F5F1EC; border-radius: 12px; padding: 16px; margin: 16px 0;">
        <p style="margin: 0 0 4px;"><strong>${t.lName}:</strong> ${firstName} ${lastName}</p>
        <p style="margin: 0 0 4px;"><strong>${t.lEmail}:</strong> ${email}</p>
        ${phone ? `<p style="margin: 0 0 4px;"><strong>${t.lPhone}:</strong> ${phone}</p>` : ""}
      </div>
      <p><strong>${t.lMessage}:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    `, L)
  });
}
async function sendAdminPortalRequest(opts) {
  const resend = getResend();
  if (!resend) return;
  const { name, email, preferredDates, preferredTime, type, reason } = opts;
  const L = normLocale(opts.locale);
  const t = {
    de: {
      subject: `Neue Terminanfrage von ${name}`,
      heading: "Neue Terminanfrage (Portal)",
      lPatient: "Patient:in",
      lDates: "Wunschdaten",
      lTime: "Wunschzeit",
      lType: "Art",
      lReason: "Grund",
      notProvided: "Nicht angegeben",
      cta: "Im Admin-Bereich ansehen \u2192"
    },
    en: {
      subject: `New appointment request from ${name}`,
      heading: "New Appointment Request (Portal)",
      lPatient: "Patient",
      lDates: "Preferred dates",
      lTime: "Preferred time",
      lType: "Type",
      lReason: "Reason",
      notProvided: "Not provided",
      cta: "Review in admin panel \u2192"
    }
  }[L];
  await resend.emails.send({
    from: FROM,
    to: await getAdminRecipients(),
    subject: t.subject,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">${t.heading}</h2>
      <div style="background: #F5F1EC; border-radius: 12px; padding: 16px; margin: 16px 0;">
        <p style="margin: 0 0 4px;"><strong>${t.lPatient}:</strong> ${name} (${email})</p>
        <p style="margin: 0 0 4px;"><strong>${t.lDates}:</strong> ${preferredDates}</p>
        <p style="margin: 0 0 4px;"><strong>${t.lTime}:</strong> ${preferredTime}</p>
        <p style="margin: 0 0 4px;"><strong>${t.lType}:</strong> ${type}</p>
        <p style="margin: 0;"><strong>${t.lReason}:</strong> ${reason || t.notProvided}</p>
      </div>
      <p><a href="${SITE_URL}/portal/admin/appointments" style="color: #8B9A6B;">${t.cta}</a></p>
    `, L)
  });
}

function makeJoinToken() {
  return randomBytes(24).toString("base64url");
}
function buildJoinPageUrl(appointmentId, token) {
  return `${SITE_URL}/join/${appointmentId}?t=${token}`;
}

const appointments_post = defineEventHandler(async (event) => {
  var _a;
  const decoded = await verifyAuth(event);
  const config = useRuntimeConfig();
  const db = getAdminDb();
  const userDoc = await db.collection("users").doc(decoded.uid).get();
  if (!userDoc.exists || ((_a = userDoc.data()) == null ? void 0 : _a.role) !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Admin access required" });
  }
  const body = await readBody(event);
  const { patientId, patientName, patientEmail, date, duration, type, notes, locale } = body;
  const loc = locale === "en" ? "en" : "de";
  if (!patientId || !date) {
    throw createError({ statusCode: 400, statusMessage: "Patient and date are required" });
  }
  let zoomMeetingId = "";
  let zoomJoinUrl = "";
  if (config.zoomClientId && config.zoomClientSecret) {
    const meeting = await createZoomMeeting(
      `MaiHealth \u2014 ${patientName || "Patient Consultation"}`,
      new Date(date).toISOString(),
      duration || 60
    );
    zoomMeetingId = meeting.meetingId;
    zoomJoinUrl = meeting.joinUrl;
  }
  const joinToken = makeJoinToken();
  const appointment = await db.collection("appointments").add({
    patientId,
    patientName: patientName || "",
    patientEmail: patientEmail || "",
    date: Timestamp.fromDate(new Date(date)),
    duration: duration || 60,
    type: type || "initial",
    status: "scheduled",
    zoomMeetingId,
    zoomJoinUrl,
    joinToken,
    notes: notes || "",
    locale: loc,
    createdAt: Timestamp.now()
  });
  const joinPageUrl = buildJoinPageUrl(appointment.id, joinToken);
  if (patientEmail) {
    await sendBookingConfirmation({
      to: patientEmail,
      name: patientName || "there",
      date: new Date(date),
      duration: duration || 60,
      joinPageUrl,
      locale: loc
    });
  }
  await sendAdminAppointmentScheduled({
    patientName: patientName || "Patient",
    date: new Date(date),
    duration: duration || 60,
    joinPageUrl,
    locale: loc
  });
  return { success: true, appointmentId: appointment.id, zoomJoinUrl };
});

const appointments_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: appointments_post
});

const _id__patch$2 = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const decoded = await verifyAuth(event);
  const config = useRuntimeConfig();
  const db = getAdminDb();
  const userDoc = await db.collection("users").doc(decoded.uid).get();
  if (!userDoc.exists || ((_a = userDoc.data()) == null ? void 0 : _a.role) !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Admin access required" });
  }
  const id = getRouterParam(event, "id");
  if (!id) throw createError({ statusCode: 400, statusMessage: "Appointment ID required" });
  const apptDoc = await db.collection("appointments").doc(id).get();
  if (!apptDoc.exists) {
    throw createError({ statusCode: 404, statusMessage: "Appointment not found" });
  }
  const existing = apptDoc.data();
  const body = await readBody(event);
  const updates = {};
  if (body.date) {
    updates.date = Timestamp.fromDate(new Date(body.date));
    updates.reminderSent = false;
  }
  if (body.duration) updates.duration = body.duration;
  if (body.status) updates.status = body.status;
  if (body.notes !== void 0) updates.notes = body.notes;
  const zoomEnabled = !!(config.zoomClientId && config.zoomClientSecret);
  const isCancelling = body.status === "cancelled" && existing.status !== "cancelled";
  if (zoomEnabled && existing.zoomMeetingId) {
    if (isCancelling) {
      await deleteZoomMeeting(existing.zoomMeetingId);
      updates.zoomMeetingId = "";
      updates.zoomJoinUrl = "";
    } else if (body.date || body.duration) {
      const startTime = (body.date ? new Date(body.date) : ((_c = (_b = existing.date) == null ? void 0 : _b.toDate) == null ? void 0 : _c.call(_b)) || /* @__PURE__ */ new Date()).toISOString();
      await updateZoomMeeting(existing.zoomMeetingId, {
        startTime,
        duration: body.duration || existing.duration || 60
      });
    }
  }
  await db.collection("appointments").doc(id).update(updates);
  const patientEmail = existing.patientEmail;
  const patientName = existing.patientName || "there";
  const loc = existing.locale === "de" ? "de" : "en";
  if (patientEmail) {
    if (body.status === "cancelled" && existing.status !== "cancelled") {
      const apptDate = ((_e = (_d = existing.date) == null ? void 0 : _d.toDate) == null ? void 0 : _e.call(_d)) || /* @__PURE__ */ new Date();
      await sendAppointmentCancelled({ to: patientEmail, name: patientName, date: apptDate, locale: loc });
    }
    if (body.date && body.date !== ((_h = (_g = (_f = existing.date) == null ? void 0 : _f.toDate) == null ? void 0 : _g.call(_f)) == null ? void 0 : _h.toISOString())) {
      let joinToken = existing.joinToken;
      if (!joinToken) {
        joinToken = makeJoinToken();
        await db.collection("appointments").doc(id).update({ joinToken });
      }
      await sendBookingConfirmation({
        to: patientEmail,
        name: patientName,
        date: new Date(body.date),
        duration: body.duration || existing.duration || 60,
        joinPageUrl: buildJoinPageUrl(id, joinToken),
        locale: loc
      });
    }
  }
  return { success: true };
});

const _id__patch$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__patch$2
});

const availability_post = defineEventHandler(async (event) => {
  var _a;
  const decoded = await verifyAuth(event);
  const db = getAdminDb();
  const userDoc = await db.collection("users").doc(decoded.uid).get();
  if (!userDoc.exists || ((_a = userDoc.data()) == null ? void 0 : _a.role) !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Admin access required" });
  }
  const body = await readBody(event);
  const { weeklySchedule, blockedDates, slotDuration } = body;
  if (!Array.isArray(weeklySchedule)) {
    throw createError({ statusCode: 400, statusMessage: "weeklySchedule must be an array" });
  }
  for (const entry of weeklySchedule) {
    if (typeof entry.day !== "number" || entry.day < 0 || entry.day > 6 || typeof entry.startHour !== "number" || entry.startHour < 0 || entry.startHour > 23 || typeof entry.endHour !== "number" || entry.endHour < 1 || entry.endHour > 24 || entry.startHour >= entry.endHour) {
      throw createError({ statusCode: 400, statusMessage: "Invalid schedule entry" });
    }
  }
  await db.collection("availability").doc("config").set({
    weeklySchedule,
    blockedDates: Array.isArray(blockedDates) ? blockedDates : [],
    slotDuration: Number(slotDuration) || 60,
    updatedAt: /* @__PURE__ */ new Date()
  }, { merge: true });
  return { success: true };
});

const availability_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: availability_post
});

const _id__patch = defineEventHandler(async (event) => {
  var _a;
  const decoded = await verifyAuth(event);
  const db = getAdminDb();
  const adminDoc = await db.collection("users").doc(decoded.uid).get();
  if (!adminDoc.exists || ((_a = adminDoc.data()) == null ? void 0 : _a.role) !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Admin access required" });
  }
  const id = getRouterParam(event, "id");
  if (!id) throw createError({ statusCode: 400, statusMessage: "Patient ID required" });
  const body = await readBody(event);
  const stage = Number(body.journeyStage);
  if (!Number.isInteger(stage) || stage < 0 || stage > 4) {
    throw createError({ statusCode: 400, statusMessage: "journeyStage must be an integer between 0 and 4" });
  }
  const ref = db.collection("users").doc(id);
  const snap = await ref.get();
  if (!snap.exists) throw createError({ statusCode: 404, statusMessage: "Patient not found" });
  await ref.update({ journeyStage: stage });
  return { success: true, journeyStage: stage };
});

const _id__patch$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__patch
});

const reply_post = defineEventHandler(async (event) => {
  var _a;
  const decoded = await verifyAuth(event);
  const db = getAdminDb();
  const userDoc = await db.collection("users").doc(decoded.uid).get();
  if (!userDoc.exists || ((_a = userDoc.data()) == null ? void 0 : _a.role) !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Admin access required" });
  }
  const body = await readBody(event);
  const { to, subject, message, locale, submissionId } = body;
  if (!to || !subject || !(message == null ? void 0 : message.trim())) {
    throw createError({ statusCode: 400, statusMessage: "Recipient, subject and message are required" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(to))) {
    throw createError({ statusCode: 400, statusMessage: "Invalid recipient email" });
  }
  const result = await sendAdminReply({ to, subject, message, locale });
  if (!result.ok) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Email service is not configured. Use the "open in mail app" option instead.'
    });
  }
  if (submissionId) {
    await db.collection("contactSubmissions").doc(String(submissionId)).update({
      repliedAt: Timestamp.now()
    }).catch(() => {
    });
  }
  return { success: true };
});

const reply_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: reply_post
});

const _id__post = defineEventHandler(async (event) => {
  var _a;
  const decoded = await verifyAuth(event);
  const config = useRuntimeConfig();
  const db = getAdminDb();
  const userDoc = await db.collection("users").doc(decoded.uid).get();
  if (!userDoc.exists || ((_a = userDoc.data()) == null ? void 0 : _a.role) !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Admin access required" });
  }
  const id = getRouterParam(event, "id");
  if (!id) throw createError({ statusCode: 400, statusMessage: "Request ID required" });
  const body = await readBody(event);
  const { action, date, duration } = body;
  const requestDoc = await db.collection("appointmentRequests").doc(id).get();
  if (!requestDoc.exists) {
    throw createError({ statusCode: 404, statusMessage: "Request not found" });
  }
  const request = requestDoc.data();
  const loc = request.locale === "de" ? "de" : "en";
  if (action === "decline") {
    await db.collection("appointmentRequests").doc(id).update({ status: "declined" });
    if (request.patientEmail) {
      await sendRequestDeclined({
        to: request.patientEmail,
        name: request.patientName || "there",
        locale: loc
      });
    }
    return { success: true };
  }
  if (!date) {
    throw createError({ statusCode: 400, statusMessage: "Date is required to accept" });
  }
  let zoomMeetingId = "";
  let zoomJoinUrl = "";
  if (config.zoomClientId && config.zoomClientSecret) {
    const meeting = await createZoomMeeting(
      `MaiHealth \u2014 ${request.patientName || "Patient Consultation"}`,
      new Date(date).toISOString(),
      duration || 60
    );
    zoomMeetingId = meeting.meetingId;
    zoomJoinUrl = meeting.joinUrl;
  }
  const joinToken = makeJoinToken();
  const appointment = await db.collection("appointments").add({
    patientId: request.patientId,
    patientName: request.patientName || "",
    patientEmail: request.patientEmail || "",
    date: Timestamp.fromDate(new Date(date)),
    duration: duration || 60,
    type: request.type || "initial",
    status: "scheduled",
    zoomMeetingId,
    zoomJoinUrl,
    joinToken,
    notes: request.reason || "",
    locale: loc,
    createdAt: Timestamp.now()
  });
  await db.collection("appointmentRequests").doc(id).update({ status: "accepted" });
  const joinPageUrl = buildJoinPageUrl(appointment.id, joinToken);
  if (request.patientEmail) {
    await sendBookingConfirmation({
      to: request.patientEmail,
      name: request.patientName || "there",
      date: new Date(date),
      duration: duration || 60,
      joinPageUrl,
      locale: loc
    });
  }
  await sendAdminAppointmentScheduled({
    patientName: request.patientName || "Patient",
    date: new Date(date),
    duration: duration || 60,
    joinPageUrl,
    locale: loc
  });
  return { success: true, zoomJoinUrl };
});

const _id__post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__post
});

const PRIVACY_POLICY_VERSION = "2026-06-19";
function consentRecord(event) {
  return {
    given: true,
    policyVersion: PRIVACY_POLICY_VERSION,
    at: Timestamp.now(),
    ip: getRequestIP(event, { xForwardedFor: true }) || null,
    userAgent: getHeader(event, "user-agent") || null
  };
}

const book_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { slotDateTime, type, reason, consent, locale, guestName, guestEmail, guestPhone } = body;
  const loc = normLocale(locale);
  if (!slotDateTime) {
    throw createError({ statusCode: 400, statusMessage: "slotDateTime is required" });
  }
  if (consent !== true) {
    throw createError({ statusCode: 400, statusMessage: "Consent is required to book a consultation" });
  }
  const consent_ = consentRecord(event);
  const slotDate = new Date(slotDateTime);
  if (isNaN(slotDate.getTime())) {
    throw createError({ statusCode: 400, statusMessage: "Invalid slotDateTime" });
  }
  if (slotDate <= /* @__PURE__ */ new Date()) {
    throw createError({ statusCode: 400, statusMessage: "Cannot book a slot in the past" });
  }
  let decoded = null;
  const authHeader = getHeader(event, "authorization");
  if (authHeader == null ? void 0 : authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    try {
      decoded = await getAdminAuth().verifyIdToken(token);
    } catch {
      throw createError({ statusCode: 401, statusMessage: "Invalid or expired token" });
    }
  }
  let patientName = "";
  let patientEmail = "";
  let patientPhone = "";
  if (decoded) {
    decoded.uid;
    patientName = decoded.name || decoded.email || "Patient";
    patientEmail = decoded.email || "";
  } else {
    if (!guestName || !guestEmail || !guestPhone) {
      throw createError({ statusCode: 400, statusMessage: "Name, email and phone number are required" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(guestEmail))) {
      throw createError({ statusCode: 400, statusMessage: "Please enter a valid email address" });
    }
    patientName = String(guestName).trim();
    patientEmail = String(guestEmail).trim();
    patientPhone = String(guestPhone).trim();
  }
  const config = useRuntimeConfig();
  const db = getAdminDb();
  const slotTimestamp = Timestamp.fromDate(slotDate);
  const existingAppt = await db.collection("appointments").where("date", "==", slotTimestamp).where("status", "==", "scheduled").limit(1).get();
  if (!existingAppt.empty) {
    throw createError({ statusCode: 409, statusMessage: "This slot is no longer available" });
  }
  const existingReq = await db.collection("appointmentRequests").where("slotDate", "==", slotTimestamp).where("status", "==", "pending").limit(1).get();
  if (!existingReq.empty) {
    throw createError({ statusCode: 409, statusMessage: "This slot is no longer available" });
  }
  const availDoc = await db.collection("availability").doc("config").get();
  const slotDuration = availDoc.exists ? availDoc.data().slotDuration || 60 : 60;
  let isReturning = false;
  if (decoded) {
    const completedSnapshot = await db.collection("appointments").where("patientId", "==", decoded.uid).where("status", "==", "completed").limit(1).get();
    isReturning = !completedSnapshot.empty;
  }
  if (isReturning) {
    let zoomMeetingId = "";
    let zoomJoinUrl = "";
    if (config.zoomClientId && config.zoomClientSecret) {
      const meeting = await createZoomMeeting(
        `MaiHealth \u2014 ${patientName}`,
        slotDate.toISOString(),
        slotDuration
      );
      zoomMeetingId = meeting.meetingId;
      zoomJoinUrl = meeting.joinUrl;
    }
    const joinToken = makeJoinToken();
    const apptRef = await db.collection("appointments").add({
      patientId: decoded.uid,
      patientName,
      patientEmail,
      patientPhone,
      date: slotTimestamp,
      duration: slotDuration,
      type: type || "followup",
      status: "scheduled",
      zoomMeetingId,
      zoomJoinUrl,
      joinToken,
      notes: reason || "",
      consent: consent_,
      locale: loc,
      createdAt: Timestamp.now()
    });
    const joinPageUrl = buildJoinPageUrl(apptRef.id, joinToken);
    await sendBookingConfirmation({
      to: patientEmail,
      name: patientName,
      date: slotDate,
      duration: slotDuration,
      joinPageUrl,
      locale: loc
    });
    await sendAdminAppointmentScheduled({
      patientName,
      date: slotDate,
      duration: slotDuration,
      joinPageUrl,
      locale: loc
    });
    return {
      type: "booked",
      appointmentId: apptRef.id,
      zoomJoinUrl,
      joinPageUrl,
      date: slotDate.toISOString(),
      duration: slotDuration
    };
  } else {
    await db.collection("appointmentRequests").add({
      patientId: (decoded == null ? void 0 : decoded.uid) || null,
      patientName,
      patientEmail,
      patientPhone,
      slotDate: slotTimestamp,
      preferredDateRange: {
        start: slotTimestamp,
        end: slotTimestamp
      },
      preferredTimeOfDay: "morning",
      type: type || "initial",
      reason: reason || "",
      consent: consent_,
      locale: loc,
      status: "pending",
      createdAt: Timestamp.now()
    });
    await sendAdminNewRequest({
      name: patientName,
      email: patientEmail,
      phone: patientPhone,
      date: slotDate,
      type: type || "initial",
      reason,
      locale: loc
    });
    if (patientEmail) {
      await sendRequestReceived({
        to: patientEmail,
        name: patientName,
        date: slotDate,
        locale: loc
      });
    }
    return {
      type: "requested",
      date: slotDate.toISOString(),
      duration: slotDuration
    };
  }
});

const book_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: book_post
});

const request_post = defineEventHandler(async (event) => {
  const decoded = await verifyAuth(event);
  const body = await readBody(event);
  const { preferredDateStart, preferredDateEnd, preferredTime, type, reason, locale } = body;
  if (!preferredDateStart) {
    throw createError({ statusCode: 400, statusMessage: "Preferred date is required" });
  }
  const db = getAdminDb();
  await db.collection("appointmentRequests").add({
    patientId: decoded.uid,
    patientName: decoded.name || decoded.email,
    patientEmail: decoded.email,
    preferredDateRange: {
      start: Timestamp.fromDate(new Date(preferredDateStart)),
      end: preferredDateEnd ? Timestamp.fromDate(new Date(preferredDateEnd)) : Timestamp.fromDate(new Date(preferredDateStart))
    },
    preferredTimeOfDay: preferredTime || "morning",
    type: type || "initial",
    reason: reason || "",
    // Existing patient acting within the care relationship (Art. 9(2)(h));
    // record the policy version in force for accountability.
    policyVersion: PRIVACY_POLICY_VERSION,
    // Patient's site language — used to localise later confirmation/decline emails.
    locale: locale === "de" ? "de" : "en",
    status: "pending",
    createdAt: Timestamp.now()
  });
  const preferredDates = preferredDateEnd ? `${preferredDateStart} \u2013 ${preferredDateEnd}` : preferredDateStart;
  await sendAdminPortalRequest({
    name: decoded.name || decoded.email || "Patient",
    email: decoded.email || "",
    preferredDates,
    preferredTime: preferredTime || "morning",
    type: type || "initial",
    reason,
    locale: locale === "de" ? "de" : "en"
  });
  return { success: true };
});

const request_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: request_post
});

const bootstrap_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  const decoded = await verifyAuth(event);
  const ref = getAdminDb().collection("users").doc(decoded.uid);
  const snap = await ref.get();
  const isAdminEmail = ADMIN_EMAILS.includes((_b = (_a = decoded.email) == null ? void 0 : _a.toLowerCase()) != null ? _b : "");
  if (!snap.exists) {
    const role2 = isAdminEmail ? "admin" : "patient";
    await ref.set({
      email: (_c = decoded.email) != null ? _c : null,
      displayName: (_d = decoded.name) != null ? _d : null,
      photoURL: (_e = decoded.picture) != null ? _e : null,
      role: role2,
      journeyStage: 0,
      createdAt: FieldValue.serverTimestamp()
    });
    return { role: role2, journeyStage: 0 };
  }
  const data = snap.data();
  let role = (data == null ? void 0 : data.role) || "patient";
  if (isAdminEmail && role !== "admin") {
    role = "admin";
    await ref.update({ role });
  }
  return { role, journeyStage: (_f = data == null ? void 0 : data.journeyStage) != null ? _f : 0 };
});

const bootstrap_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: bootstrap_post
});

const config_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const decoded = await verifyAuth(event);
  const db = getAdminDb();
  const userDoc = await db.collection("users").doc(decoded.uid).get();
  if (!userDoc.exists || ((_a = userDoc.data()) == null ? void 0 : _a.role) !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Admin access required" });
  }
  const configDoc = await db.collection("availability").doc("config").get();
  if (!configDoc.exists) {
    return { weeklySchedule: [], blockedDates: [], slotDuration: 60 };
  }
  const data = configDoc.data();
  return {
    weeklySchedule: (_b = data.weeklySchedule) != null ? _b : [],
    blockedDates: (_c = data.blockedDates) != null ? _c : [],
    slotDuration: (_d = data.slotDuration) != null ? _d : 60
  };
});

const config_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: config_get
});

const slots_get = defineEventHandler(async (event) => {
  const query = getQuery$1(event);
  const { from, to } = query;
  if (!from || !to) {
    throw createError({ statusCode: 400, statusMessage: "from and to query params are required" });
  }
  const fromDate = new Date(from);
  const toDate = new Date(to);
  toDate.setHours(23, 59, 59, 999);
  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    throw createError({ statusCode: 400, statusMessage: "Invalid date format" });
  }
  const db = getAdminDb();
  const DEFAULT_SCHEDULE = [1, 2, 3, 4, 5].map((day) => ({ day, startHour: 8, endHour: 17 }));
  const availDoc = await db.collection("availability").doc("config").get();
  const config = availDoc.exists ? availDoc.data() : {};
  const blockedDates = Array.isArray(config.blockedDates) ? config.blockedDates : [];
  const slotDuration = config.slotDuration || 60;
  const weeklySchedule = Array.isArray(config.weeklySchedule) && config.weeklySchedule.length ? config.weeklySchedule : DEFAULT_SCHEDULE;
  const bookedSlots = /* @__PURE__ */ new Set();
  const apptSnapshot = await db.collection("appointments").where("date", ">=", Timestamp.fromDate(fromDate)).where("date", "<=", Timestamp.fromDate(toDate)).get();
  for (const doc of apptSnapshot.docs) {
    const d = doc.data();
    if (d.status === "scheduled" && d.date) {
      bookedSlots.add(d.date.toDate().toISOString());
    }
  }
  const reqSnapshot = await db.collection("appointmentRequests").where("slotDate", ">=", Timestamp.fromDate(fromDate)).where("slotDate", "<=", Timestamp.fromDate(toDate)).get();
  for (const doc of reqSnapshot.docs) {
    const d = doc.data();
    if (d.status === "pending" && d.slotDate) {
      bookedSlots.add(d.slotDate.toDate().toISOString());
    }
  }
  const slots = [];
  const cursor = new Date(fromDate);
  cursor.setHours(0, 0, 0, 0);
  const minBookable = new Date(Date.now() + 2 * 60 * 60 * 1e3);
  while (cursor <= toDate) {
    const dayOfWeek = cursor.getDay();
    const dateStr = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`;
    if (!blockedDates.includes(dateStr)) {
      const daySchedule = weeklySchedule.filter((s) => s.day === dayOfWeek);
      for (const schedule of daySchedule) {
        const slotTime = new Date(cursor);
        slotTime.setHours(schedule.startHour, 0, 0, 0);
        const endTime = new Date(cursor);
        endTime.setHours(schedule.endHour, 0, 0, 0);
        while (slotTime < endTime) {
          if (slotTime > minBookable && !bookedSlots.has(slotTime.toISOString())) {
            slots.push(slotTime.toISOString());
          }
          slotTime.setMinutes(slotTime.getMinutes() + slotDuration);
        }
      }
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return { slots, slotDuration };
});

const slots_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: slots_get
});

const contact_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { firstName, lastName, email, phone, message, consent, locale } = body;
  if (!firstName || !lastName || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: "Missing required fields" });
  }
  if (consent !== true) {
    throw createError({ statusCode: 400, statusMessage: "Consent is required to process this request" });
  }
  const db = getAdminDb();
  await db.collection("contactSubmissions").add({
    firstName,
    lastName,
    email,
    phone: phone || "",
    message,
    read: false,
    locale: locale === "de" ? "de" : "en",
    consent: consentRecord(event),
    createdAt: Timestamp.now()
  });
  await sendAdminContactForm({ firstName, lastName, email, phone, message, locale });
  return { success: true };
});

const contact_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: contact_post
});

const reminders = defineEventHandler(async (event) => {
  var _a;
  const config = useRuntimeConfig();
  if (!config.cronSecret) {
    throw createError({ statusCode: 503, statusMessage: "Cron is not configured" });
  }
  const bearer = (_a = getHeader(event, "authorization")) == null ? void 0 : _a.replace(/^Bearer\s+/i, "");
  const provided = bearer || getQuery$1(event).secret;
  if (provided !== config.cronSecret) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const db = getAdminDb();
  const now = /* @__PURE__ */ new Date();
  const inOneHour = new Date(now.getTime() + 60 * 60 * 1e3);
  const snap = await db.collection("appointments").where("status", "==", "scheduled").where("date", ">", Timestamp.fromDate(now)).where("date", "<=", Timestamp.fromDate(inOneHour)).get();
  let sent = 0;
  let skipped = 0;
  let failed = 0;
  for (const doc of snap.docs) {
    const a = doc.data();
    if (a.reminderSent) {
      skipped++;
      continue;
    }
    if (!a.patientEmail) {
      await doc.ref.update({ reminderSent: true });
      skipped++;
      continue;
    }
    try {
      let joinToken = a.joinToken;
      if (!joinToken) {
        joinToken = makeJoinToken();
        await doc.ref.update({ joinToken });
      }
      const ok = await sendAppointmentReminder({
        to: a.patientEmail,
        name: a.patientName || "there",
        date: a.date.toDate(),
        duration: a.duration || 60,
        joinPageUrl: buildJoinPageUrl(doc.id, joinToken),
        locale: a.locale === "de" ? "de" : "en"
      });
      if (ok) {
        await doc.ref.update({ reminderSent: true, reminderSentAt: Timestamp.now() });
        sent++;
      } else {
        skipped++;
      }
    } catch (err) {
      console.error(`Reminder failed for appointment ${doc.id}:`, err);
      failed++;
    }
  }
  return { ok: true, checked: snap.size, sent, skipped, failed };
});

const reminders$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: reminders
});

const _id__get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e;
  const id = getRouterParam(event, "id");
  const token = getQuery$1(event).t;
  if (!id || typeof token !== "string" || !token) {
    throw createError({ statusCode: 400, statusMessage: "Missing appointment id or token" });
  }
  const db = getAdminDb();
  const doc = await db.collection("appointments").doc(id).get();
  if (!doc.exists) {
    throw createError({ statusCode: 404, statusMessage: "Appointment not found" });
  }
  const a = doc.data();
  if (!a.joinToken || a.joinToken !== token) {
    throw createError({ statusCode: 403, statusMessage: "Invalid join link" });
  }
  const start = (_e = (_d = (_c = (_b = (_a = a.date) == null ? void 0 : _a.toDate) == null ? void 0 : _b.call(_a)) == null ? void 0 : _c.getTime) == null ? void 0 : _d.call(_c)) != null ? _e : 0;
  const duration = a.duration || 60;
  const now = Date.now();
  const opensAt = start - 15 * 60 * 1e3;
  const closesAt = start + duration * 60 * 1e3 + 30 * 60 * 1e3;
  const joinable = a.status === "scheduled" && now >= opensAt && now <= closesAt;
  return {
    status: a.status || "scheduled",
    patientName: a.patientName || "",
    date: start ? new Date(start).toISOString() : null,
    duration,
    locale: a.locale === "de" ? "de" : "en",
    opensAt: start ? new Date(opensAt).toISOString() : null,
    joinable,
    // Only reveal the Zoom link inside the join window.
    joinUrl: joinable ? a.zoomJoinUrl || "" : ""
  };
});

const _id__get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__get
});

const newsletter_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, locale, consent } = body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    throw createError({ statusCode: 400, statusMessage: "A valid email is required" });
  }
  if (consent !== true) {
    throw createError({ statusCode: 400, statusMessage: "Consent is required to subscribe" });
  }
  const normalizedEmail = String(email).trim().toLowerCase();
  const db = getAdminDb();
  const origin = getRequestURL(event).origin;
  const existing = await db.collection("newsletterSubscribers").where("email", "==", normalizedEmail).limit(1).get();
  if (!existing.empty && existing.docs[0].data().status === "confirmed") {
    return { success: true };
  }
  const confirmToken = randomUUID();
  const unsubscribeToken = randomUUID();
  if (existing.empty) {
    await db.collection("newsletterSubscribers").add({
      email: normalizedEmail,
      locale: locale || "en",
      status: "pending",
      confirmToken,
      unsubscribeToken,
      consent: consentRecord(event),
      subscribedAt: Timestamp.now(),
      confirmedAt: null
    });
  } else {
    await existing.docs[0].ref.update({
      locale: locale || "en",
      status: "pending",
      confirmToken,
      consent: consentRecord(event),
      subscribedAt: Timestamp.now()
    });
  }
  await sendNewsletterConfirm({
    to: normalizedEmail,
    confirmUrl: `${origin}/api/newsletter/confirm?token=${confirmToken}`,
    locale: locale || "en"
  });
  return { success: true };
});

const newsletter_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: newsletter_post
});

function simplePage(opts) {
  const { title, message, ok = true } = opts;
  const accent = ok ? "#8B9A6B" : "#B45454";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${title} \u2014 MaiHealth</title>
<style>
  body { margin:0; font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif; background:#F5F1EC; color:#2D3A24; display:flex; min-height:100vh; align-items:center; justify-content:center; padding:24px; }
  .card { background:#fff; border:1px solid #E8E4DF; border-radius:20px; padding:40px 32px; max-width:440px; text-align:center; box-shadow:0 8px 30px rgba(0,0,0,.04); }
  .badge { width:56px; height:56px; border-radius:50%; background:${accent}1a; color:${accent}; display:flex; align-items:center; justify-content:center; font-size:26px; margin:0 auto 20px; }
  h1 { font-size:22px; margin:0 0 10px; }
  p { font-size:15px; line-height:1.6; color:#2D3A24cc; margin:0 0 24px; }
  a { display:inline-block; color:${accent}; font-weight:600; text-decoration:none; font-size:14px; }
  .brand { margin-top:28px; font-size:13px; color:#999; }
</style>
</head>
<body>
  <div class="card">
    <div class="badge">${ok ? "\u2713" : "!"}</div>
    <h1>${title}</h1>
    <p>${message}</p>
    <a href="https://mai-health.de">\u2190 mai-health.de</a>
    <div class="brand"><strong>Mai</strong>Health</div>
  </div>
</body>
</html>`;
}

const confirm_get = defineEventHandler(async (event) => {
  setHeader(event, "content-type", "text/html; charset=utf-8");
  const token = String(getQuery$1(event).token || "");
  if (!token) {
    return simplePage({ ok: false, title: "Invalid link", message: "This confirmation link is missing or malformed." });
  }
  const db = getAdminDb();
  const snap = await db.collection("newsletterSubscribers").where("confirmToken", "==", token).limit(1).get();
  if (snap.empty) {
    return simplePage({ ok: false, title: "Link expired", message: "This confirmation link is no longer valid. It may have already been used. You can subscribe again from our website." });
  }
  await snap.docs[0].ref.update({
    status: "confirmed",
    confirmedAt: Timestamp.now(),
    confirmToken: null
  });
  return simplePage({
    title: "Subscription confirmed",
    message: "Thank you \u2014 your subscription to the MaiHealth newsletter is now active. You can unsubscribe at any time via the link in every email."
  });
});

const confirm_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: confirm_get
});

const unsubscribe_get = defineEventHandler(async (event) => {
  setHeader(event, "content-type", "text/html; charset=utf-8");
  const token = String(getQuery$1(event).token || "");
  if (!token) {
    return simplePage({ ok: false, title: "Invalid link", message: "This unsubscribe link is missing or malformed." });
  }
  const db = getAdminDb();
  const snap = await db.collection("newsletterSubscribers").where("unsubscribeToken", "==", token).limit(1).get();
  if (snap.empty) {
    return simplePage({ ok: false, title: "Link not found", message: "We could not find a subscription for this link. You may already be unsubscribed." });
  }
  await snap.docs[0].ref.update({
    status: "unsubscribed",
    unsubscribedAt: Timestamp.now(),
    confirmToken: null
  });
  return simplePage({
    title: "You have been unsubscribed",
    message: "You will no longer receive the MaiHealth newsletter. We are sorry to see you go \u2014 you can resubscribe any time from our website."
  });
});

const unsubscribe_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: unsubscribe_get
});

const Vue3 = version[0] === "3";

function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref) {
  if (ref instanceof Promise || ref instanceof Date || ref instanceof RegExp)
    return ref;
  const root = resolveUnref(ref);
  if (!ref || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved;
  }
  return root;
}

const VueReactivityPlugin = defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput(entry.input);
    }
  }
});

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}

const unheadPlugins = true ? [CapoPlugin({ track: true })] : [];

const renderSSRHeadOptions = {"omitLineBreaks":false};

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const getClientManifest = () => import('file:///Users/Rudolf/Work/mai/.nuxt/dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getServerEntry = () => import('file:///Users/Rudolf/Work/mai/.nuxt/dist/server/server.mjs').then((r) => r.default || r);
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
    {
      return APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG;
    }
  });
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules = ssrContext.modules || /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
const ISLAND_SUFFIX_RE = /\.json(\?.*)?$/;
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const PAYLOAD_URL_RE = /\/_payload.json(\?.*)?$/ ;
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && ssrError.statusCode) {
    ssrError.statusCode = Number.parseInt(ssrError.statusCode);
  }
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const isRenderingIsland = event.path.startsWith("/__nuxt_island");
  const islandContext = isRenderingIsland ? await getIslandContext(event) : void 0;
  let url = ssrError?.url || islandContext?.url || event.path;
  const isRenderingPayload = PAYLOAD_URL_RE.test(url) && !isRenderingIsland;
  if (isRenderingPayload) {
    url = url.substring(0, url.lastIndexOf("/")) || "/";
    event._path = url;
    event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  const head = createServerHead({
    plugins: unheadPlugins
  });
  const headEntryOptions = { mode: "server" };
  if (!isRenderingIsland) {
    head.push(appHead, headEntryOptions);
  }
  const ssrContext = {
    url,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || routeOptions.ssr === false && !isRenderingIsland || (false),
    head,
    error: !!ssrError,
    nuxt: void 0,
    /* NuxtApp */
    payload: ssrError ? { error: ssrError } : {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set(),
    islandContext
  };
  const renderer = ssrContext.noSSR ? await getSPARenderer() : await getSSRRenderer();
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response2 = renderPayloadResponse(ssrContext);
    return response2;
  }
  const inlinedStyles = isRenderingIsland ? await renderInlineStyles(ssrContext.modules ?? []) : [];
  const NO_SCRIPTS = routeOptions.experimentalNoScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (ssrContext._preloadManifest) {
    head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    head.push({ style: inlinedStyles });
  }
  {
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (!isRenderingIsland || resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      head.push({ link }, headEntryOptions);
    }
  }
  if (!NO_SCRIPTS && !isRenderingIsland) {
    head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.experimentalNoScripts && !isRenderingIsland) {
    head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition: "head",
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(head, renderSSRHeadOptions);
  const htmlContext = {
    island: isRenderingIsland,
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  if (isRenderingIsland && islandContext) {
    const islandHead = {};
    for (const entry of head.headEntries()) {
      for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
        const currentValue = islandHead[key];
        if (Array.isArray(currentValue)) {
          currentValue.push(...value);
        }
        islandHead[key] = value;
      }
    }
    islandHead.link ||= [];
    islandHead.style ||= [];
    const islandResponse = {
      id: islandContext.id,
      head: islandHead,
      html: getServerComponentHTML(htmlContext.body),
      components: getClientIslandResponse(ssrContext),
      slots: getSlotIslandResponse(ssrContext)
    };
    await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
    const response2 = {
      body: JSON.stringify(islandResponse, null, 2),
      statusCode: getResponseStatus(event),
      statusMessage: getResponseStatusText(event),
      headers: {
        "content-type": "application/json;charset=utf-8",
        "x-powered-by": "Nuxt"
      }
    };
    return response2;
  }
  const response = {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
  return response;
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}
async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}
function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}
function getServerComponentHTML(body) {
  const match = body[0].match(ROOT_NODE_REGEX);
  return match?.[1] || body[0];
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=[^;]*;(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, slot] = match;
      if (!slot) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const renderer$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: renderer
});

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: styles
});

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template
});
//# sourceMappingURL=index.mjs.map
