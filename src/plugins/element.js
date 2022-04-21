import Vue from 'vue'
import { Tree, Tag, Row, MessageBox, Tooltip, Dialog, Pagination, Switch, Select, Option, Card, BreadcrumbItem, Breadcrumb, TableColumn, Table, Button, Form, FormItem, Input, Message, Container, Header, Main, Aside, Col, Menu, Submenu, MenuItemGroup, MenuItem } from 'element-ui'


Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Menu)
Vue.use(Col)
Vue.use(Submenu)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(Card)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tooltip)
Vue.use(Row)
Vue.use(Tag)
Vue.use(Tree)

// 把信息弹框 挂载到vue原型链上 $sa 是可以自定义的
Vue.prototype.$sa = Message
Vue.prototype.$sd = MessageBox.confirm