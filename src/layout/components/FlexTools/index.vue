<template>
  <div
    style="
      position: fixed;
      top: 0px;
      left: 0px;
      height: 25px;
      width: 100%;
      display: flex;
      z-index: 9999;
      user-select: none;
    "
  >
    <div id="amber-tools-header-left" style="pointer-events: none; flex: 1; -webkit-app-region: drag"></div>
    <div id="amber-tools-header-right" style="width: 80px; cursor: pointer">
      <span
        class="amber-tools-header-right-min"
        style="
          margin: 6px;
          width: 12px;
          display: inline-block;
          height: 12px;
          border: 1px solid rgb(214, 73, 54);
          text-align: center;
          overflow: hidden;
          line-height: 10px;
          border-radius: 25px;
          background: rgb(255, 87, 64);
        "
        id="minSize"
        @click="
          () => {
            ipcRenderer.send('window-min')
          }
        "
      >
        <svg
          t="1657696143457"
          style="display: none; width: 10px; height: 10px"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="854"
          width="200"
          height="200"
        >
          <path
            d="M791.333 465.446l-558.668 0c-25.73 0-46.554 20.847-46.554 46.554s20.823 46.554 46.554 46.554l558.666 0c25.732 0 46.555-20.847 46.555-46.554s-20.823-46.554-46.554-46.554z"
            p-id="855"
          ></path>
        </svg>
      </span>
      <span
        class="amber-tools-header-right-min"
        style="
          margin: 6px;
          width: 12px;
          display: inline-block;
          height: 12px;
          border: 1px solid rgb(199, 156, 62);
          text-align: center;
          overflow: hidden;
          line-height: 10px;
          border-radius: 25px;
          background: rgb(244, 191, 77);
        "
        id="maxSize"
        @click="
          () => {
            ipcRenderer.send('window-max')
          }
        "
      >
        <svg
          t="1657697605627"
          style="display: none; width: 10px; height: 10px"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="998"
          width="200"
          height="200"
        >
          <path
            d="M856 376H648V168c0-8.8-7.2-16-16-16H168c-8.8 0-16 7.2-16 16v464c0 8.8 7.2 16 16 16h208v208c0 8.8 7.2 16 16 16h464c8.8 0 16-7.2 16-16V392c0-8.8-7.2-16-16-16z m-480 16v188H220V220h360v156H392c-8.8 0-16 7.2-16 16z m204 52v136H444V444h136z m224 360H444V648h188c8.8 0 16-7.2 16-16V444h156v360z"
            p-id="999"
          ></path>
        </svg>
      </span>
      <span
        class="amber-tools-header-right-min"
        style="
          margin: 6px;
          width: 12px;
          display: inline-block;
          height: 12px;
          border: 1px solid rgb(80, 161, 71);
          text-align: center;
          overflow: hidden;
          line-height: 10px;
          border-radius: 25px;
          background: rgb(97, 196, 87);
        "
        id="windowClose"
        @click="
          () => {
            ipcRenderer.send('window-close')
          }
        "
      >
        <svg
          t="1657698038498"
          style="display: none; width: 10px; height: 10px"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1142"
          width="200"
          height="200"
        >
          <path
            d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z"
            p-id="1143"
          ></path>
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlexTools',
  setup() {
    const { ipcRenderer } = require('electron')
    return {
      ipcRenderer
    }
  }
}
</script>
<style scoped>
#amber-tools-header-right:hover .amber-tools-header-right-min svg {
  display: inline-block !important;
}
</style>
