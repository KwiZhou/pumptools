<template>
	<view class="mylikeGroup">
		<view class="mylikeGroupItem" @click="toGo(item)" v-for="item in mylikeGroupList">
			
			<u-icon :name="item.icon"  size=35></u-icon>
			<u--text  size=14 :text="item.name" lineHeight=38></u--text>
			</view>
		</view>
		
</template>

<script>
	export default {
		name:"myLikeGroup",
		
		data() {
			return {
				mylikeGroupList:[
					
					{name:'振动数据',
					icon:'clock',
					url:"./dataArchiving/dataArchiving"
					},
					{name:'计算报告',
					icon:'file-text',
					url:"./calculatorDataArchiving/calculatorDataArchiving"
					},
					{name:'分贝数据',
					icon:'volume',
					url:"./dataNoies/dataNoies"
					}
				]
			};
		},
		methods:{
			
			
			 toGo(item){
				//为了给breadPanel传递头像等数据，采用全局事件总线
			 	if(!getApp().globalData.g_openid){
						wx.getUserProfile({
							desc: '授权登录', 
							success: (res) => {
								
								this.$EventBus.$emit('event', res.userInfo);
								
								this.getUserInfo(res.userInfo).then(res=>{
									
									uni.navigateTo({
										url:item.url
									})
								})
							}
						})
				}else{
					uni.navigateTo({
						url:item.url
					})
				}
				
			}
		}
	}
</script>

<style scoped>
.mylikeGroup{
	margin: 0 auto;
	padding: 18rpx;
	display: flex;
	background-color: white;
	justify-content: space-evenly;
	border-radius: 28rpx;
	position: relative;
	top:20rpx;
	width: 80%;
}
.mylikeGroupItem{
	margin-top:10rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	
}
</style>
