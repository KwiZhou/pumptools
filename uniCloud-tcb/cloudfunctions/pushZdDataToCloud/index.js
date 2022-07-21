'use strict';
exports.main = async (event, context) => {
	let data,_date=Date.now(),_dateDay=new Date(_date).toLocaleDateString()
	const db = uniCloud.database({
		provider: 'tencent',
		spaceId: 'tcb-btwikft6f18ccb-1d5bw75a92160'
	})
	const xlsx = require('node-xlsx');
	const _ = db.command;
	//event为客户端上传的参数
	let xdata = event.x
	let ydata = event.y
	let zdata = event.z
	xdata.unshift('X轴向数据')
	ydata.unshift('y轴向数据')
	zdata.unshift('z轴向数据')
	//1,定义excel表格名
	let dataCVS = ` ${event.date}+'pumpSeletionData.xlsx'`
	//2，定义存储数据的
	let alldata = [];
	alldata.push(xdata);
	alldata.push(ydata);
	alldata.push(zdata);
	//3，把数据保存到excel里
	var buffer = await xlsx.build([{
		name: "the data from pumpSeletion",
		data: alldata
	}]);
	//4，把excel文件保存到云存储里
	let httpAddress = new Promise(
		function(resolve, reject) {
			uniCloud.uploadFile({
					filePath: dataCVS,
					cloudPath: './zdExcel/' +_date +"_"+event.open_Id+ '.xlsx',
					fileContent: buffer, //excel二进制文件
				})
				.then(res => {
					let temp = [res.fileID]
					uniCloud.getTempFileURL({
							fileList: temp
						})
						.then(res => {
							resolve(res)
						})
				})
		})
	await httpAddress.then(res => {
		data = res
		
	})
	
	
    await	db.collection('useropenid')
		.where({
			'openid': event.open_Id

		})
		.update({
			zddata:_.unshift(
					 {
						addDate:_date,
						addDateDay:_dateDay,
						dataDis:event.dataDis||"暂无名称",
						dataName:event.dataName||"暂无描述",
						fileUrl: data
					},
			
			)
		})
	//返回数据给客户端
	return data
};
