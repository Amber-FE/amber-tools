const { BrowserWindow, app, ipcMain, dialog } = require('electron')
const fs = require('fs')
const path = require('path')
const isDev = require('electron-is-dev')
var mainWindowId = null
var closeWindowId = null
var rendererId = new Map()
app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minHeight: 768,
    minWidth: 1024,
    frame: false,
    resizable: true,
    show: false,
    maximize: true,
    webPreferences: {
      nodeIntegration: true, //渲染进程中使用nodejs
      contextIsolation: false,
      enableRemoteModule: true //渲染线程中使用remote模块
    }
  })
  mainWindowId = mainWindow.id
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  //dev development
  const waitOn = require('wait-on')
  if (isDev) {
    mainWindow.loadFile('loading.html')
    // wait for http://localhost:5006 to load
    // detail to using look https://github.com/jeffbski/wait-on
    let opts = {
      resources: ['http://localhost:5006/index.html'],
      delay: 1000, // initial delay in ms, default 0
      timeout: 6000 // timeout in ms, default Infinity
    }
    waitOn(opts, (err) => {
      if (err) {
        return
      }
      mainWindow.loadURL('http://localhost:5006')
      //open devTools
      mainWindow.webContents.openDevTools({ mode: 'right' })
    })
  } else {
    mainWindow.loadFile('dist/index.html')
  }
  //开启remote
  require('@electron/remote/main').initialize()
  require('@electron/remote/main').enable(mainWindow.webContents)
  //引入相应的主线程
  require('./electron/main/MainRendererComm')

  ipcMain.on('window-min', () => {
    //窗口最小化
    mainWindow.minimize()
  })

  ipcMain.on('window-max', () => {
    //窗口最大化
    if (mainWindow.isMaximized()) {
      mainWindow.restore()
    } else {
      mainWindow.maximize()
    }
  })

  ipcMain.on('window-close', () => {
    //关闭
    mainWindow.close()
    // app.quit()
  })
  //主进程监听所有下载
  mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
    let fileName = item.getFilename()
    let fileNum = 0
    const downloadPath = app.getPath('downloads')
    let savePath = path.join(downloadPath, fileName)
    // savePath基础信息
    const ext = path.extname(savePath)
    const name = path.basename(savePath, ext)
    const dir = path.dirname(savePath)
    while (fs.existsSync(savePath)) {
      fileNum += 1
      savePath = path.format({
        dir,
        ext,
        name: `${name}(${fileNum})`
      })
      fileName = `${name}(${fileNum})` + ext
    }
    console.log('qa', item.getURL(), item.getFilename(), 'dir', dir, 'ext', ext, 'fileName', fileName)

    item.setSavePath(savePath)
    item.once('done', (event, state) => {
      if (fileName.indexOf('xlsx') != -1) {
        createChildWindow({
          url: `http://116.205.179.210:8020?path=${savePath}&tid=${item.getStartTime() * 1000}`,
          type: 'loadURL'
        })
      }
    })
  })
}

// 创建子页面窗口
function createChildWindow(data) {
  const newsWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minHeight: 768,
    minWidth: 1024,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.resolve(__dirname, '/preload.js')
    }
  })
  newsWindow[data.type](data.url)
  newsWindow.webContents.send('distributeIds', {
    id: newsWindow.id
  })
  newsWindow.webContents.setWindowOpenHandler((data) => {
    console.log(data)
    if (data.url) {
      createChildWindow({ url: data.url, type: 'loadURL' })
    }
    return {
      action: 'deny'
    }
  })
  newsWindow.webContents.on('will-navigate', (e, url) => {
    console.log(url, 'will-navigate url')
  })
  rendererId.set(newsWindow.id, newsWindow)
  //close 关闭前调用  closed 关闭后调用
  newsWindow.on('closed', (e) => {
    if (closeWindowId) {
      deleteId(closeWindowId)
      closeWindowId = null
    }
  })
}
// 删除窗口实例
function deleteId(id) {
  const win = rendererId.get(id)
  if (win) {
    rendererId.delete(id)
  }
}

// 进程通讯-窗口创建方案
ipcMain.on('newPlatform', (event, data) => {
  console.log('wa', data)
  if (data && data.url && data.type) {
    createChildWindow(data)
  } else {
    dialog.showErrorBox('温馨提示', '窗口无法打开缺少必须参数')
  }
})
// 最小化子窗口
ipcMain.on('minSize', (event, data) => {
  const windowInstance = rendererId.get(data.id)
  windowInstance.minimize()
})
// 最大化子窗口/还原子窗口
ipcMain.on('maxSize', (event, data) => {
  const windowInstance = rendererId.get(data.id)
  if (windowInstance.isMaximized()) {
    windowInstance.restore()
  } else {
    windowInstance.maximize()
  }
})
// 关闭子窗口
ipcMain.on('windowClose', (event, data) => {
  //关闭
  const windowInstance = rendererId.get(data.id)
  closeWindowId = data.id // 记录关闭窗口的ID 利于删除实例
  windowInstance.destroy() // 强制关闭
})
app.on('ready', createWindow)
//监听窗口关闭的事件，关闭的时候退出应用，macOs 需要排除(mac相关)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
//Macos 中点击 dock 中的应用图标的时候重新创建窗口
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
