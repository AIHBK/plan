<template>
  <div class="header-container">
    <div class="left-container header-content-container"><h3>每日计划</h3></div>
    <div class="right-container header-content-container">
      <span>姓名:&nbsp;{{ userData.userName }}</span>
      <span>手机号:&nbsp;{{ userData.phone}}</span>
      <!-- <span>{{ userData.}}</span>
      <span>{{ userData.}}</span> -->
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex' // 引入useStore 方法
import { toRaw } from 'vue'
export default {
  name: 'HeaderPage',
  setup() {
    /************************* 变量 ************************/ 
    let store = useStore() // store
    let userData = toRaw(store.state.userData) // 获取vuex中数据
    
    /************************* 接口调用 ************************/ 
    const methods = {

    }
    return {
      userData,
      ...methods
    }
  },
}
</script>

<style>
.header-container {
  width: 100%;
  height: 60px;
  position: relative;
}
.header-content-container {
  display: inline-block;
}
.left-container {
  position: absolute;
  left: 0;
}
.right-container {
  position: absolute;
  right: 0;
  top: 18px;
}
.right-container span {
  margin-left: 10px;
}
</style>