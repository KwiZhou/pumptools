<template>
	<view class="homeToolsPanel">
		<view class="homePanela">
			<view class="homePanela-item">
				<breadPanelittleZD :info='info[0]'></breadPanelittleZD>
			</view>
			<view class="homePanela-item">
				<breadPanelittleZD :info='info[1]' ></breadPanelittleZD>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"homeToolsPanel",
		data() {
			return {
				info:[
					{
					icon:'iconfont icon-jiance-fuzaizhendong',
					name:'振动仪',
					disc:'手机收集振动信号',
					url:'../../pages/tools/tools_Zd/tools_Zd'
					},
					{
						icon:"iconfont icon-bengzhan1",
						name:'管损计算',
						disc:'沿程&局部损失计算',
						url:'../../pages/tools/tools_CalculatorLineLoss/tools_CalculatorLineLoss'
					}
				]
				
			};
		}
	}
</script>

<style>
.homePanela {
		display: flex;
		justify-content: space-around;
		padding-top: 12rpx;
	}
.homeToolsPanel{
	padding: 9rpx 0;
}

</style>
