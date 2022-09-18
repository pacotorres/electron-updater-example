const {app, BrowserWindow} = require('electron')
const path = require ('path')
const {autoUpdater} = require('electron-updater')
const log = require('electron-log');
log.transports.file.resolvePath = () => path.join('C:\\Users\\javie\\Documents\\Github\\electron-updater-example', '/logs/main.log');
autoUpdater.logger = log
log.log('App version: '+app.getVersion());
//autoUpdater.checkForUpdates()
let win;

function createWindow() {
    win = new BrowserWindow({
        width:300,
        height:400,
        webPreferences:{
            nodeIntegration:false
        }
    })
    win.loadFile(path.join(__dirname,'index.html'))
    win.webContents.executeJavaScript(`document.querySelector('#version').innerText='${app.getVersion()}'`)

    win.on('ready-to-show', () => {
        autoUpdater.checkForUpdates()
        console.log('Entre')
    });
}

autoUpdater.on('checking-for-update',()=>{
    log.info('checking-for-update...')
    win.webContents.executeJavaScript(`document.querySelector('#act').innerText='Checando Actualización'`)
})

autoUpdater.on('update-available',()=>{
    log.info('update-available')
    win.webContents.executeJavaScript(`document.querySelector('#act').innerText='Actualización Disponible'`)
})

autoUpdater.on('update-not-available',()=>{
    log.info('update-not-available')
    win.webContents.executeJavaScript(`document.querySelector('#act').innerText='Sin actualización'`)
})

autoUpdater.on('error',(error)=>{
    log.info('Error: '+error)
})

autoUpdater.on('download-progress',(progressTrack)=>{
    log.info('download-progress')
    log.info(progressTrack)
    win.webContents.executeJavaScript(`document.querySelector('#act').innerText='${progressTrack.percent}'`)
})

autoUpdater.on('update-downloaded',()=>{
    log.info('update-downloaded')
    win.webContents.executeJavaScript(`document.querySelector('#act').innerText='Cierre el programa para actualizar'`)
})

app.on('ready',()=>{
    createWindow()
})