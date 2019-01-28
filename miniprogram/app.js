// app.js

import Common from './common/modal'

App({
  onLaunch () {
    if (!wx.cloud) {
      wx.navigateTo({
        url: "../error/error?type=version"
      })
    } else {
      wx.cloud.init({
        traceUser: true, // 将用户访问记录到用户管理中，在控制台中可见
      })
    }
    this.globalData = {}
  }
})
