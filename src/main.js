// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import qs  from 'qs'

Vue.config.productionTip = false;
Vue.use(ElementUI);
axios.defaults.withCredentials=true
axios.defaults.baseURL='http://localhost:8888/His/'
// prototype:原型
Vue.prototype.$axios=axios
Vue.prototype.$qs=qs
router.beforeEach(function(to, from, next) {
				// // to和from本质上就是路由对象（route）
				// // to：目标路由
				// // from:来源路由
				// // console.log(to);
				// // console.log(from);
				// // console.log(next);
				// // 从目标路由中提取要访问的路径
				// let target = to.path;
				// // 把用户可能访问的路径存储一个集合
				// let targetList = ['/BusinessList','/BusinessInfo'];
				// if(targetList.indexOf(target)!=-1){
				// 	let userId=sessionStorage.getItem('userId');
				// 	if(userId==null){
				// 		router.push('/Login');
				// 		window.location.reload();
				// 	}
				// }
				// // 调用下一个路由守卫者，如果有的话，没有的话就到达目标路径
				next();
			});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
