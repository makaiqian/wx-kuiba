// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { id, openId } = event
  console.log('取消点赞', id, openId)
  let p = new Promise((resolve, reject) => {
    db.collection('list_page').doc(id).get()
      .then(res => {
        let newStarList = res.data.starList
        let indexList = []
        newStarList.forEach((item, index) => {
          if (item.openId === openId) {
            indexList.push(index)
          }
        })
        for (let i = indexList.length; i >= 0; i--) {
          newStarList = newStarList.splice(i, 1)
        }
        db.collection('list_page').doc(id).update({
          data: {
            starList: newStarList
          }
        })
        .then((res) => {
          resolve()
        })
        .catch(err => {
          console.log('取消点赞失败', err)
          reject()
        })
      })
  })
  return p
}