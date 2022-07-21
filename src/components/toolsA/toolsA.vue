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
			<panel v-bind:url="item[1].url">
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
				    name: "振动仪",
				    iconclass: "iconfont icon-jiance-fuzaizhendong",
				    url: "../../pages/tools/tools_Zd/tools_Zd",
				  },
				  {
				    child_id: 2,
				    name: "性能参数",
				    iconclass: "iconfont icon-jiexicanshu",
				    url: "../../pages/tools/tools_Calculator/tools_Calculator",
				  }],
				  [{
				    child_id: 3,
				    name: "管损计算",
				    iconclass: "iconfont icon-bengzhan1",
				    url: "../../pages/tools/tools_CalculatorLineLoss/tools_CalculatorLineLoss"
				  },
				  {
				    child_id: 4,
				    name: "分贝仪",
				    iconclass: "iconfont icon-xiaofangbengfang",
					url: "../../pages/tools/tools_noise/tools_noise"
					
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
