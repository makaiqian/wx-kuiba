// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { id, starItem, openId } = event
  console.log('点赞接口', id, starItem, openId)
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
        if (isStar === true) {
          console.log('点赞多次')
          reject()
        } else {
          resolve()
        }
      } else {
        console.log('点赞数据格式不对')
        reject()
      }
    })
    .catch(err => {
      console.log('点赞出错', err)
      reject()
    })
  })
  
  return await db.collection('list_page').doc(id).update({
    data: {
      starList: db.command.push(starItem)
    }
  })
}