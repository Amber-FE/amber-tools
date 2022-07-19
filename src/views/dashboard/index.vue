<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ username }}</div> -->
    <div class="dashboard-container-body">
      <div class="dashboard-container-body-list">
        <el-row :gutter="15">
          <el-col
            :xs="12"
            :sm="8"
            :md="8"
            :lg="6"
            :xl="6"
            v-for="(item, index) in config.project"
            :key="index"
            @click="openWin(item)"
          >
            <div class="cell-box">
              <div class="cell-box-name">
                <img :src="item.icon" :alt="item.name" />
                {{ item.name }}
              </div>

              <!-- <div class="cell-box-icon">
                <div class="cell-box-icon-item" v-for="(items, i) in item.keywords" :key="items + i">
                  <svg-icon :icon-class="items" className="common" />
                </div>
              </div> -->
              <!-- <div class="cell-box-author">
                <svg-icon icon-class="user" className="nav-bar" />
                {{ item.author }}
              </div> -->
              <div class="cell-box-des">{{ item.description }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup>
// const { BrowserWindow } = require('electron').remote
// const newWin = () => {
//   new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true, //渲染进程中使用nodejs
//       contextIsolation: false,
//       enableRemoteModule: true //渲染线程中使用remote模块
//     }
//   })
// }
// let path = require('path')
// const string = path.join('1', '2')
// console.log(string)
import { computed } from 'vue'
import { useStore } from 'vuex'
import config from '@/config/index'
const { ipcRenderer } = require('electron')

let store = useStore()
const username = computed(() => {
  return store.state.user.username
})
const openWin = (item) => {
  console.log('w', item)
  ipcRenderer.send('newPlatform', { url: item.devUrl, type: 'loadURL' })
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    //margin: 30px;
    &-body {
      &-list {
        overflow: hidden;
        & .cell-box {
          border: 1px solid #f5f5f5;
          margin: 10px 5px;
          overflow: hidden;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
          white-space: pre-wrap;
          word-break: break-all;
          padding: 15px;
          box-sizing: border-box;
          transition: all 0.5s ease;
          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 2px 8px rgb(64 158 255 / 30%);
          }
          &-name {
            font-weight: bold;
            font-size: 16px;
            color: #777;
          }
          &-icon {
            display: flex;
            &-item {
              padding: 4px;
              & .svg-icon {
                color: inherit !important;
              }
            }
          }
          &-author {
            color: dimgray;
            margin-bottom: 5px;
          }
          &-des {
            font-size: 12px;
            color: #aaa;
            height: 50px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            margin-bottom: 4px;
          }
        }
      }
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
