// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { id, starItem } = event
  return await db.collection('list_page').doc(id).update({
    data: {
      starList: db.command.push(starItem)
    }
  })
}