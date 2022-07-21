<template>
	<view class="commentInputPanel">
		<view class="commentInputPanel-itema">
			<u--textarea autoHeight v-model="value1" placeholder="请输入内容"></u--textarea>
		</view>
		<view class="commentInputPanel-itemb" @click="chooseImage">
			<u-icon size='23' name="photo"></u-icon>
		</view>
		<view class="commentInputPanel-itemc">
			<u-button plain text="发送" type='primary' @click='sendComment'></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "commentInputPanel",
		props: ['toSonDataC'],
		data() {
			return {
				value1: "",
				imageLocalUrl: "",
				sendCommentContent: null,
				imageHttpUrl: []
			};
		},
		methods: {
			async getStorageUserInfo() {
				let that = this
				await uni.getStorage({
					key: 'storage_userInfo',
					success: function(res) {
						that.combiningSendObjects(res.data.result)
					}
				})
			},
			async combiningSendObjects(data) {
				let that=this
				if (this.imageLocalUrl == "" && (this.value1 == undefined || this.value1 == '')) {
					uni.showToast({ //提示
						title: '请输入评论',
						icon: 'error'
					})
					return
				}
				uni.showToast({ //提示
					title: '正在发送评论',
					icon: "loading",
					duration: 2000
				})
				if (this.imageLocalUrl) {
					
					await this.localImageToCloud(data)
					
				} else {
					let myDate = new Date().toLocaleDateString()
				
					let mostData = {
						"seriseCode":this.toSonDataC,
						"customerOpenid": data.openid,
						"customerImg": data.userinfo.avatarUrl,
						"customer": data.userinfo.nickName,
						"date": myDate,
						"commentImgUrl": this.imageHttpUrl,
						"productComment": this.value1
					}
					
					//调用云函数将评论写入系列产品中
					uniCloud.callFunction({
							name: 'pushComment',
							data: {
								mostData: mostData,
								
							}
						})
						.then(res => {
							this.$emit("newComment",res)
							console.log("newComment",res)
							that.value1=""
							uni.showToast({ //提示
								title: '发送成功',
								
							})
						});
				}
			},
			async localImageToCloud(data) {
				let temp = [],that=this
				for (let i = 0; i < this.imageLocalUrl.length; i++) {
					await uniCloud.uploadFile({
						filePath: this.imageLocalUrl[i],
						cloudPath: './asCommentImage/' + Date.now() + '.jpg',
						success(res) {
							let fileList_f = [res.fileID]
							uniCloud.getTempFileURL({
									fileList: fileList_f
								})
								.then(res => {
									temp.push(res.fileList[0].download_url)
									this.imageHttpUrl = temp
									let myDate = new Date().toLocaleDateString()
									let mostData = {
										"seriseCode":that.toSonDataC,
										"customerOpenid": data.openid,
										"customerImg": data.userinfo.avatarUrl,
										"customer": data.userinfo.nickName,
										"date": myDate,
										"commentImgUrl": this.imageHttpUrl,
										"productComment": that.value1
									}
									
									//调用云函数将评论写入系列产品中
									uniCloud.callFunction({
											name: 'pushComment',
											data: {
												mostData: mostData
											}
										})
										.then(res => {
											
											that.$emit("newComment",res)
											console.log("newComment",res)
											uni.showToast({ //提示
												title: '发送成功'
											})
											
											that.value1 = ""
											that.imageLocalUrl = ""
											that.imageHttpUrl = [] 
										});

								})
						}
					});
				}

			},
			checkLoginState() {

				let that = this
				uni.getStorage({
					key: 'storage_userInfo',
					success: function(res) {
					
						that.combiningSendObjects(res.data)
						that.$EventBus.$emit('event', res.data.userinfo);

					},

					fail: function(res) {
						wx.getUserProfile({
							desc: '授权登录',
							success: (res) => {
									
								that.$EventBus.$emit('event', res.userInfo);
								that.combiningSendObjects(res.data)
								that.userInfo = res.userInfo,
									that.getUserInfo(res.userInfo),
									that.getStorageUserInfo()

							}
						})

					}
				})



			},
			sendComment() {
				//本地储存获取用户信息
				let result = this.checkLoginState()
			},
			async chooseImage() {
				let that = this
				await uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						that.imageLocalUrl = res.tempFilePaths
					}
				});
			}
		}
	}
</script>

<style scoped>
	.commentInputPanel {
		display: flex;
		justify-content: space-around;
		box-shadow: 0 -1rpx 1rpx rgb(139, 138, 141, 0.3);
		align-items: center;
		background-color: white;
	}

	.commentInputPanel-itema {
		padding: 15rpx 0rpx 15rpx 15rpx;
		flex-grow: 1;
	}

	.commentInputPanel-itemb {
		padding: 15rpx 0rpx 15rpx 15rpx;
	}

	.commentInputPanel-itemc {
		padding: 15rpx;
	}
</style>
