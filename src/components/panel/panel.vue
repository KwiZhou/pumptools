<template>
    <view 
      class="container0" @click="getInTool">
	<view>
		<slot name="toolsA_icon">
			<span class="iconfont icon-jiance-fuzaizhendong"></span>
		</slot>
	</view>
    <slot name="toolsA_name">
		 <text>小工具</text>
	</slot>
    </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  props:['url'],
  
  methods: {
	  getInTool(){
		  uni.navigateTo({
		  	url:this.url
		  })
	  }
  },
};
</script>

<style>
.container0{
  text-align: center;  
  background: white;
  border-radius: 12rpx;
  box-shadow: 2rpx 2rpx 10rpx #a5a2a2;
  padding: 15rpx 25rpx;
  font-size: 29rpx;
}  

</style>
