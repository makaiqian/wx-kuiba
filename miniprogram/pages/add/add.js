// pages/add/add.js

import Common from '../../common/index'


Page({
  data: {
    // 预览图片
    previewImage: '',
    // 描述内容
    desc: ''
  },
  /**
   * 修改描述内容
   */
  bindKeyInput (e) {
    this.setData({
      desc: e.detail.value
    })
  },
  /**
   * 选择相册的文件
   */
  clickUpload () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: (res) => {
        if (res.tempFilePaths && res.tempFilePaths[0]) {
          let resImg = res.tempFilePaths[0]
          this.uploadImg(resImg)
        } else {
          Common.Toast({ content: '服务器异常~请稍后再试~' })
        }
      },
      fail: (res) => {
        Common.Toast({ content: '失败啦~请稍后再试~' })
      }
    })
  },
  /**
   * 上传图片
   */
  uploadImg (img) {
    wx.cloud.uploadFile({
      cloudPath: `img_${new Date().getTime()}`,
      filePath: img, // 小程序临时文件路径
    }).then(res => {
      if (res.fileID) {
        this.setData({
          'previewImage': res.fileID
        })
      } else {
        throw new Error()
      }
    }).catch(err => {
      Common.Toast({ content: '上传失败啦~请稍后再试~' })
    })
  },
  /**
   * 确认提交按钮
   */
  clickSubmit () {
    const img = this.data.previewImage
    const desc = this.data.desc
    if (img && desc) {
      const db = wx.cloud.database({
        env: 'kuiba-5192b6'
      })
      db.collection('list_page').add({
        data: {
          img: img,
          starList: [],
          date: new Date().getTime(),
          desc: desc
        }
      })
      .then(res => {
        Common.Toast({ content: '发布成功！' })
        setTimeout(() => {
          this.goHome()
        }, 2000)
      })
      .catch(err => {
        Common.Toast({ content: '啊哦~出错啦~' })
      })
    } else {
      Common.Toast({ content: '啊哦~图片和描述都必须要有哦~' })
    }
  },
  /**
   * 回到首页
   */
  goHome() {
    wx.navigateTo({
      url: '../index/index'
    })
  }
})