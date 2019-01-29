// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { id, starItem, openId } = event
  let p = new Promise((resolve, reject) => {
    await db.collection('list_page').doc(id).get()
    .then(res => {
      if (res.data && res.data.starList) {
        let isStar = false
        res.data.starList.forEach((item, index) => {
          if (item.id === openId) {
            isStar = true
            
          }
        })
        if (isStar ==== true) {
          reject()
        } else {
          resolve()
        }
      } else {
        reject()
      }
    })
    .catch(err => {
      reject()
    })
  })
  
  return await db.collection('list_page').doc(id).update({
    data: {
      starList: db.command.push(starItem)
    }
  })
}