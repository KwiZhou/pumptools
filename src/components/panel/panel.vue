<template>
  <view>
    <view
      class="nav_right_items"
      style="
        background: white;
        border-radius: 12rpx;
        box-shadow: 2rpx 2rpx 10rpx #a5a2a2;
        padding: 5px;
      "
    >
	<span class="iconfont icon-jiance-fuzaizhendong"></span>
     
    <text>123</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  props:{
	
  },
  methods: {},
};
</script>

<style>
.nav_right_items{  
  /*浮动向左*/  
  float: left;  
  margin-left: 20px;
  /*每个item设置宽度是33.33%*/  
  width: 40%;
  text-align: center;  
  margin-top: 25rpx;
}  
.nav_right_items text{  
  /*给text设成块级元素*/  
  display: block;   
  color: rgb(83, 81, 81);
  /*设置文字溢出部分为...*/  
  overflow: hidden;  
  white-space: nowrap;  
  text-overflow: ellipsis;  
} 
</style>
