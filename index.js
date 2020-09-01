#!/usr/bin/env node

import childProcess from "child_process"
import EventEmitter from "events"

import puppeteer from "puppeteer";

import getStockStatus from "./getStockStatus.js";
import sendStockNotification from "./sendStockNotification.js";

const url = "https://www.komplett.no/product/1161364/datautstyr/pc-tilbehoer/streaming/mikrofon/elgato-wave3-mikrofon-og-mixer"

const notificationEmitter = new EventEmitter()

async function start() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const isInStock = await getStockStatus(page, url)

  sendStockNotification(isInStock, notificationEmitter)

  notificationEmitter.on("error", (err) => {
    if (err) {
      console.log("\x1b[1;31m", err, "\x1b[0m")
    }
  })
  notificationEmitter.on("action", (value) => {
    if (value.openProductPage) {
      childProcess.exec(`open ${url}`)
    }
  })

  await browser.close()
}

setImmediate(async () => {
  await start()
});

setInterval(async () => {
  await start()
}, 60 * 60 * 1000);
