<template>
	<view class="main">
		<movable-area>
			<u-subsection :list="list" :current="curNow" @change="sectionChange" mode="subsection" :fontSize='15'>
			</u-subsection>
			<view>
				<view :class="curNow==0?'':'hideBox'">
						<calculatorLineLossa @outputV="outputV"></calculatorLineLossa>
				</view>
				<view :class="curNow==1?'':'hideBox'">
						<calculatorLineLossb @outputV="outputV"  ></calculatorLineLossb>
				</view>
				
			</view>
			<u-popup :round="10" :safeAreaInsetTop="false" :show="show" @close="close" @open="open">
				<view>
					<view class="tableli">
						<view>类型</view>
						<view>单个损失</view>
						<view>数量</view>
						<view>损失</view>
					</view>
					<u-line color="#2979ff"></u-line>
					<view class="tablelia">
						<template v-for="item in outputv">
							<view class="tablelia_a" v-for="i in item">{{i}}</view>
						</template>
						<view v-if="show2">
							<u-line margin="10rpx 0" dashed color="#2979ff"></u-line>
							<view class="tablelia_a" v-for="i in total">
								<view v-show="i!='1'&&i!='2'">
									{{i}}
								</view>
							</view>
						</view>
						<view v-else>
							<view style="text-align: center;">
								暂无数据, 请先计算并添加!
							</view>
						</view>
					</view>
				</view>
				<view>

					<u-button type="primary" :plain="true" @click="calculatorToCloud">
						<text>存入云端</text>
					</u-button>
				</view>
			</u-popup>
			<movable-view :x="x" :y="y" direction="all" @change="onChange">
				<view class="circle" @click="show=true">
					<span class="iconfont tatol"></span>
					<text>管损总计</text>
				</view>
			</movable-view>

			<u-modal @confirm="confirm" @cancel="show3= false" showCancelButton :show="show3" cancelText="取消"
				confirmText="确认">
				<view class="slot-content">
					<text>请您登录，登录后，导出后数据会存档</text>
				</view>
			</u-modal>

			<u-modal @confirm="show5=false" :show="show5" confirmText="确认">
				<view class="slot-content">
					<text>暂无数据，请计算并添加！</text>
				</view>
			</u-modal>

			<u-modal @confirm="confirmToCloud" @cancel="show4 =false" showCancelButton :show="show4" title="请输入数据描述"
				cancelText="取消" confirmText="存入云端">
				<view class="slot-content">
					<u--input placeholder="数据名称" v-model="dataName"></u--input>
					<u-gap height="20"></u-gap>
					<u--textarea v-model="dataDis" placeholder="数据描述"></u--textarea>
				</view>
			</u-modal>
		</movable-area>



	</view>

</template>

<script>
	import myMixin from "../../../components/myMixin.js"
	export default {
		mixins: [myMixin],
		data() {
			return {
				x: 290,
				y: 630,
				old: {
					x: 0,
					y: 0
				},
				show4: false,
				show3: false,
				list: ['沿程损失', '局部损失'],
				curNow: 0,
				outputv: [],
				show: false,
				//总计损失显示不？
				show2: false,
				toCloudData: [],
				dataDis: undefined,
				dataName: undefined,
				show5: false
			}
		},
		methods: {
			tap: function(e) {
				this.x = this.old.x
				this.y = this.old.y
				this.$nextTick(function() {
					this.x = 30
					this.y = 30
				})
			},
			onChange: function(e) {
				this.old.x = e.detail.x
				this.old.y = e.detail.y
			},
			//计算结果备注模态框
			confirmToCloud() {
				this.show4 = false


				uniCloud.callFunction({
					name: 'pushCalculatorResult',
					data: {
						open_Id: getApp().globalData.g_openid,
						calculatorResult: this.toCloudData,
						dataDis: this.dataDis,
						dataName: this.dataName,
					}
				}).then(res=>{
					console.log('已存入云端',res)
					uni.showToast({
						title: '已存入云端',
						duration: 1500
					});
				})
			},

			//登陆模态框
			confirm() {
				this.show3 = false
				let user
				wx.getUserProfile({
					desc: '授权登录',
					success: (res) => {
						this.getUserInfo(res.userInfo).then(res => {
							//res为openid，已完成本地信息存储
							//此时启动数据描述面板或者“暂无数据，请添加数据面板”
							if (this.show2) {
								this.show4 = true
							} else {
								this.show5 = true
							}
						})
						//this.$refs.toolsA_zd_childa.postAccData(res.userInfo)
					}
				})
			},
			
			calculatorToCloud() {
				//检查登陆状态
				let result = this.checkLoginState()

				if (result) {
					//如果登陆了，先检查添加面板中是否有数据（data中show2），没有警告用户先添加数据，有的话就开始推入云端
					if (this.show2) {
						this.show4 = true
					} else {
						this.show5 = true
					}
				} else {
					//登陆模块显示
					this.show3 = true
				}

			},
			sectionChange(index) {
				this.curNow = index;
			},
			outputV(e) {
				this.toCloudData.push(e)
				this.outputv.push(e.outputV)
				this.show2 = true
			},
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			}
		},
		computed: {
			total: function() {
				let tool = 0
				this.outputv.forEach((item) => {
					tool += parseFloat(item[3])
				})
				tool += "m"
				return ['1', '2', '总计损失', tool]
			}
		}

	}
</script>

<style scoped>
	.main{
		overflow-x: hidden;
		overflow-y: auto;
	}
	.u-button {
		width: 40%;
	}

	.tableli {
		color: #2979ff;
		font-weight: bold;
		padding: 40rpx 0 20rpx 0;

	}

	.tableli view {
		width: 25%;
		display: inline-block;
		text-align: center;

	}

	.tablelia {
		color: #5a739a;
		font-weight: bold;
		padding-bottom: 200rpx;
		padding: 20rpx 0 30rpx 0;

	}

	.tablelia_a {
		width: 25%;
		display: inline-block;
		text-align: center;
	}


	.circle {
		width: 80px;
		height: 80px;
		overflow: hidden;
		text-align: center;

		display: flex;
		flex-direction: column;
		font-size: 10rpx;
		color: #7f7f7f;
	}

	.tablelia_b {
		width: 50%;
		display: flex;
	}

	movable-area {
		width: 100%;
		height: 100vh;
	}
	.hideBox{
		position: absolute;
		top: -2000px;
	}
</style>
