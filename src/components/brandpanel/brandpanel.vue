<template>
	<view>
		<brandPanelstrip></brandPanelstrip>
		<view>
			<u-grid :border="true">
				<u-grid-item v-for="Item in brandInfo" :key="Item.brandindex"
					customStyle="padding-top: 10px; padding-bottom: 10px" @click="click(Item.brandindex)">
					<u--image :src="Item.brandimg" width="90px" height="90px">
					</u--image>
					<text class="grid-text">{{Item.brandname}}</text>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	export default {
		name: "brandpanel",
		props:['brandInfo'],
		data() {
			return {
			
			};
		},
		mounted() {
			
		},
		methods: {
			click(e) {
				uni.navigateTo({
					url: '../../pages/home/brandInfoPage/brandInfoPage?brandIndex='+e
				})
			}
		}
	}
</script>

<style scoped>
	.grid-text {
		font-size: 14px;
		color: #909399;
		padding: 10rpx 0 20rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}
</style>
