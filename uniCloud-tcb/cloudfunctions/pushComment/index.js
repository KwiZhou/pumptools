'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log("1",event)
	const db = uniCloud.database({
		provider: 'tencent',
		spaceId: 'tcb-btwikft6f18ccb-1d5bw75a92160'
	})
	const _ = db.command;
	let has = false //无数据
	let r1=	await db.collection('comment')
		.get()
		
	if (r1.data.length > 0) {
		has = true //有数据
	}		
		
	if (has) {
		let r2=await db.collection('comment')
			.where({
				'seriseCode': event.mostData.seriseCode
			})
			.update({
				comment: _.unshift({
					"customerOpenid": event.mostData.customerOpenid,
					"customerImg": event.mostData.customerImg,
					"customer": event.mostData.customer,
					"date": event.mostData.date,
					"commentImgUrl": event.mostData.commentImgUrl,
					"productComment": event.mostData.productComment
				})
			}) 
			return {
					"customerOpenid": event.mostData.customerOpenid,
					"customerImg": event.mostData.customerImg,
					"customer": event.mostData.customer,
					"date": event.mostData.date,
					"commentImgUrl": event.mostData.commentImgUrl,
					"productComment": event.mostData.productComment
				}
			
	} else {
		let r3 =await db.collection('comment')
			.add({
				seriseCode: "AS",
				comment: [{
					"customerOpenid": event.mostData.customerOpenid,
					"customerImg": event.mostData.customerImg,
					"customer": event.mostData.customer,
					"date": event.mostData.date,
					"commentImgUrl": event.mostData.commentImgUrl,
					"productComment": event.mostData.productComment
				}]
			})
			return {
					"customerOpenid": event.mostData.customerOpenid,
					"customerImg": event.mostData.customerImg,
					"customer": event.mostData.customer,
					"date": event.mostData.date,
					"commentImgUrl": event.mostData.commentImgUrl,
					"productComment": event.mostData.productComment
				}
				
	}
	//返回数据给客户端

};
