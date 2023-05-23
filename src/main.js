import { createApp } from 'vue'
import  router  from './router/index'
import store from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from './App.vue'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
