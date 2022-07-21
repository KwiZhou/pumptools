<template>
	<view>
	
		<u-empty
				v-if="show"
		        mode="data"
		        icon="http://cdn.uviewui.com/uview/empty/data.png"
				text="暂无云端数据记录"
				textSize="18"
		>
		</u-empty>
		<view>
			<u-cell-group>
					<u-cell v-for="item in zdData" :key="item.requestId" iconStyle="color:#2979ff" icon="download" size="large" :title="'数据名称：'+item.dataName"
        :value="'采样时间：'+item.addDateDay"
        :label="'描述：'+item.dataDis" @click="getData(item)"></u-cell>
					
			</u-cell-group>
		</view>
		
		<u-modal @confirm="Copy" @cancel="noCopy" showCancelButton :show="copyModalShow" :title="title" cancelText="取消"
			confirmText="复制链接">
			<view style="width: 80%;word-break: break-all;">
				复制以下链接到浏览器打开<br>{{copyContent}}
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'振动数据',
				copyModalShow:false,
				copyContent:'',
				u_emptyshow:true,
				zdData:null,
				show:false
			}
		},
		onLoad(option){
			uni.showLoading({
				title: '请稍后...'
			});
			const db = uniCloud.database({
				provider: 'tencent',
				spaceId: 'tcb-btwikft6f18ccb-1d5bw75a92160'
			})
			let e=getApp().globalData.g_openid
			 db.collection('useropenid')
				.where({
					openid: e
				})
				
				.get()
				.then((res) => {
					if(res.result.data[0].zddata.length===0){
						uni.hideLoading();
						this.show=true
					}else{
						uni.hideLoading();
						this.zdData=res.result.data[0].zddata
					}
					
				}).catch((err) => {
					console.log("err.code", err.code); // 打印错误码
			})
		}
		,
		methods: {
			getData(item){
					
					this.copyContent=item.fileUrl.fileList[0].download_url
					this.copyModalShow=true
			},
			Copy(){
				uni.setClipboardData({
				    data: this.copyContent,
				    showToast:false,
				});
				
				this.copyModalShow=false
			},
			noCopy(){
				this.copyModalShow=false
			}
		}
	}
</script >

<style scoped>

</style>
