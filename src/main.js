import Vue from 'vue'
import App from './App'

//  uView
import uView from 'uview-ui';
Vue.use(uView);
//引入icofont
import './assets/iconfont/iconfont.css'
//$bus 全局事件总线
Vue.prototype.$EventBus = new Vue()
//公共方法
//1 获取nickname并去注册

Vue.prototype.getUserInfo = async function(e) {
	let openId, userInfo, session_key
	//重置全局变量
	getApp().globalData.hasUserInfo = true
	getApp().globalData.user = e
	//获取openid
	let r1 = await uni.login({
		provider: 'weixin'
	})
	let r2 = await uniCloud.callFunction({
		name: 'makeUrl',
		data: {
			code: r1[1].code
		}
	})

	function op() {
		openId = r2.result
		// session_key = r2.result.data.session_key
		getApp().globalData.g_openid = openId
		return uniCloud.callFunction({
			//这个云函数会将判断是不是第一次注册，如果是第一次注册的就把
			//用户信息push到数据库里面
			name: 'getOpenId',
			data: {
				openId: openId,
				userInfo: e
			}
		})
	}
	let r4 = await op()
	let r5 = await uni.setStorage({
		key: 'storage_userInfo',
		data: r4.result,
	})
	return r4.result.openid
}





import calculatorOutput from './components/calculatorOutput/calculatorOutput'
import ninetyDegreeElbow from './components/ninetyDegreeElbow/ninetyDegreeElbow'
Vue.component("ninetyDegreeElbow", ninetyDegreeElbow)
import noNinetyDegreeElbow from './components/noNinetyDegreeElbow/noNinetyDegreeElbow'
Vue.component("noNinetyDegreeElbow", noNinetyDegreeElbow)

import crossSectionMutation from './components/crossSectionMutation/crossSectionMutation'
Vue.component("crossSectionMutation", crossSectionMutation)

import calculatorInput from './components/calculatorInput/calculatorInput'
import calculatorHead from './components/calculatorHead/calculatorHead'
import panel from './components/panel/panel'
import toolsA from './components/toolsA/toolsA'
import toolsAzdChart from './components/toolsAzdChart/toolsAzdChart'
//
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
