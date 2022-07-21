'use strict';
exports.main = async (event, context) => {
	//addCommentImgurlToCloud，本函数负责将用户评论的图片的云存储地址写入到comment表中
	console.log('event : ', event)
	
	//返回数据给客户端
	return event
};
