import router from '@/router'
import settings from './settings'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/getPageTitle'

// const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  // start progress bar
  if (settings.isNeedNprogress) NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  next()
})

router.afterEach(() => {
  if (settings.isNeedNprogress) NProgress.done()
})
