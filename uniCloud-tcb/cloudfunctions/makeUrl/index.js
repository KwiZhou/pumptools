'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	
	let appid = "wxd2308b6613ae251c" //需替换
	let secret = "44fb27b327f9ab20ae72eea8a5ff5c5c" //需替换
	let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' +
		secret +
		'&js_code=' +
		event.code + '&grant_type=authorization_code';
	//返回数据给客户端
	const requestOptions = {
			method: 'GET',
			dataType: 'json'
		}
	let res = await uniCloud.httpclient.request(url,requestOptions)
	
	let op={
		openid:res.data.openid
	}
	
	return res.data.openid
};
