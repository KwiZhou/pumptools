<template>
    <view 
      class="container0" @click="getInTool">
	<slot name="toolsA_icon">
		<span class="iconfont icon-jiance-fuzaizhendong"></span>
	</slot>
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
		  console.log(this.url)
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
}  
.container0 text{  
  font-size: 29rpx;
  display: block;   
  color: rgb(83, 81, 81);
} 
</style>
