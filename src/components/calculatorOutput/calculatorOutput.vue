<template>
	<view class="totol">
		<u-cell-group :border="true">
			<template v-for="item in calculatoroutputclass">
				<u-cell :border="true" :title="item.name">
					<input :value="outputV[item.id]" disabled slot="right-icon" class="inputb"></input>
				</u-cell>
			</template>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		name: "calculatorOutput",
		props: ['calculatoroutputclass', 'outputV'],
		data() {
			return {

			};
		},
		mounted() {
			
		}

	}
</script>

<style scoped>
	.totol {
		padding: 0 50rpx;
		margin-top: 30rpx;
	}

	.inputb {
		text-align: center;
		padding: 8rpx;
		border-radius: 8rpx;
	}
</style>
