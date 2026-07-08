const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 380,
    height: 500,
    resizable: true,
    minWidth: 290,
    minHeight: 320,

    alwaysOnTop: true,
    frame: false,
    transparent: true,

    autoHideMenuBar: true,

    webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: false,
        contextIsolation: true,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

ipcMain.on("close-window", () => {
  BrowserWindow.getFocusedWindow()?.close();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("toggle-pin", () => {
  const win = BrowserWindow.getFocusedWindow();
  const isAlwaysOnTop = win.isAlwaysOnTop();

  win.setAlwaysOnTop(!isAlwaysOnTop);
});