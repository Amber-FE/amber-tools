<template>
  <div class="template-box">
    <el-row :gutter="15">
      <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6" v-for="(item, index) in templateList" :key="index">
        <div class="cell-box">
          <div class="cell-box-name">{{ item.name }}</div>
          <div class="cell-box-icon">
            <div class="cell-box-icon-item" v-for="(items, i) in item.keywords" :key="items + i">
              <svg-icon :icon-class="items" className="common" />
            </div>
          </div>
          <div class="cell-box-author">
            <svg-icon icon-class="user" className="nav-bar" />
            {{ item.author }}
          </div>
          <div class="cell-box-des">{{ item.description }}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted, getCurrentInstance } from 'vue'
import config from '@/config/index'

export default {
  name: 'Template',
  setup() {
    const ctx = getCurrentInstance()
    console.log(ctx)
    console.log('1-开始创建组件-setup')
    const data = reactive({})
    onBeforeMount(() => {
      console.log('2.组件挂载页面之前执行----onBeforeMount')
    })
    onMounted(() => {
      console.log('3.-组件挂载到页面之后执行-------onMounted')
    })
    const refData = toRefs(data)
    return {
      ...refData,
      templateList: config.templateList
    }
  }
}
</script>
<style lang="scss" scoped>
.template-box {
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
</style>
