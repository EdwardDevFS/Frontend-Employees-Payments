import Vue from 'vue'
import VueRouter from 'vue-router';


import App from './App.vue'

import ShopLayout from './components/ShopLayout.vue';
import EmployeeData from './components/EmployeeData.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from './store';


Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);


const routes = [
  { path: '/', component: EmployeeData },
  { path: '/edit/:id', component: ShopLayout },
  { path: '/create', component: ShopLayout },
  { path: '/test', component: ShopLayout },
];

const router = new VueRouter({
  mode: 'history',
  routes
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


