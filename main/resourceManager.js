import osUtils from "os-utils";
import fs, { statfsSync } from "fs";
import os from "os";

const POLING_INTERVAL = 500;

export function pollResources(mainWindow) {
  setInterval(async () => {
    const cpuUsage = await getCPUUsage();
    const ramUsage = getRAMUsage();
    const storageUsage = getStorageData().used;
    mainWindow.webContents.send("statistics", {
      cpuUsage,
      ramUsage,
      storageUsage,
    });
  }, POLING_INTERVAL);
}

export function getStaticData() {
  const storageData = getStorageData().total;
  const cpuModel = os.cpus()[0].model;
  const cpuCores = osUtils.cpuCount();
  const ramTotal = Math.floor(osUtils.totalmem() / 1024);
  console.log("Cpu Moder :", cpuModel);
  console.log("Total Core: ", cpuCores, "Cores");
  console.log("Total Ram: ", ramTotal, "GB");
  return { storageData, cpuModel, cpuCores, ramTotal };
}

function getCPUUsage() {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
}

function getRAMUsage() {
  return 1 - osUtils.freememPercentage();
}

function getStorageData() {
  const stats = statfsSync(process.platform === "win32" ? "C://" : "/");
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;

  return {
    total: Math.floor(total / 1_000_000_000),
    used: 1 - free / total,
  };
}
