const CacheData = require('./cache.js')
const { parseMsg, parseDate } = require('./utils.js')
const xueqiu = require('./sites/xueqiu.js')
const { activeRooms } = require("../config.js")
const roomCacheData = new CacheData()

let roomKeys = []


module.exports = async function message(message) {
    let room = message.room()
    let talker = message.talker()
    let text = message.text()
    if (room) {
        const topic = await room.topic()
        if (activeRooms.indexOf(topic) >= 0) {
            const roomKey = `_ROOM_${room.id}`
            if (!roomCacheData.get(roomKey)) {
                roomKeys.push(roomKey)
                roomCacheData.add(roomKey, room)
            }
            // 大盘
            const overviewCodes = ['SH000001', 'SZ399001', 'SZ399006', 'SH000688']
            const [names, codes] = parseMsg(text, true)
            let symbol = ""
            if (codes.length > 0) {
                symbol = codes.join(",")
            } else if (text.indexOf("大盘") >= 0 || text.indexOf("指数") >= 0) {
                symbol = overviewCodes.join(",")
            }
            if (symbol) {
                xueqiu
                    .quote(symbol)
                    .then(({ data }) => {
                        const { items } = data
                        const msg = xueqiu.batchQuoteResp(items)
                        room.say(msg)
                    })
            }
            if (text.indexOf("龙虎榜") >= 0) {
                const date = parseDate(text)
                console.log(date)
                xueqiu
                    .longhu(date)
                    .then(({ data }) => {
                        console.log(data)
                        const msg = xueqiu.longhuRes(data, date)
                        room.say(msg)
                    })
            }

        }
        console.log(`Message: ${room}, ${talker.name()}, ${text}`)
    }
}