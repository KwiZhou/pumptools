<template>
	<view class="page">
		<u-skeleton rows="11" :loading="loading" :rowsHeight="['300px', '69px', '29px','69px', '69px','69px']"
			:rowsWidth="['100%', '50%', '35%','100%']" :title="false">
			<view>
				<view class="mapview">
					<map style="width: 100%; height: 300px;" scale=13 :callout="callout" :latitude="covers[0].latitude"
						:longitude="covers[0].longitude" :markers="covers" show-compass=true>
		
					</map>
				</view>
				<view>
					<view class="top">
						<view style="margin-top: 30rpx;display: flex;align-items: center; ">
							<u--image :src="brandindex.brandimg" width="90px" height="90px">
							</u--image>
							<h4 class="title">
								{{brandindex.brandname}}泵业
							</h4>
						</view>
						<view style="display: flex;align-items: center; ">
							<span class="iconfont icon-maker-02"></span>
							<u--text :text="brandindex.address" type="info" lineHeight=25>
							</u--text>
						</view>
					</view>
					<view class="u-demo-block__content">
						<view class="u-page__text-item">
		
							<view class="textpanel" v-for="item in brandInfo">
								<u--text class="u--text" :text="item[0]" type="info" lineHeight=25>
								</u--text>
								<u--image :src="item[1]" @click="preview(item[1])">
								</u--image>
							</view>
							<u--text style="padding-top: 18rpx;;" :text="brandindex.p4" type="info" lineHeight=25>
							</u--text>
							<u-divider text="没有更多了"></u-divider>
						</view>
					</view>
				</view>
				<view></view>
			</view>
		
		</u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: true,
				brandindex: {},
				imgIndex: 0,
				brandInfo: null,
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: undefined,
				longitude: undefined,
				covers: [{
					latitude: undefined,
					longitude: undefined,
					iconPath: '../../../static/maker-02.png'
				}],
				callout: {
					content: undefined
				}
			}
		},
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
			let brandIndex = option.brandIndex
			const db = uniCloud.database({
				provider: 'tencent',
				spaceId: 'tcb-btwikft6f18ccb-1d5bw75a92160'
			})
			db.collection('brandInfo')
				.where({
					brandindex: brandIndex
				})
				.get()
				.then((res) => {
					this.brandindex = res.result.data[0],
						this.callout.content = this.brandindex.brandname
					this.covers[0].latitude = this.brandindex.latitude
					this.covers[0].longitude = this.brandindex.longitude
					this.brandInfo = [
							[this.brandindex.p1, this.brandindex.imga],
							[this.brandindex.p2, this.brandindex.imgb],
							[this.brandindex.p3, this.brandindex.imgc],
						]

						setTimeout(()=>this.loading = false,999)

				}).catch((err) => {
					console.log("err.code1", err.code); // 打印错误码
					console.log("err.message1", err.message); // 打印错误内容
				})
		},
		methods: {
			preview(e) {
				let that = this
				uni.previewImage({
					urls: [e],
				});
			},
		}
	}
</script>

<style scoped>
	.page{
		padding: 18rpx;
	}
	.top {
		padding: 18rpx;
	}

	.u-demo-block__content {
		text-indent: 1.5rem;
	}

	.u-page__text-item {
		padding: 18rpx;
	}

	.textpanel {
		padding-top: 18rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

	}

	.u--text {
		padding-bottom: 18rpx;
	}

	.title {
		color: #4b4b4b;
		padding-left: 13rpx;
	}

</style>
