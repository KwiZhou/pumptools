<template>
	<view class="breadPanelittleZD" @click="getInTool">
		
		<view class="breadPanelittleZDa">
			<view>
				<u--text :text="info.name" :bold="true" size=14></u--text>
			</view>
			<view>
				<u--text type="info"  size=9  :text="info.disc"></u--text>
			</view>
		</view>
		<view>
			
				<span :class="info.icon"></span>
			
		</view>
	</view>
</template>

<script>
	export default {
		name: "breadPanelittleZD",
		props: ['info'],
		data() {
			return {

			};
		},


		methods: {
			getInTool() {
				uni.navigateTo({
					url: this.info.url
				})
			}
		},
	}
</script>

<style scoped>
	.breadPanelittleZD {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		background: white;
		border-radius: 12rpx;
		box-shadow: -1rpx -1rpx 10rpx #b2b0b4;
		padding: 12rpx 17rpx;
		font-size: 29rpx;
	}
	.breadPanelittleZDa{
		text-align: center;
	}
	
	.breadPanelittleZDa view{
		margin:  0 auto;
	}
</style>
