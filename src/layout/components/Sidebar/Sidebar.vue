<template>
  <div id="Sidebar" class="reset-menu-style">
    <!--logo-->
    <Logo :collapse="!isCollapse" v-if="settings.sidebarLogo" />
    <!--router nav-->
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="!isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    <div class="reset-menu-style-collapse">
      <el-tooltip :content="!isCollapse ? '展开' : '收起'" placement="top">
        <div class="reset-menu-style-collapse-box" @click="toggleSideBar">
          <i v-if="isCollapse" class="iconfont icon-xiangzuoshouqi"></i>
          <i v-else class="iconfont icon-xiangyouzhankai"></i>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance } from 'vue'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
//导入配置文件
import settings from '@/settings'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
let { proxy } = getCurrentInstance()
const store = useStore()
const route = useRoute()
let routes = computed(() => {
  return store.state.permission.routes
})
const isCollapse = computed(() => {
  return store.state.app.sidebar.opened
})
const variables = computed(() => {
  // let data = JSON.parse(scssVariables.replace(/:export\s*/, ''))
  // console.log('scssVariables')
  // console.log(typeof data)
  return {
    menuText: '#bfcbd9',
    menuActiveText: '#409EFF',
    subMenuActiveText: '#f4f4f5',
    menuBg: '#304156',
    menuHover: '#263445',
    subMenuBg: '#1f2d3d',
    subMenuHover: '#001528',
    sideBarWidth: '210px'
  }
})
const activeMenu = computed(() => {
  const { meta, fullPath } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return fullPath
})
const toggleSideBar = () => {
  proxy.$store.commit('app/M_toggleSideBar')
}
</script>

<style lang="scss">
.reset-menu-style {
  .el-menu {
    border-right: none;
  }
  .el-scrollbar__wrap {
    padding-bottom: 100px;
  }
  &-collapse {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 50px;
    width: 100%;
    z-index: 99999;
    line-height: 50px;
    background: #2b2f3a;
    text-align: left;
    overflow: hidden;
    color: #fff;
    opacity: 0.4;
    &-box {
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
