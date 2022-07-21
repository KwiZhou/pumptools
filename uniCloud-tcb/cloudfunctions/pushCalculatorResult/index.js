'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let data,_date=Date.now(),_dateDay=new Date(_date).toLocaleDateString()
	const db = uniCloud.database({
		provider: 'tencent',
		spaceId: 'tcb-btwikft6f18ccb-1d5bw75a92160'
	})
	const _ = db.command;
	let res=await	db.collection('useropenid')
		.where({
			'openid': event.open_Id
		})
		.update({
		report:_.unshift(
					{
						addDate:_date,
						addDateDay:_dateDay,
						dataDis:event.dataDis||"暂无名称",
						dataName:event.dataName||"暂无描述",
						fileUrl: event.calculatorResult
					},
		)
	})
	//返回数据给客户端
	return res
}
