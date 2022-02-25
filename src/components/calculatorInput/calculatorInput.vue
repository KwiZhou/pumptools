<template>
	<view class="calculatorInput">
		<view style="width: 100%;background-color:grey;opacity: 0.2;height: 1rpx;width:80%;"></view>

		<template v-for="item in calculatorinputclass">
			<view class="inputName">
				<view>
					{{item.name}}
				</view>
				<input type="number" :placeholder="unit+item.unit" :data-set="item.id" @blur="getInpuValue"/>
			</view>
			<view class="line"></view>
		</template>

	</view>
</template>

<script>
	export default {
		name: "calculatorInput",
		
		props:['calculatorinputclass'],
		data() {
			return {
				unit:"单位："
			};
		},
		methods:{
			getInpuValue(e){
				this.$emit('postInputValue',[e.target.dataset.set,e.detail.value])
			}
			
		},
		
	}
</script>

<style>
	.calculatorInput{
		padding-bottom: 50rpx;
	}
	.inputName {
		padding: 15rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 70%;
		
	}
	.inputName input{
		padding-left:70rpx;
	}

	.calculatorInput {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.line {
		width: 100%;
		background-color: grey;
		opacity: 0.2;
		height: 1rpx;
		width: 80%;
	

	}
</style>
