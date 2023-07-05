/*
 *  机器人扫描二维码时监听
 */
const QRCode = require("qrcode")

module.exports = async function onScan(qrcode, status) {
  const url = `https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`
  console.log(`Scan QR Code to login: ${status}\n${url}`)
  console.log(
    await QRCode.toString(qrcode, { type: "terminal", small: true })
  )
}
