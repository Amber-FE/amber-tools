const { BrowserWindow, app, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1240,
    height: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: true, //渲染进程中使用nodejs
      contextIsolation: false,
      enableRemoteModule: true //渲染线程中使用remote模块
    }
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
  })
}
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
