<template>
	<view>
		<view class="container11" v-for="item in children" >
			<panel v-bind:url="item[0].url">
				<template #toolsA_icon>
					<span :class="item[0].iconclass"></span>
				</template>
				<template #toolsA_name>
					<text>
						{{item[0].name}}
					</text>
				</template>
			</panel>	
			<panel >
				<template #toolsA_icon>
					<span :class="item[1].iconclass"></span>
				</template>
				<template #toolsA_name>
					<text>
						{{item[1].name}}
					</text>
				</template>
			</panel>	
		</view>
	</view>
</template>

<script>
	export default {
		name:"toolsA",
		data() {
			return {
				children: [
				  [{
				    child_id: 1,
				    name: "负载振动",
				    iconclass: "iconfont icon-jiance-fuzaizhendong",
				    url: "../../pages/tools/tools_Zd/tools_Zd",
				  },
				  {
				    child_id: 2,
				    name: "性能参数",
				    iconclass: "iconfont icon-jiexicanshu",
				    url: "../three_xncs/three_xncs",
				  }],
				  [{
				    child_id: 3,
				    name: "水头损失",
				    iconclass: "iconfont icon-bengzhan1",
				    url: "../indexthreea-2/indexthreea-2",
				  },
				  {
				    child_id: 4,
				    name: "楼宇供水",
				    iconclass: "iconfont icon-xiaofangbengfang",
				  }]
				]
			};
		},
		methods:{
		
		}
	}
</script>

<style>
.container11{
	margin-top: 40rpx;
	display: flex;
	justify-content: space-evenly;
	
}
</style>
