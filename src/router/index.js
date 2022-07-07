import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'table' }
      }
    ]
  },
  {
    path: '/template',
    component: Layout,
    redirect: '/template',
    children: [
      {
        path: 'template',
        name: '项目模板',
        component: () => import('@/views/template/index'),
        meta: { title: '项目模板', icon: 'link' }
      }
    ]
  },
  {
    path: '/electron',
    component: Layout,
    meta: { title: 'electron', icon: 'user' },
    alwaysShow: true,
    children: [
      {
        path: 'main-renderer-comm',
        component: () => import('@/views/electron/MainRendererComm.vue'),
        name: 'MainRenderer',
        meta: { title: 'Main Renderer', icon: 'table' }
      }
    ]
  },
  // {
  //   path: '/writing-demo',
  //   component: Layout,
  //   meta: { title: 'Writing Demo', icon: 'eye-open' },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'hook',
  //       component: () => import('@/views/example/hook/Hook.vue'),
  //       name: 'Hook',
  //       meta: { title: 'Hook-Demo' }
  //     },
  //     {
  //       path: 'vuex-use',
  //       component: () => import('@/views/example/vuex-use/VuexUse.vue'),
  //       name: 'VuexUse',
  //       meta: { title: 'Vuex-Demo' }
  //     },
  //     {
  //       path: 'mock-test',
  //       component: () => import('@/views/example/mock-test/MockTest.vue'),
  //       name: 'MockTest',
  //       meta: { title: 'Mock-Demo' }
  //     },

  //     {
  //       path: 'svg-icon',
  //       component: () => import('@/views/example/svg-icon/SvgIcon.vue'),
  //       name: 'SvgIcon',
  //       meta: { title: 'Svg-Demo' }
  //     },
  //     {
  //       path: 'parent-children',
  //       component: () => import('@/views/example/parent-children/Parent.vue'),
  //       name: 'Parent',
  //       meta: { title: 'Parent-Children' }
  //     }
  //   ]
  // },
  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'roleIndex',
  //       component: () => import('@/views/permission/index'),
  //       name: 'Permission',
  //       meta: {
  //         title: 'Role Index'
  //         //roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'code-index',
  //       component: () => import('@/views/permission/CodePermission'),
  //       name: 'CodePermission',
  //       meta: {
  //         title: 'Code Index'
  //       }
  //     },
  //     {
  //       path: 'code-page',
  //       component: () => import('@/views/permission/CodePage'),
  //       name: 'CodePage',
  //       meta: {
  //         title: 'Code Page',
  //         code: 1
  //       }
  //     },
  //     // 404 page must be placed at the end !!!
  //     // using pathMatch install of "*" in vue-router 4.0
  //     { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
  // ]
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

export default router
