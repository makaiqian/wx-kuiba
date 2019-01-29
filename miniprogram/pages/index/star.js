import Common from '../../common/index'

export default {
  star(e, {
    OPENID,
    success,
    fail
  }) {
    const userInfo = JSON.parse(e.detail.rawData)
    const id = e.target.dataset.id

    let starItem = {
      ...userInfo,
      date: new Date().getTime(),
      openId: OPENID
    }
    wx.cloud.callFunction({
        name: 'updateStar',
        data: {
          id: id,
          starItem: starItem
        }
      })
      .then(res => {
        if (res.result && res.result.stats && res.result.stats.updated === 1) {
          success && success(res)
        } else {
          throw new Error()
        }
      })
      .catch(err => {
        fail && fail(err)
      })

  },
  cancleStar(e, {
    OPENID,
    success,
    fail
  }) {
    const id = e.target.dataset.id
    wx.cloud.callFunction({
        name: 'cancleStar',
        data: {
          id: id,
          openId: OPENID,
        }
      })
      .then(res => {
        success && success(res)
      })
      .catch(err => {
        fail && fail(err)
      })
  }
}