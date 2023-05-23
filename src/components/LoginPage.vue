<template>
  <div class="login-container">
    <h3 style="text-align: center;margin-top: 80px;">日常计划</h3>
    <el-row class="login-row-container" style="">
      <span>账 号&nbsp;&nbsp;</span>
      <el-input
        class="login-input-container"
        v-model="emitFormObj.phone"
        clearable
        placeholder="请输入手机号"
      />
    </el-row>
    <el-row class="login-row-container" style="">
      <span>密 码&nbsp;&nbsp;</span>
      <el-input
        class="login-input-container"
        v-model="emitFormObj.password"
        clearable
        show-password
        placeholder="请输入密码"
      />
    </el-row>
    <el-row class="login-row-container" style="margin-top: 30px;">
      <el-button type="primary" style="width: 300px;margin-left: 45px;" @click="clickLogin()">登陆</el-button>
    </el-row>
    <el-row class="login-row-container reguser-button" @click="dialogFormVisible = true">
      立即注册
    </el-row>
  </div>
  <!-- 注册dialog start-->
  <el-dialog v-model="dialogFormVisible" width="35%" title="用户注册">
    <el-form :model="regUserObj">
      <el-form-item label="姓 名" :label-width="formLabelWidth">
        <el-input class="form-input-container" v-model="regUserObj.userName" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth">
        <el-input class="form-input-container" v-model="regUserObj.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="密 码" :label-width="formLabelWidth">
        <el-input class="form-input-container" v-model="regUserObj.password" show-password placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="昵 称" :label-width="formLabelWidth">
        <el-input class="form-input-container" v-model="regUserObj.nickname" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="年 龄" :label-width="formLabelWidth">
        <el-input-number v-model="regUserObj.age" :min="1" :max="100" />
        <div style="margin-left: 15px;">
          性 别
          <el-radio-group style="margin-left: 10px; vertical-align: middle;" v-model="regUserObj.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </div>
      </el-form-item>
      
      <el-form-item label="邮 箱" :label-width="formLabelWidth">
        <el-input class="form-input-container" v-model="regUserObj.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="地 址" :label-width="formLabelWidth">
        <!-- <el-input class="form-input-container" v-model="regUserObj.address" placeholder="请输入地址" /> -->
        <el-cascader
          class="cascader-container"
          size="large"
          :options="regionData"
          v-model="location"
          @change="handleChange"
        >
      </el-cascader>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="clickRegUser">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 注册dialog end-->
</template>

<script>
import { login, regUser } from '../api/login'
import { regionData, codeToText } from 'element-china-area-data'
import { empty } from '../util/index'
import { reactive, ref, toRaw } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex' // 引入useStore 方法
export default {
  components: {

  },
  setup() {
    // 变量
    const store = useStore() // vuex
    let router = useRouter() // 路由
    let location = reactive([]) // 组件地址
    let dialogFormVisible = ref(false) // 注册dialog
    const formLabelWidth = ref('100px') // 注册提示信息文本宽度
    let emitFormObj = reactive({ // 登陆信息
      phone: '',
      password: ''
    })
    let regUserObj = reactive({ // 注册信息
      phone: '',
      password: '',
      nickname: '',
      userName: '',
      email: '',
      age: 18,
      gender: 1,
      address: '',
      status: 0,
    })
    
    // 方法
    /**
     * 登陆
     */
    async function clickLogin() {
      let loginObj = toRaw(emitFormObj)
      if (empty(loginObj)) return ElMessage({
        message: '账号或密码为空！',
        type: 'warning',
      })
      try {
        const res = await login(loginObj)
        if (res.data.state > 1) {
          console.log(res);
          return ElMessage({
            message: '登陆出错！',
            type: 'warning',
          })
        }
        store.commit('userData', res.data.result[0])
        localStorage.setItem("token", res.data.tokenStr)
        
        // console.log('userData', res.data.result[0]);
        // provide('userData', res.data.result[0])
        router.push({
          path: '/home/plan',
        })
        
        ElMessage({
          message: '登陆成功！',
          type: 'success',
        })
      } catch (error) {
        console.log('登陆出错', error);
        ElMessage.error('登陆出错,请重试！')
      }
      
    }
    /**
     * 用户注册
     */
    async function clickRegUser() {
      let userObj = toRaw(regUserObj)
      // 判空
      if (empty(userObj)) return ElMessage({
        message: '请将信息填写完整！',
        type: 'warning',
      })
      try {
        const res = await regUser(userObj)
        console.log('res:', res);
        if (res.data.state === 3) {
          return ElMessage({
            message: '该手机号已被注册！',
            type: 'warning',
          })
        }
        dialogFormVisible.value = false
        ElMessage({
          message: '注册成功！',
          type: 'success',
        })
      } catch (error) {
        console.log('用户注册', error);
        ElMessage.error('用户注册出错,请重试！')
      }
      

    }
    /**
     * 地区选择
     */
    function handleChange(data) {
      let resData = toRaw(data)
      let test = codeToText[resData[0]]
      console.log('resData', test, data);
      
      regUserObj.address = `${resData[0]}-${resData[1]}-${resData[2]}`
    }


    return{
    // 变量
      // 非对象
        dialogFormVisible,
        formLabelWidth,
        location,
      // 对象
        regionData,
        emitFormObj,
        regUserObj,
    // 方法
      clickRegUser,
      handleChange,
      clickLogin,
    }
  }
}

</script>

<style scoped>
.login-container {
  width: 700px;
  height: 500px;
  margin: 100px auto;
  border: 1px solid #c0c0c0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
}
.login-input-container {
  width: 300px;
  vertical-align: middle;
}
.login-row-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  vertical-align: middle;
}
.reguser-button{
  margin-top: 10px;
  text-align: right;
  position: absolute;
  right: 180px;
  color: #c0c0c0;
  cursor: pointer;
}
.form-input-container {
  width: 330px;
}
::v-deep .cascader-container .el-input--suffix {
  
  width: 330px !important;
}
</style>
