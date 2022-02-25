<template>
	<view class="calculatorHead">
	  <view  class="title">
	    <span class="iconfont icon-jisuanqi" ></span>
	    <h4 >性能参数计算器</h4>
	  </view>
	  <view class="synopsis"><slot name="synopsisText"></slot></view>
	</view>
</template>

<script>
	export default {
		name:"calculatorHead",
		data() {
			return {
				
			};
		}
	}
</script>

<style>
 .calculatorHead{
	 padding: 25rpx 15rpx;
	 background-color: white;
	 display: flex;
	 align-items:center;
	 flex-direction: column;
 }

 .calculatorHead h4{
	 color: rgb(68, 68, 70);
	 padding-left:25rpx;
 }
 .synopsis{
	text-indent: 2em;
	color: #808080;
 }
 .title{
	 display: flex;
	 align-items: center;
	 padding-bottom: 15rpx;
 }
</style>
