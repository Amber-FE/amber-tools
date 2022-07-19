const { ipcRenderer, remote, shell } = require('electron')
// 暴露给子窗口的方法
const setFullScreen = remote.getCurrentWindow().setFullScreen
const isFullScreen = remote.getCurrentWindow().isFullScreen
var window_id = null
// 在顶部插入一个可以移动的dom
function initTopDrag() {
  const topDiv = document.createElement('div') // 创建节点
  const placeholder = document.createElement('div') // 创建节点
  topDiv.innerHTML =
    '<div id="amber-tools-header-left" style="pointer-events: none; flex:1;-webkit-app-region:drag"></div><div id="amber-tools-header-right" style="width: 80px;"><span class="amber-tools-header-right-min" style="margin: 6px; width: 12px;display: inline-block;height: 12px;border: 1px solid rgb(214, 73, 54);text-align: center;overflow: hidden;line-height: 12px;border-radius: 25px;background: rgb(255,87,64);" id="minSize"><svg t="1657696143457" style="display: none;width: 10px;height: 10px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="854" width="200" height="200"><path d="M791.333 465.446l-558.668 0c-25.73 0-46.554 20.847-46.554 46.554s20.823 46.554 46.554 46.554l558.666 0c25.732 0 46.555-20.847 46.555-46.554s-20.823-46.554-46.554-46.554z" p-id="855"></path></svg></span><span class="amber-tools-header-right-min" style="margin: 6px;width: 12px;display: inline-block;height: 12px;border: 1px solid rgb(199, 156, 62);text-align: center;overflow: hidden;line-height: 12px;border-radius: 25px;background: rgb(244,191,77);" id="maxSize"><svg t="1657697605627" style="display: none;width:10px;height:10px" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="998" width="200" height="200"><path d="M856 376H648V168c0-8.8-7.2-16-16-16H168c-8.8 0-16 7.2-16 16v464c0 8.8 7.2 16 16 16h208v208c0 8.8 7.2 16 16 16h464c8.8 0 16-7.2 16-16V392c0-8.8-7.2-16-16-16z m-480 16v188H220V220h360v156H392c-8.8 0-16 7.2-16 16z m204 52v136H444V444h136z m224 360H444V648h188c8.8 0 16-7.2 16-16V444h156v360z" p-id="999"></path></svg></span><span class="amber-tools-header-right-min" style="margin: 6px;width: 12px;display: inline-block;height: 12px;border: 1px solid rgb(80, 161, 71);text-align: center;overflow: hidden;line-height: 12px;border-radius: 25px;background: rgb(97,196,87);" id="windowClose"><svg t="1657698038498" style="display: none;width: 10px;height:10px" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1142" width="200" height="200"><path d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z" p-id="1143"></path></svg></span></div>'
  topDiv.className = 'amber-tools-header'
  topDiv.style.position = 'fixed' // 一直在顶部
  topDiv.style.top = '0'
  topDiv.style.left = '0'
  topDiv.style.height = '25px' // 顶部25px才可拖动
  topDiv.style.width = '100%' // 宽度100%
  topDiv.style.display = 'flex'
  placeholder.style.height = '25px' // 顶部占位元素
  placeholder.style.width = '100%' // 顶部占位元素
  placeholder.style.padding = '0' // 顶部占位元素
  placeholder.style.margin = '0' // 顶部占位元素
  topDiv.style.zIndex = '9999' // 悬浮于最外层
  // topDiv.style.pointerEvents = 'none' // 用于点击穿透
  // // @ts-ignore
  topDiv.style['-webkit-user-select'] = 'none' // 禁止选择文字
  // document.body.insertBefore(placeholder, document.body.firstChild);
  document.body.insertBefore(topDiv, document.body.firstChild)
  updateOnlineStatus()
  updateTopStyle()
}
ipcRenderer.on('distributeIds', (e, item) => {
  console.log('renderer', item)
  window_id = item.id
  window.id = window_id
})
window.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
  initTopDrag()
})
function windowsOperating(params) {
  ipcRenderer.send(params, { id: window_id })
}
const updateTopStyle = () => {
  let right = document.querySelector('#amber-tools-header-right')
  right.onmouseover = function () {
    //设置其背景颜色为黄色
    let min = right.getElementsByClassName('amber-tools-header-right-min')
    for (let o = 0; o < min.length; o++) {
      const element = min[o]
      element.style.cursor = 'pointer'
      let svgStyle = element.getElementsByTagName('svg')
      svgStyle[0].style.display = 'block'
    }
  }
  right.onmouseout = function () {
    let min = right.getElementsByClassName('amber-tools-header-right-min')
    for (let o = 0; o < min.length; o++) {
      const element = min[o]
      let svgStyle = element.getElementsByTagName('svg')
      svgStyle[0].style.display = 'none'
    }
  }
}
const updateOnlineStatus = () => {
  let left = document.querySelector('#amber-tools-header-left')
  if (!navigator.onLine) {
    left.innerHTML = ''
    left.style.background = 'rgb(244,191,77)'
    left.style.textAlign = 'center'
    left.style.fontWeight = 'bold'
  } else {
    left.innerHTML = ''
    left.style.background = ''
  }
}
window.onload = () => {
  let minSize = document.querySelector('#minSize')
  let maxSize = document.querySelector('#maxSize')
  let windowClose = document.querySelector('#windowClose')
  minSize.onclick = () => {
    windowsOperating('minSize')
  }
  maxSize.onclick = () => {
    windowsOperating('maxSize')
  }
  windowClose.onclick = () => {
    windowsOperating('windowClose')
  }
  window.amber = {
    minimize: () => windowsOperating('minSize'), // 最小化
    maximize: () => windowsOperating('maxSize'), // 最大化、还原窗口
    handleClose: () => windowsOperating('windowClose'), // 关闭窗口
    setFullScreen, // 设置全屏 setFullScreen(flag)
    isFullScreen, // 窗口当前是否已全屏
    ipcRenderer, // electron 渲染进程ipcRenderer通讯器
    remote, // 暴露remote 有安全风险
    shell // 暴露shell 有安全风险
  }
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)
