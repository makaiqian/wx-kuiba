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
    }
}