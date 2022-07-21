<template>
	<view class="toolsB">
		
		<u-modal @confirm="confirm" @cancel="cancel" showCancelButton :show="show" :title="title" :content='content'
			confirmText="查看"></u-modal>
		<view class="toolsB-itema">
			<u-search  @change="searchTip" shape="round" :showAction="false"></u-search>
		</view>
		<u-loadmore v-if="gb==null" status="loading" />
		<view class="toolsB-itemb">
			<ol v-for="item in gb" :key="item.id">
				<li class='gbitem' @click="gbMotai(item)">
					<view>
						<u--text color="#1555b2" :text=item.code></u--text>
					</view>
					<view>
						<u--text color="#05080a" :text=item.name></u--text>
					</view>
				</li>
				<u-line color="#d3d3d3"></u-line>
			</ol>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: "toolsB",
		data() {
			return {
				gb: null,
				gb1:null,
				show: false,
				title: undefined,
				content: undefined,
				gbUrl:undefined,
				searchValue:""
			};
		},
		mounted() {
			const db = uniCloud.database({
				provider: 'tencent',
				spaceId: 'tcb-btwikft6f18ccb-1d5bw75a92160'
			})
			db.collection('gb')
				.get()
				.then((res) => {
					this.gb = res.result.data
					this.gb1 = res.result.data
				}).catch((err) => {
					console.log("err.code", err.code); // 打印错误码
					console.log("err.message", err.message); // 打印错误内容
				})
		},
		methods: {
			gbMotai(item) {
				this.title = item.code
				this.content = `${item.name}
				标准类别:${item.class}
				标准状态:${item.state}
				实施日期:${item.doDate}
				发布日期:${item.releaseDate}
				`
				this.gbUrl=item.url
				this.show = true
			},
			confirm() {
				
				uni.setClipboardData({
					data: "http://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno="+this.gbUrl,
					success: function() {
						uni.showToast({ //提示
							title: 'url复制成功'
						})
					},
				});
				this.show = false
			},
			cancel() {
				this.show = false
			},
			searchTip(e){
				console.log(e)
				this.searchValue=e
				this.gb=this.gb1.filter((item)=>{
				return	item.keyword1.indexOf(e)>-1
				})
			}
		},
		watch:{
			searchValue(n,o){
				if(n==""){
					this.gb=this.gb1
				}
			}
		}
	}
</script>

<style scoped>
	.gbitem {
		padding: 2rpx 0rpx 10rpx 15rpx;
	}

	.toolsB {
		padding: 18rpx;
	}

	.toolsB-itemb {
		overflow: auto;

		height: 80vh;
		padding: 10rpx 0;
	}

	.toolsB-itemb li {
		list-style: none;
	}
</style>
