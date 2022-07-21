<template>
 <view class="brandPanelstripname">
  <view class="brandPanelstripname-item">
	  <slot name='brandPanelstripname'>
	  	<span class="iconfont icon-hot"></span>
	   <u--text type='info' text='热门品牌'></u--text>
	  </slot>
  </view>
  <u-icon size=25 color="rgb(137, 175, 212)" :name="flag==0?'grid':'grid-fill'" @click="toGo"></u-icon>
 </view>
</template>

<script>
 export default {
  name:"brandPanelstrip",
  props:['name','icon'],
  data() {
	   return {
		flag:0
   }
  },
  mounted() {
  	
  },
  methods:{
	  toGo(){
		  this.flag=1
		  uni.navigateTo({
		  	url:'../../pages/home/brandAndPumpList/brandAndPumpList'
		  })
		  let timer=setTimeout(()=>{
			  this.flag=0
			  clearInterval(timer);
			  timer=null
		  },500)
			
	  }
  }
 }
</script>

<style>
.brandPanelstripname{
	display: flex;
	justify-content:space-between;
	padding: 9rpx 0;
	
}
.brandPanelstripname-item{
	display: flex;
	align-items: center;
}
</style>