<template>
  <!--flex两栏布局-->
  <view class="container">
    <view class="left"> 1 </view>
    <view class="right">
      <panel />
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
          children: [
            {
              child_id: 1,
              name: "负载振动",
              iconclass: "iconfont icon-jiance-fuzaizhendong",
              url: "../threezd/threezd",
            },
            {
              child_id: 2,
              name: "性能参数",
              iconclass: "iconfont icon-jiexicanshu",
              url: "../three_xncs/three_xncs",
            },
            {
              child_id: 3,
              name: "水头损失",
              iconclass: "iconfont icon-bengzhan1",
              url: "../indexthreea-2/indexthreea-2",
            },
            {
              child_id: 4,
              name: "楼宇供水",
              iconclass: "iconfont icon-xiaofangbengfang",
            },
            {
              child_id: 5,
              name: "管路损失",
              iconclass: "iconfont icon-qianshuibeng-copy",
            },

            {
              child_id: 6,
              name: "性能预测",
              iconclass: "iconfont icon-yucepinggu",
              url: "../xnyc/xnyc",
            },
          ],
        },
        {
          cate_id: 2,
          cate_name: "数据采集",
          ishaveChild: false,
         
        },
        {
          cate_id: 3,
          cate_name: "行业标准",
          ishaveChild: false,
        },
        {
          cate_id: 4,
          cate_name: "材质查询",
          ishaveChild: false,
          children: [
            {
              child_id: 1,
              name: "jtytyj",
              image: "../../images/3.jpg",
            },
            {
              child_id: 2,
              name: "tyjfyj",
              image: "../../images/6.jpg",
            },
            {
              child_id: 3,
              name: "tuyfuk",
              image: "../../images/4.jpg",
            },
            {
              child_id: 4,
              name: "seyu5trd",
              image: "../../images/3.jpg",
            },
          ],
        },
      ],
      curNav: 1,
      curIndex: 0,
    };
  },
  methods: {},
};
</script>

<style>
.container {
  display: flex;
}
.left {
  width: 200rpx;
  background: rgb(169, 89, 89);
}
.right {
  flex: 1;
  background: rgb(125, 101, 101);
}
</style>
