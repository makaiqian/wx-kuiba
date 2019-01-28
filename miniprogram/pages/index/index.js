//index.js
import Cloud from '../../common/cloud'

const app = getApp()

Page({
  data: {
    /**
     * 首页展示数据列表
     */
    list: [],
    /**
     * 是否可以用获取到用户信息的API
     */
    canIUseUserInfo: wx.canIUse('button.open-type.getUserInfo'),
    /**
     * 是否为管理员用户
     */
    isAdmin: false,
  },
  /**
   * 每张图片加载完以后触发
   */
  onImgLazyLoad() {},
  /**
   * 监听获取用户信息
   */
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  /**
   * 页面加载完
   */
  onLoad() {
    this.initCloud()
    this.initPermission()
    this.isMatchAdmin()
    this.getList()
  },
  /**
   * 初始化cloud
   */
  initCloud() {
    Cloud.init()
    this.db = Cloud.createDB()
  },
  /**
   * 初始化授权
   */
  initPermission () {
    wx.getSetting({
      success (res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权
          // 可以直接调用 getUserInfo 获取头像昵称
          // wx.getUserInfo({
          //   success: function (res) {
          //     console.log(res.userInfo)
          //   }
          // })
        } else {
          // 未授权
        }
      },
      fail (err) {
        this.goError()
      }
    })
  },
  /**
   * 判断用户是否为管理员
   */
  isMatchAdmin () {
    Cloud.getUserInfo()
      .then((resInfo) => {
        Cloud.getAdminList({ db: this.db })
          .then((res) => {
            if (res.data) {
              let isAdmin = false
              res.data.forEach((item) => {
                if (item.openId === resInfo.result.OPENID) {
                  isAdmin = true
                }
              })
              this.setData({
                isAdmin: isAdmin
              })
            } else {
              throw new Error()
            }
          })
      })
      .catch(err => {
        this.goError()
      })
  },
  /**
   * 获取cloud数据列表
   */
  getList() {
    Clound.getHomeList({ db: this.db })
      .then(res => {
        if (res.data) {
          this.setData({
            list: res.data
          })
        } else {
          throw new Error()
        }
      })
      .catch(err => {
        this.goError()
      })
  },
  /**
   * 点击点赞按钮
   */
  clickStar (e) {
    const id = e.target.dataset.id
    this.db.collection('list_admin').doc(id).get()
      .then(res => {
        if (res.data) {
          this.db.collection('list_admin').doc(id).set({
            starNum: res.data
          })
            .then(res => {
              this.getList()
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          throw new Error()
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  /**
   * 点击进入管理员上传界面
   */
  clickAdd () {
    wx.navigateTo({
      url: "add"
    })
  },
  /**
   * 跳转到错误页
   */
  goPermissionError () {
    wx.navigateTo({
      url: '../error/error?type=permission'
    })
  },
  /**
   * 跳转到错误页
   */
  goError () {
    wx.navigateTo({
      url: '../error/error'
    })
  }
})
