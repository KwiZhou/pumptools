<template>
	<view class="breadFooter">
		<u-modal @confirm="confirm" @cancel="cancel" showCancelButton :show="show" 
			confirmText="复制Git地址">
			<view class="slot-content">
						<text >{{content}}</text> 
						<view class="github">
							<u-icon name="github-circle-fill" color="#2979ff" size="58"></u-icon>
							<text >👍 👍 👍 </text> 
							<u-avatar :src="src" size="50"></u-avatar>
						</view>
			</view>
		</u-modal>
		<u-cell-group :border=false>
			<view  v-for="item in breadFooterList" :key="item.id">
				<u-cell   size=large @click='toGo(item)' isLink :iconStyle='item.iconStyle' :icon="item.icon" :title="item.title">
				<text class="u-cell-text"  slot="title" >{{item.title}}</text>
				</u-cell>
			</view>
			
			<view >
				
				
					<u-cell   size=large  isLink iconStyle='color:#2979ff' icon="attach" title="联系我们" >
					<text class="u-cell-text"  slot="title" >联系我们</text>
					<button class='button' open-type="contact"></button>
					</u-cell>
				
			</view>
			
			
			<view >
				
					<u-cell   size=large  isLink iconStyle='color:#71d5a1' icon="calendar" title="意见反馈">
					<text class="u-cell-text"  slot="title" >意见反馈</text>
					<button class='button' open-type="feedback"></button>
					</u-cell>
				
			</view>
			<view >
				
			</view>
				
			
		
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		name: "breadFooter",
		data() {
			return {
				src:"https://www.kwikwi.xyz/images/kwiImg.jpg",
				
				content:"如果pumptools有帮助到你，能帮我在GitHub上点个star吗～",
				show:false,
				breadFooterList:[
					{
						title:'GitHub',
						icon:'github-circle-fill',
						iconStyle:{
							color:'black',
							
						},
						url:'https://github.com/KwiZhou/pumptools',
						id:0
					},
					
					{
						title:'关于PumpTools',
						icon:'edit-pen',
						iconStyle:{
							color:'#ff9900'
						},
							id:1,
						url:'../../pages/myself/aboutPumpTools/aboutPumpTools'
					}
					
					
				]
			};
		},
		methods:{
			confirm() {
				
				uni.setClipboardData({
				    data: "https://github.com/KwiZhou/pumptools",
				    showToast:false
				});
				this.show = false
			},
			cancel() {
				this.show = false
			},
			toGo(e){
				
				
				if(e.id==0){
					this.show=true
				}else if(e.id==1){
					console.log(e.url)
					uni.navigateTo({
						url:e.url
					})
				}
				
			}
		}
	}
</script>

<style>
	.button {
	 width: 100%;
	 background: white;
	 border: none;
	 text-align: left;
	 line-height: 1.6;
	 border-radius: 0;
	 padding: 0;
	 margin: 0;
	}
	.button::after {
	  border: #FFF solid;
	}
	.breadFooter{
		padding: 18rpx;
	}
	.u-cell-text{
		padding-left: 18rpx;
	}
	.github{
		display: flex;
		align-items: center;
		padding: 10rpx;
		justify-content:space-around;
	}
</style>
