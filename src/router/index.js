import { createRouter, createWebHistory } from 'vue-router'
//路由数组
const routes = [
{ 
  // 登陆
  path: '/login',
  name: 'login',
  component: () => import('../components/LoginPage.vue')
},
{ // 重定向
  path: '/',
  redirect: '/login'
},
{
  name: 'homePage',
  path: '/home',
  component: () => import('../components/HomePage.vue'),
  children: [
    {
      name: 'planPage',
      path: 'plan',
      component: () => import('../components/Plan/PlanPage.vue')
    },
    {
      name: 'addPlanPage',
      path: 'addPlan',
      component: () => import('../components/Plan/AddPlanPage.vue')
    }
  ]
},
]

//路由对象
const router = createRouter({
  history: createWebHistory(),
  routes //上面的路由数组
})

//导出路由对象，在main.js中引用
export default router