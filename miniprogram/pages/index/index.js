//index.js
import Cloud from '../../common/cloud'

import Common from '../../common/index'

import PageData from '../../data/data.js'

const app = getApp()

Page({
  data: {
    // 欢迎文案
    welcomeText: PageData.index.welcomeText,
    // 管理员入口按钮文案
    adminEntryText: PageData.index.adminEntryText,
    // 首页展示数据列表
    list: [],
    // 是否可以用获取到用户信息的API
    canIUseUserInfo: wx.canIUse('button.open-type.getUserInfo'),
    // 是否为管理员用户
    isAdmin: false,
    // 当前用户信息
    userInfo: {},
    // 用户标识
    OPENID: ''
  },
  /**
   * 页面加载完
   */
  onLoad() {
    this.initCloud()
    this.initPermission()
    this.isMatchAdmin(() => {
      this.getList()
    })
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
        if (res.authSetting['scope.userInfo']) {
        } else {
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
  isMatchAdmin (cb) {
    Cloud.getUserInfo()
      .then((resInfo) => {
        const OPENID = this.OPENID = resInfo.result.OPENID
        cb && cb()
        Cloud.getAdminList({ db: this.db })
          .then((res) => {
            if (res.data) {
              let isAdmin = false
              res.data.forEach((item) => {
                if (item.openId === OPENID) {
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
    Cloud.getHomeList({ db: this.db })
      .then(res => {
        if (res.data) {
          res.data.forEach((item) => {
            let isStar = false
            item.starList.forEach((starItem) => {
              if (starItem.openId === this.OPENID) {
                isStar = true
              }
            })
            item.isStar = isStar
          })
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
    const userInfo = JSON.parse(e.detail.rawData)
    const id = e.target.dataset.id
    this.db.collection('list_page').doc(id).get()
      .then(res => {
        if (res.data) {
          let data = {
            starList: this.db.command.push({
              ...userInfo,
              date: new Date().getTime(),
              openId: this.OPENID
            })
          }

          this.db.collection('list_page').doc(id).update({
            data: data
          })
          console.log(data)
            .then(res => {
              console.log(res)
              if (res.stats && res.stats.updated === 1) {
                Common.Toast({ content: '点赞成功~' })
                this.getList()
              } else {
                throw new Error()
              }
            })
            .catch(err => {
              this.starError()
            })
        } else {
          throw new Error()
        }
      })
      .catch(err => {
        this.starError()
      })
  },
  /**
   * 点赞失败
   */
  starError () {
    Common.Toast({ content: '点赞失败啦~请稍后再试哟~' })
  },
  /**
   * 点击进入管理员上传界面
   */
  clickAdd () {
    wx.navigateTo({
      url: "../add/add"
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
