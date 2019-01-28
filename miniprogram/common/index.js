export default {
    Dialog ({ title, content, success, fail }) {
        return wx.showModal({
            title: title || '提示',
            content: content || '',
            success(res) {
                if (res.confirm) {
                    success && success()
                } else if (res.cancel) {
                    fail && fail()
                }
            }
        })
    },
    Toast ({ content, icon, duration, success, fail }) {
        return wx.showToast({
            title: content || '成功',
            icon: icon || 'none',
            duration: duration || 2000,
            success(res) {
                success && success()
            },
            fail(res) {
                fail && fail()
            }
        })
    }
}