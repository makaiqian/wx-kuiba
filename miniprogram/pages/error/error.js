// pages/error/error.js

import PageData from '../../data/data.js'

Page({
  data: {
    versionText: []
  },
  onLoad (option) {
    const type = option.type
    if (type === 'version') {
      this.setData({
        versionText: PageData.common.versionText
      })
    }
  }
})