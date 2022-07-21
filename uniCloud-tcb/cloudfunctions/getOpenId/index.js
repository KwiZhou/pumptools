'use strict';
//该函数获取页面传过来的openid和用户信息将其记录在unicloud中的集合里面
exports.main = async (event, context) => {
	let i=null
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database({
		provider: 'tencent',
		spaceId: 'tcb-btwikft6f18ccb-1d5bw75a92160'
	})
	let areOldUser = await db.collection('useropenid')
		.where(
			{"openid": event.openId}
		)
		.get()
		
	
		
			// 获取 `user` 集合的引用
			
		
			if (areOldUser.data[0] == null) {
			let r=await db.collection('useropenid').add({
				     openid:event.openId,
				     userinfo:event.userInfo,
				     comment: [],
				     report: [],
				     zddata: [],
					 noisedata:[]
				    })
				
				i={
					openid:event.openId,
					userinfo:event.userInfo,
				}
				console.log('第一次注册',i)
				return i
			} else {
				i={
					openid:event.openId,
					userinfo:event.userInfo,
				}
				console.log('已经注册过来人，直接返回数据',i)
				return i
			}
	

 

	//返回数据给客户端
	
	
};
