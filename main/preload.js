const { contextBridge, ipcRenderer } = require("electron");
const electron = require("electron");
contextBridge.exposeInMainWorld("electron", {
  sendMessage: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  onMessage: (channel, callback) => {
    ipcRenderer.on(channel, (_event, data) => callback(data));
  },
  suscribeStatistics: (callback) => {
    const listener = (event, data) => callback(data);
    electron.ipcRenderer.on("statistics", listener);

    return () => {
      electron.ipcRenderer.off("statistics", listener);
    };
  },
});
