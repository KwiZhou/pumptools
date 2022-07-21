<template>
	<view>
		<u-skeleton  rows="1" :loading="loading" :rowsHeight="['300px']"
			:rowsWidth="['100%']" :title="false">
			<view class="charts-box" >
			  <qiun-data-charts
			  :canvas2d="true"
			  :animation="true"
			    type="tline"
			    :chartData="chartData"
			    background="none"
				   :ontouch="true"
			  />  
			</view>	
		</u-skeleton>
	</view>
</template>

<script>
	export default {
		name:"pumpChart",
		props:['chartData'],
		mounted() {
				
		},
		
		data() {
			return {
				loading:false
			};
		}
	}
</script>

<style scoped>

.charts-box{
  width: 100%;
  height:300px;
}
</style>
