const {app, BrowserWindow} = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 1200, height: 800, webPreferences: {
            nodeIntegration: true
        }, icon: __dirname + '/favicon.ico'
    })

    win.loadFile('build/index.html')
    win.once('ready-to-show', () => {
        win.webContents.setZoomFactor(0.8);
    });
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

try {
    require('electron-reloader')(module)
} catch (_) {
}