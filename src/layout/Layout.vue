<template>
  <div :class="classObj" class="layout-wrapper">
    <FlexTools />
    <!-- <div className="layout-wrapper__drag"></div>
    <div className="layout-wrapper__controls">
      <span
        className="layout-wrapper__controls-item"
        @click="
          () => {
            ipcRenderer.send('window-min')
          }
        "
      >
        <i class="iconfont icon-minus"></i>
      </span>
      <span
        className="layout-wrapper__controls-item"
        @click="
          () => {
            ipcRenderer.send('window-max')
          }
        "
      >
        <i class="iconfont icon-block"></i>
      </span>
      <span
        className="layout-wrapper__controls-item red"
        @click="
          () => {
            ipcRenderer.send('window-close')
          }
        "
      >
        <i class="iconfont icon-close"></i>
      </span>
    </div> -->
    <!--left side-->
    <Sidebar class="sidebar-container" v-if="settings.showLeftMenu" />
    <!--right container-->
    <div class="main-container">
      <!-- <Navbar /> -->
      <!-- <TagsView v-if="settings.showTagsView" /> -->
      <AppMain />
    </div>
  </div>
</template>
<!--原理vue2.0-->
<script>
/*可以设置默认的名字*/
export default {
  name: 'Layout'
}
</script>

<script setup>
import { Sidebar, Navbar, AppMain, TagsView, FlexTools } from './components'
import { getCurrentInstance, computed, onBeforeMount } from 'vue'
import ResizeHook from './hook/ResizeHandler'
import settings from '@/settings'
import store from '@/store'
let { proxy } = getCurrentInstance()
// const { ipcRenderer } = require('electron')
let opened = computed(() => {
  return proxy.$store.state.app.sidebar.opened
})
let classObj = computed(() => {
  return {
    closeSidebar: !opened.value,
    hideSidebar: !settings.showLeftMenu
  }
})
//import ResizeHook to  listen  page size that  open or close
ResizeHook()
onBeforeMount(() => {
  store.commit('permission/M_routes', [])
})
</script>

<style lang="scss" scoped>
.layout-wrapper {
  overflow: hidden;
  &__controls {
    position: absolute;
    right: 0;
    -webkit-app-region: no-drag;
    top: 0;
    z-index: 200;
    border-radius: 0 0 3px 3px;
    padding: 0;
    background: #bfbfbf10;

    &-item {
      display: inline-block;
      padding: 5px 10px;
      color: #ccc;
      font-size: 12px;
      -webkit-app-region: no-drag;
      &:hover {
        color: white;
        background: gray;
      }
      &.red:hover {
        background: none;
        background-color: red;
      }
    }
  }
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  background-color: $menuBg;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.closeSidebar {
  .sidebar-container {
    width: 54px !important;
  }
  .main-container {
    margin-left: 54px !important;
  }
}
.hideSidebar {
  .sidebar-container {
    width: 0 !important;
  }
  .main-container {
    margin-left: 0;
  }
}
</style>
