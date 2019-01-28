// app.js

App({
  onLaunch () {
    if (!wx.cloud) {
      wx.navigateTo({
        url: "../error/error?type=version"
      })
    } else {}
  }
})
