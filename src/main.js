import Vue from 'vue'
import App from './App'

//引入icofont
import  './assets/iconfont/iconfont.css'
//
//注册全局组件
import calculatorOutput from './components/calculatorOutput/calculatorOutput'
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
