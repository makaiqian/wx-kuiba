// app.js

import Common from './common/modal'

App({
  onLaunch () {
    if (!wx.cloud) {
      wx.navigateTo({
        url: "../error/error?type=version"
      })
    } else {}
  }
})
