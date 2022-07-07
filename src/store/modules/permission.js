import { constantRoutes, asyncRoutes } from '@/router'

const state = {
  routes: [] //将过滤后的异步路由和静态路由集合
}

const actions = {}

const mutations = {
  M_routes: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
