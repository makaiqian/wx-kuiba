// pages/add/add.js
Page({
  data: {
    /**
     * 预览图片
     */
    previewImage: '',
    /**
     * 描述内容
     */
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
      sizeType: ['original', 'compressed'],
      sourceType: ['album']
    })
    .then((res) => {
      console.log(res);
      if (res.tempFilePaths && res.tempFilePaths[0]) {
        let resImg = res.tempFilePaths[0]
        this.uploadImg(resImg)
      } else {
        throw new Error()
      }
    })
    .catch(err => {
      this.goError()
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
      this.goError()
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
        console.log(res)
      })
      .catch(err => {
        this.goError()
      })
    } else {
      this.tipsToast()
    }
  },
  /**
   * 到错误页
   */
  goError () {},
  /**
   * 提示toast
   */
  tipsToast () {}
})