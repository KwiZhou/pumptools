<template>
  <!--flex两栏布局-->
  <view class="container">
    <view class="left">
		<view class="left_item" :class="[curNav == item.cate_id ? 'active' : '']" v-for="item in cateItems" @click="switchRightTab(item.cate_id)">
			{{item.cate_name}}
		</view>
	</view>
    <view class="right">
		
		<!-- 子组件 toolsA 计算工具  -->
      <toolsA v-if='curNav==1' />
	  <!-- 子组件 toolsB 行业标准  -->
	  <toolsB v-else-if='curNav==2'/>
	  <!-- 子组件 toolsC 材质查询  -->
	  <toolsC v-else/>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      cateItems: [
        {
          cate_id: 1,
          cate_name: "计算工具",
          ishaveChild: true,
          
        },
        {
          cate_id: 2,
          cate_name: "行业标准",
          ishaveChild: false,
        },
        {
          cate_id: 3,
          cate_name: "材质查询",
          ishaveChild: false,
        },
      ],
      curNav: 1,
      curIndex: 0,
    };
  },
 
  methods: {
	  switchRightTab(e){
		  this.curNav=e
	  }
  },
};
</script>

<style>
.container {
  display: flex;
}
.left {
  width: 200rpx;
  
}
.left_item{
	color: #939393;  ;
	text-align: center;
	padding: 18rpx 0;
	border-bottom: 1rpx solid #dedede;
	font-size: 29rpx;
}
.left_item.active{
	 background: rgba(229, 238, 245, 0.685);  
	 color: #070707; 
}
.right {
  flex: 1;

}
</style>
