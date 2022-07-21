<template>
	<view class="myself">
		<view class="myself_A">
			<breadPanel :userInfo='userInfo'></breadPanel>
			<myLikeGroup ></myLikeGroup>
		</view>
		
		<view class="myself_B">
			<breadFooter></breadFooter>
		</view>
		<view class="myself_C">
			<image src="../../static/pumptools.png" mode="aspectFit" style="height:1rem;"></image>
		</view>
	</view>
</template>

<script>   
	export default {
		data() {
			return {
				userInfo: {
					nickName: '欢迎使用 pumptools',
					avatarUrl:"https://7463-tcb-btwikft6f18ccb-1d5bw75a92160-1309695980.tcb.qcloud.la/myself_tabBar.png"
				},
				//hasUserInfo: false,
			}
		},
			
		mounted() {
			try {
				const value = uni.getStorageSync('storage_userInfo');
				if (value) {
					this.userInfo=value.userinfo
				}
			} catch (e) {
				return false
			}
		},
		methods: {
			
			
		}
	}
</script>

<style scoped>
	.myself{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		
	}
	
	.myself_A{
		background: linear-gradient(#3F67F3, rgb(255, 255, 255));
		margin-bottom:48rpx
	}
	.myself_C{
		position: absolute;
		bottom: 30rpx;
		width: 100%;
	
		text-align: center;
	}
</style>
