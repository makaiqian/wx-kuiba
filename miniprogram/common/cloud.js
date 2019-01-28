export default {
    init () {
        wx.cloud.init({
            traceUser: true // 将用户访问记录到用户管理中，在控制台中可见
        })
    },
    createDB () {
        return wx.cloud.database({
            env: 'kuiba-5192b6'
        })
    },
    getUserInfo () {
        return wx.cloud.callFunction({
            name: 'getWXContext'
        })
    },
    getAdminList ({ db }) {
        return db.collection('list_admin').get()
    }
}