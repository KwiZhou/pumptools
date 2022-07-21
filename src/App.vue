<script>
	
	export default {
		data(){
			return {
				
			}
		},
		onLaunch: function() {
			
			
		},
		onShow: function() {
			uni.getStorage({
				key: 'storage_userInfo',
				success: function(res) {
					
					getApp().globalData.user=res.data.userinfo
					getApp().globalData.hasUserInfo=true
					getApp().globalData.g_openid=res.data.openid
				}
			})
		},
		onHide: function() {
		
		},
		//getApp().globalData.isTarBarHright
		globalData:{
			isTarBarHright:undefined,
			noTarBarHright:undefined,
			hasUserInfo:false,
			user:null,
			g_openid:undefined
		}
		
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	
</style>
