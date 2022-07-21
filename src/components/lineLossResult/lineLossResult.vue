<template>
	
		<!--  -->
		<view v-show="outputvresult[3]" class="resultPanel" >
			<view class="title"><u--text size="24" type="info" text="沿程损失"></u--text></view>
			<view class="value"><u--text size="24" type="info"  :text="outputvresult[3]"></u--text></view>
		</view>
	
</template>

<script>
	export default {
		name:"lineLossResult",
		props:["outputvresult"]
	}
</script>

<style>
	.resultPanel{
			display:flex;
			justify-content: space-around;
	}
</style>
