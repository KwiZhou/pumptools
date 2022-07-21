<template>
	<view class="homebg">
		<view class="homea">

			<view class="swiper">
				<u-swiper radius=19 @click="clickSwiper" height=155 :list="list3" indicator indicatorMode="line"
					circular></u-swiper>
			</view>
			<view class="homeToolsPanel">
				<homeToolsPanel></homeToolsPanel>
			</view>
		
		</view>
		<view class="homeb">
			<brandpanel :brandInfo='brandInfo'></brandpanel>
		</view>
		<view style="text-align:center;">
			<image src="../../static/pumptools.png" mode="aspectFit" style="height:20px;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list3: [
					'https://7463-tcb-btwikft6f18ccb-1d5bw75a92160-1309695980.tcb.qcloud.la/lunbotu/8021650189099_.pic.jpg',
					'https://7463-tcb-btwikft6f18ccb-1d5bw75a92160-1309695980.tcb.qcloud.la/lunbotu/8041650189761_.pic.jpg',
					'https://7463-tcb-btwikft6f18ccb-1d5bw75a92160-1309695980.tcb.qcloud.la/lunbotu/8031650189193_.pic.jpg',
				],
				brandInfo: null
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: function(res) {
					/* console.log(res.screenHeight); //屏幕高度  注意这里获得的高度宽度都是px 需要转换rpx
					console.log(res.windowWidth); //可使用窗口宽度
					console.log(res.windowHeight); //可使用窗口高度
					console.log(res.screenWidth); //屏幕宽度 */

					getApp().globalData.isTarBarHright = (res.windowHeight * (750 / res
						.windowWidth)) //将px 转换rpx
				}
			});
			const db = uniCloud.database({
				provider: 'tencent',
				spaceId: 'tcb-btwikft6f18ccb-1d5bw75a92160'
			})
			db.collection('brandInfo')
				.get()
				.then((res) => {

					this.brandInfo = res.result.data
				}).catch((err) => {
					console.log("err.code1", err.code, res)
				})
		},
		methods: {
			clickSwiper(e) {
				if (e == 0) {
					uni.navigateTo({
						url: '../tools/tools_Zd/tools_Zd'
					})
				} else if (e == 1) {
					uni.navigateTo({
						url: '../tools/tools_CalculatorLineLoss/tools_CalculatorLineLoss'
					})
				} else {
					uni.switchTab({
						url: '../selection/selection'
					})

				}

			}
		}
	}
</script>

<style scoped>
	.swiper {
		margin: 0 6rpx;
	}

	.homea {
		
		padding: 12rpx;
		padding-top:40rpx;
		background: linear-gradient(#3F67F3, rgb(255, 255, 255))
	}

	.homeb {
		padding: 12rpx;
	}

.homeToolsPanel{
	margin: 20rpx 0;
}
	

	.homePanelb {
		display: flex;
		justify-content: space-around;
		padding-top: 15rpx;
	}



</style>
