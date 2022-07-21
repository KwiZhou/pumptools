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
				
					<u-cell v-for="item in reportListData" :key="item.addDate" iconStyle="color:#2979ff" icon="download" size="large" :title="'数据名称：'+item.dataName"
        :value="'计算时间：'+item.addDateDay"
        :label="'描述：'+item.dataDis" @click="getData(item)"></u-cell>
					
			</u-cell-group>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				  
				reportListData:null,
				show:false
				
			}
		},
		onLoad(){
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
					if(res.result.data[0].noisedata.length===0){
				
						
						uni.hideLoading()
						this.show=true
						console.log(1,res)
					
					}else{
					
						uni.hideLoading()
						this.reportListData=res.result.data[0].noisedata
					}
					
					
				}).catch((err) => {
					console.log("err.code", err.code); // 打印错误码
			})
		}
		,
		methods: {
			getData(item){
				
				  
			let border1=20, border2=80,s=[],m=[],b=[]
			item.dataList.forEach((res,index)=>{
			    if(res<border1){
			        s.push([index,res])
			    }else if(res>border2){
			        b.push([index,res])
			    }else{
			        m.push([index,res])
			    }
			})

			let noiseData={
			   series:[
			    {
			        name:`<${border1}`,
			        data:s
			    },
			    {
			        name:`${border1}~${border2}`,
			        data:m
			    },
			    {
			        name:`>${border2}`,
			        data:b
			    }
			   ]
			}
			let dataStr=JSON.stringify(noiseData)
	
					
					 uni.navigateTo({
						url:`./noiseDataChart/noiseDataChart?str=${dataStr}&addDateDay=${item.addDateDay}&dataName=${item.dataName}&dataDis=${item.dataDis}&dataMin=${item.dataPanel[0][1]}&dataMax=${item.dataPanel[2][1]}`
					}) 
					
			}
		}
	}
</script >

<style scoped>

</style>
