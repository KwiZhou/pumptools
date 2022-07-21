<template>
	<view class="topmap">
		<view>
			<u-icon name="photo"  size="89"></u-icon>
			
		</view>
		<view>
			<u-icon name="photo"  size="89"></u-icon>
			1
		</view>
		<view>
			<u-icon name="photo" size="89"></u-icon>
			1
		</view>
		<view>
			<u-icon name="photo" size="89"></u-icon>
			1
		</view>
	</view>
</template>

<script>
	export default {
		name:"topmap",
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
.topmap{
	display: flex;
	justify-content: space-evenly;
}
.topmap view{
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
