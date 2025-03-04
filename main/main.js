const { app, BrowserWindow } = require("electron");
const path = require("path");
const { pollResources } = require("./resourceManager.js");

const isDev = process.env.NODE_ENV === "development";

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  const appURL = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../out/index.html")}`;

  console.log(`Loading URL: ${appURL}`); // Add this line to log the URL

  mainWindow.loadURL(appURL).catch((err) => {
    console.error(`Failed to load URL: ${appURL}`, err); // Add this line to log any errors
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => (mainWindow = null));
  pollResources(mainWindow);
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
