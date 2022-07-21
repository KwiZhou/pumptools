<template>
	<view class="breadItem">

		<view class="breadItemA">
			<view>
				<u-avatar size='80' :src='_userInfo.avatarUrl'></u-avatar>
			</view>
			<view class="name">
				<text>{{_userInfo.nickName}}</text>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		name: "breadPanel",
		props: ['userInfo'],
		data() {
			return {
				dataUserInfo:null
			};
		},
		mounted() {	
			this.$EventBus.$on('event', msg => {
					this.dataUserInfo=msg
			      console.log('Child1:',this.dataUserInfo);
			      
			    });
			if (getApp().globalData.user){
				this.name=getApp().globalData.user.nickName,
				this.avatarUrl=getApp().globalData.user.avatarUrl
			}
		},

		computed: {
			
			_userInfo(){
				
				return this.dataUserInfo||this.userInfo
			}
		}
	}
</script>

<style>
	.breadItem {
		color: white;
		font-size: 15px;
		padding: 30rpx 0 30rpx 0;
	}

	.breadItemA {

		display: flex;
		flex-direction: column;
		align-items: center;

	}

	.name {
		margin-top: 20rpx;
	}
</style>
