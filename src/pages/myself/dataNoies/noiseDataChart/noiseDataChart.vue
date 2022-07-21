<template>
	<view class="main">
		<view class="tableHeader">
				<u--text text="噪声数据散点图" align="center" size="22" type="primary" bold="true"></u--text>
		</view>
		<view class="charts-box">
		  <qiun-data-charts 
			:canvas2d="true"
			  :ontouch="true"
		    type="scatter"
		    :opts="opts"
		    :chartData="chartData"
		  />
			
		</view>
		<view class="table">
			<view style="display: flex;">
				<u--text type="info"  size=19   text="采样日期"></u--text>
				<u--text type="info"  size=19   :text="addDateDay"></u--text>
			</view>
			<view style="display: flex;">
				<u--text type="info"  size=19   text="数据名称"></u--text>
				<u--text type="info"  size=19  :text="dataDis"></u--text>
			</view>
			<view style="display: flex;">
				<u--text type="info"  size=19   text="数据备注"></u--text>
				<u--text type="info"  size=19  :text="dataName"></u--text>
			</view>
			<view style="display: flex;">
				<u--text type="info"  size=19   text="最大分贝值"></u--text>
				<u--text type="info"  size=19   :text="dataMax"></u--text>
			</view>
			<view style="display: flex;">
				<u--text type="info"  size=19   text="最小分贝值"></u--text>
				<u--text type="info"  size=19  :text="dataMin"></u--text>
			</view>
		</view>
	</view>
  
</template>

<script>
export default {
  data() {
    return {
		addDateDay:'',
		dataName:'',
		dataMax:0,
		dataMin:0,
		dataDis:'',
		chartData: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['scatter'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [15,15,0,15],
        dataLabel: false,
        legend: {},
		
        xAxis: {
		disabled:true,
          disableGrid: false,
          gridType: "dash",
          splitNumber: 5,
          boundaryGap: "justify",
		 
		//  labelCount:5,
		  scrollShow:true,
         
        },
        yAxis: {
          disableGrid: false,
          gridType: "dash"
        },
        extra: {
          scatter: {}
        }
      }
    };
  },
  onLoad(option) {
	  
	this.dataMin=option.dataMin
	this.dataMax=option.dataMax
	
	this.addDateDay=option.addDateDay
	this.dataName=option.dataName
	this.dataDis=option.dataDis
	this.chartData = JSON.parse(option.str)
	
  },
 
  methods: {
    
  }
};
</script>

<style scoped>
  /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
  .charts-box {
    width: 100%;
    height: 300px;
  }
  
  .table{
	

	width:70%;
	margin: 0 auto;
	margin-top: 20rpx;
  }
  
  .table view{
		
		margin: 0 auto;
		text-align: left;
		padding: 20rpx;
  }
.tableHeader{
		margin: 20rpx auto;
		width: 300px;
		text-align: center;
		
	}
</style>