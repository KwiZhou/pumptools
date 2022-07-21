<template>
	<view class="evaluate" >
		<view class="evaluate-itema">
			<view class="evaluate-itema-a">
				<view>
					<u-avatar size='35' :src="commentitem.customerImg"></u-avatar>
				</view>
				<view  style="padding-left: 20rpx;">
					<text class="name">{{commentitem.customer}}</text>
				</view>
			</view>
			<view class="evaluate-itema-b">
				<text class="date">{{commentitem.date}}</text>
			</view>
		</view>
		
		<view class="evaluate-itemb">
			<text class="comment">{{commentitem.productComment}}</text>
		</view>
		<view  class="evaluate-itemImage"  v-if="commentitem.commentImgUrl[0]">
			<view class="w" v-for="item in commentitem.commentImgUrl">
				
				<u--image :lazy-load="true" width="100px" height="100px" :src="item"  @click="click(index)">
				</u--image>
			</view>	
		</view>
		<u-line></u-line>
	</view>
</template>

<script>
	export default {
		props:["commentitem"],
		name:"evaluate",
		data() {
			return {
				count: 4,
				value: 2,
			};
		},
		mounted() {
			
		},
		methods:{
			click(e){
				uni.previewImage({
					
					urls:this.commentitem.commentImgUrl,
					
				});
			}
		}
		
	}
</script>

<style scoped>
	.name{
		font-size: 37rpx;
	}
	.comment{
		font-size: 32rpx;
	}
	.date{
		font-size: 28rpx;
		
		color: #aaaaaa;
			}
.evaluate{
	padding: 20rpx;
	
	color:#82848a;
}
.evaluate-itema view{
	padding-left:5rpx ;
	color:#303133;
	
}

.evaluate-itemb{
	padding: 20rpx;
}

.evaluate-itema{
	display: flex;
	padding: 20rpx;
	justify-content:space-between;
	align-items: center;
	
}

.evaluate-itema-a{
	display: flex;
	align-items: center;
	
}
.evaluate-itemImage{
	
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	  
	 
	   
}
.w{
		
		
		margin: 22rpx  auto;
}
</style>
