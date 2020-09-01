import notifier from "node-notifier"

export default function sendStockNotification(isInStock, emitter) {
  const notification = {
    title: "Elgato Wave:3 stock status",
    message: "Still not in stock. FeelsBadMan",
    actions: "Dismiss",
    sound: "Hero",
  }

  if (isInStock) {
    notification.message = "IT'S IN STOCK GO GET IT!!11!1",
    notification.actions = "Go get it"
  }

  notifier.notify(notification, (err, res, { activationValue }) => {
    emitter.emit("error", err)
    emitter.emit("action", { openProductPage: activationValue === "Go get it"})
  })
}
