const {app, BrowserWindow} = require('electron');
const algorithim = require('./algorithim');
var ipc = require('electron').ipcMain;
var path = require('path');
const globalShortcut = require('electron').globalShortcut;


let win;

function createWindow() {
    win = new BrowserWindow({width: 1280,
                            height: 600});

    win.loadFile(path.resolve(require('path').resolve(__dirname), 'static/html/index.html'));

    globalShortcut.register('CommandOrControl+R', function() {
        console.log('CommandOrControl+R is pressed');
        win.reload();
    });

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', ()=> {
    console.log("Closing platform");
    app.quit()
    // if (process.platform !== 'darwin') {
    //     app.quit()
    // }
});

app.on('activate', ()=> {
    if(win === null) {
        createWindow()
    }
});

ipc.on('emojifyAction', function(event, data) {
    var result = algorithim.emojify(data);
    event.sender.send('emojifyResponse', result);
});