<template>
  <div>Template</div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted, getCurrentInstance } from 'vue'

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
      ...refData
    }
  }
}
</script>
<style scoped></style>
