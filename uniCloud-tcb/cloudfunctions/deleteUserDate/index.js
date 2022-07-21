'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database({
		provider: 'tencent',
		spaceId: 'tcb-btwikft6f18ccb-1d5bw75a92160'
	})
	const _ = db.command;
	
let r	=await	db.collection('useropenid')
		.where({
			'openid': event.open_Id
		}).get(
			{
				noisedata:_.neq(addDate:1)
			}
		)
		console.log(1,r)
	//返回数据给客户端
	return event
};
