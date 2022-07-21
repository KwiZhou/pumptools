<template>
<view class="totol">
			<u-cell-group :border="true">
				<template v-for="item in calculatorinputclass">
					
					<u-cell :border="true" :title="item.name">
								 <input
								 type="number"
								   :placeholder="unit+item.unit" 
									:data-set="item.id" 
								    @blur="getInpuValue"
									slot="right-icon"
									class="inputa"
									
								  ></input>					
					</u-cell>
				</template>
				<slot name="slota"></slot>
				<slot name="slotb"></slot>
				<slot name="slotc"></slot>
			</u-cell-group>
		</view>
</template>

<script>
	export default {
		name: "calculatorInput",

		props: ['calculatorinputclass'],
		data() {
			return {
				unit: "单位："
			};
		},
		methods: {
			getInpuValue(e) {
				console.log(e.target.dataset.set, e.detail.value)
				this.$emit('postInputValue', [e.target.dataset.set, e.detail.value])
			}

		},

	}
</script>

<style scoped>
	.totol{
		padding: 0 50rpx;
	}
	.inputa{
			border: 1rpx solid #000000;
			padding: 8rpx;
			border-radius: 8rpx;
			text-align: center;
	}
</style>
