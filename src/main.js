

const wechaty = require("wechaty")
const message = require('./bot')
const onScan = require('./onScan')

const bot = wechaty.WechatyBuilder.build({
  name: "wechat-assistant", // generate xxxx.memory-card.json and save login data for the next login
  puppet: "wechaty-puppet-wechat",
  puppetOptions: {
    uos: true
  }
})

module.exports = function main() {
  bot
    // .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`))
    .on('scan', onScan)
    .on('login', user => console.log(`User ${user} logined`))
    .on('message', message)
    .start()
}