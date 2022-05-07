import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/user/Users.vue'
import Roles from '../components/role/Roles.vue'
import Rights from '../components/role/Rights.vue'
import GoodsList from '../components/GoodsManagement/GoodsList.vue'
import Add from '../components/GoodsManagement/Add.vue'
import UpdateGoods from '../components/GoodsManagement/UpdateGoods.vue'
import Params from '../components/GoodsManagement/Params.vue'
import GoodsClassify from '../components/GoodsManagement/GoodsClassify.vue'
import Orders from '../components/Orders/order.vue'
import Reports from '../components/Reports/reports.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
}, {
    path: '/login',
    component: Login
}, {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: User },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights },
        { path: '/goods', component: GoodsList },
        { path: '/params', component: Params },
        { path: '/categories', component: GoodsClassify },
        { path: '/orders', component: Orders },
        { path: '/reports', component: Reports },
        { path: '/add', component: Add },
        { path: '/update/:id', component: UpdateGoods }

    ]
}]

const router = new VueRouter({
        routes
    })
    // 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to 将要访问的路径; from 代表从哪个路径跳转而来;next 是一个函数,表示放行。next() 放行  next('/login')  强制跳转


    // 如果客户是访问登录界面 就直接放行
    if (to.path === '/login') return next()
        // 获取 token
    const tokend = window.sessionStorage.getItem('token')
        // 如果没有 token 值就强制跳转到登录界面
    if (!tokend) return next('/login')
    next()

})
export default router