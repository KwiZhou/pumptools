<template>
	<view style="background-color: white;">
  <view class="weui-form__text-area" style="display: flex;align-items: center;justify-content:center;">
    <span class="iconfont icon-jisuanqi-copy" style="padding-right:30rpx;"></span>
    <h4 class="weui-form__title" style="color: rgb(68, 68, 70);">{{calculatorName}}</h4>
  </view>
  <view class="weui-cells__title" style="text-align:justify;text-indent:2em" >计算说明：{{calculatorTitle}}</view>
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

</style>
