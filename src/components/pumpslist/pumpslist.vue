<template>
	<view>
		<u-index-list :index-list="indexList">
				<template v-for="(item, index) in itemArr">
					<!-- #ifdef APP-NVUE -->					
					<u-index-anchor :text="indexList[index]"></u-index-anchor>
					<!-- #endif -->
						
					<u-index-item v-if="item!=0">
						<!-- #ifndef APP-NVUE -->
						<u-index-anchor :text="indexList[index]"></u-index-anchor>
						<!-- #endif -->
						<view class="list-cell"  @click="toGO(item)">
							<image class="list__item__avatar" style="width: 110rpx;height: 110rpx;" :src="item.brandimg"></image>
							<u-text :text="item.brandname" size="18" type="info"></u-text>
						</view>
					</u-index-item>
				</template>
		</u-index-list>
	</view>
</template>

<script>

	const indexList = () => {
			const indexList = []
			const charCodeOfA = 'A'.charCodeAt(0)
			
			for (let i = 0; i < 26; i++) {
				indexList.push(String.fromCharCode(charCodeOfA + i))
			
			}
			
			indexList.push('#')
			return indexList
		}
	export default {
		name:"pumpslist",
		data() {
			return {
				
				indexList: indexList(),
				itemArr: null
			};
		},
		created() {
			
		},
		mounted() {
			
			
			const db = uniCloud.database({
				provider: 'tencent',
				spaceId: 'tcb-btwikft6f18ccb-1d5bw75a92160'
			}) 
			db.collection('brandInfo')
			    .get()
			  .then((res)=>{
				let temp=[]
				
			    res.result.data.forEach((a)=>{
					temp.push(
						{
							brandname:a.brandname,
							brandimg:a.brandimg,
							pingyin:a.pingyin,
							brandindex:a.brandindex
						}
					)
				})
				
				//按照第一个字母的首字母排序后的数组
				let y=temp.sort(this.listSort)
				this.itemArr=new Array(26).fill().map(()=>new Array().fill())
				y.forEach((a)=>{
					
					this.itemArr[a.pingyin.charCodeAt(0)-65]=a
					
				})
					
			  }).catch((err)=>{
			    console.log("err.code",err.code); // 打印错误码
			    console.log("err.message",err.message); // 打印错误内容
			  })
		},
		methods:{
			toGO(item){
				let e=item.brandindex
				console.log(e)
				uni.navigateTo({
				//	url: '../../pages/home/brandInfoPage/brandInfoPage?brandIndex='+e
				url: '../../../pages/home/brandInfoPage/brandInfoPage?brandIndex='+e
				})
				
				console.log(e)
			},
			listSort(a,b){
				if(a.pingyin.charCodeAt()>b.pingyin.charCodeAt()){
					return 1
				}else if((a.pingyin.charCodeAt()<b.pingyin.charCodeAt())){
					return -1
				}else{
					return 0
				}
								
			}
		}
	}
</script>

<style lang="scss" scoped>
.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
		align-items: center;
	}
</style>
