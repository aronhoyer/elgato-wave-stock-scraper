export default async function getStockStatus(page, url) {
  await page.goto(url)

  const isInStock = await page.$eval(".stockstatus > .icon.icon-sm", (element) => element.classList.contains("stockstatus-instock"))

  return isInStock
}
