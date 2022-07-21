export default {
	methods: {
		checkLoginState() {
			if (getApp().globalData.g_openid) {
				//已经登录了
				return true
			} else {
				//全局变量判断不出来是否登录，那就用本地存储判断有没有登录
				try {
					const value = uni.getStorageSync('storage_userInfo');
					if (value) {
						getApp().globalData.g_openid = value.openid
						return true
					}
				} catch (e) {
					return false
				}
			}
			return false
		},
		mainGetOpenId() {
			this.show3 = false
			wx.getUserProfile({
				desc: '授权登录',
				success: (res) => {
					this.$EventBus.$emit('event', res.userInfo);
					this.getUserInfo(res.userInfo).then(res => {
						//res为openid，已完成本地信息存储
						
						return true
					})
				}
			}) 
		}
	}
}
