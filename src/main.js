// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import MyServerHttp from './plugins/http'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/css/reset.css'
import App from './App'
import router from './router'
import moment from 'moment'
import MyBread from './components/cuscom/myBread.vue'

Vue.use(ElementUI)
Vue.use(MyServerHttp)
Vue.config.productionTip = false

Vue.filter('fmtdata', (v) => {
  return moment(v).format('YYYY-MM-DD')
})

// eslint-disable-next-line spaced-comment
//全局自定义组件
Vue.component(MyBread.name, MyBread)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
