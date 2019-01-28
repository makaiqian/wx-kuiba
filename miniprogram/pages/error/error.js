// pages/error/error.js

import PageData from '../../data/data.js'

Page({
  data: {
    textList: []
  },
  onLoad (option) {
    const type = option.type
    let textList = PageData.error.commonText
    if (type === 'version') {
      textList = PageData.error.versionText
    } else if (type === 'permission') {
      textList = PageData.error.permissionText
    }
    this.setData({
      textList: textList
    })
  }
})