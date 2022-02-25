<template>
	<view class="calculatorOutput">
		<view class="line"></view>
	
		<template v-for="item in calculatoroutputclass">
			<view class="OutputName">
				<text >
					{{item.name}}
				</text>
				<span>
					{{outputV[item.id]}}
				</span>
			</view>
			<view class="line"></view>
		</template>
	
	</view>
</template>

<script>
	export default {
		name:"calculatorOutput",
		props:['calculatoroutputclass','outputV'],
		data() {
			return {
				
			};
		},
		
	}
</script>

<style>
	.calculatorOutput{
		padding-top: 50rpx;
	}
	.OutputName {
		padding: 15rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 70%;
	}
	
	
	.OutputName input{
		padding-left:70rpx;
	}
	

	.calculatorOutput {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: left;
	}

	.line {
		width: 100%;
		background-color: grey;
		opacity: 0.2;
		height: 1rpx;
		width: 80%;
	

	}
</style>
