import Vue from 'vue'
import { Button, Form, FormItem, Input, Message, Container, Header, Main, Aside } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)

// 把信息弹框 挂载到vue原型链上 $sa 是可以自定义的 
Vue.prototype.$sa = Message