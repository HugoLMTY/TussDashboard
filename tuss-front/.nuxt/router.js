import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3543fae6 = () => interopDefault(import('../pages/settings.vue' /* webpackChunkName: "pages/settings" */))
const _aabc50c2 = () => interopDefault(import('../pages/projects/barrelinator/index.vue' /* webpackChunkName: "pages/projects/barrelinator/index" */))
const _53a39201 = () => interopDefault(import('../pages/projects/fygw/index.vue' /* webpackChunkName: "pages/projects/fygw/index" */))
const _ec69e992 = () => interopDefault(import('../pages/projects/gearout/index.vue' /* webpackChunkName: "pages/projects/gearout/index" */))
const _b961042e = () => interopDefault(import('../pages/projects/grab-a-tube/index.vue' /* webpackChunkName: "pages/projects/grab-a-tube/index" */))
const _26c38ae0 = () => interopDefault(import('../pages/projects/paralafiche/index.vue' /* webpackChunkName: "pages/projects/paralafiche/index" */))
const _0a3ef09f = () => interopDefault(import('../pages/projects/sandbox/index.vue' /* webpackChunkName: "pages/projects/sandbox/index" */))
const _2dfb1658 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/settings",
    component: _3543fae6,
    name: "settings"
  }, {
    path: "/projects/barrelinator",
    component: _aabc50c2,
    name: "projects-barrelinator"
  }, {
    path: "/projects/fygw",
    component: _53a39201,
    name: "projects-fygw"
  }, {
    path: "/projects/gearout",
    component: _ec69e992,
    name: "projects-gearout"
  }, {
    path: "/projects/grab-a-tube",
    component: _b961042e,
    name: "projects-grab-a-tube"
  }, {
    path: "/projects/paralafiche",
    component: _26c38ae0,
    name: "projects-paralafiche"
  }, {
    path: "/projects/sandbox",
    component: _0a3ef09f,
    name: "projects-sandbox"
  }, {
    path: "/",
    component: _2dfb1658,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
