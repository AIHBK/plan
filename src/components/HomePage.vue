<template>
  <div>
    <el-container>
      <el-header style="border-bottom: 1px solid #e9e9e9;">
        <HeaderPage></HeaderPage>
      </el-header>
      <el-container>
        <el-aside
          class="menu-container"
          width="200px"
        >
          <el-scrollbar>
            <el-menu
              :default-openeds="['1']"
              :router="true"
              default-active="/home/plan"
            >
            <!-- default-active="/home/plan" -->
              <el-sub-menu v-for="item in menuList" :key="item.id" :index="item.id">
                <template #title>
                  <el-icon><message /></el-icon>{{ item.title }}
                </template>
                <el-menu-item-group>
                  <el-menu-item v-for="childItem in item.child" :key="childItem.id" :index="`/${childItem.childPath}`">{{ childItem.title }}</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HeaderPage from '../components/Header/HeaderPage.vue'
import { reactive } from 'vue'
export default {
  name: 'HomePage',
  components: {
    HeaderPage,
  },
  setup() {
    let menuList = reactive([ // 菜单list
      {
        id: '1',
        title: '我的计划',
        path: '',
        child: [
          {
            id: '1-1',
            title: '今日计划',
            childPath: 'home/plan'
          },
          {
            id: '1-2',
            title: '添加计划',
            childPath: 'home/addPlan'
          }
        ]
      },
      {
        id: '2',
        title: '今日计划',
        path: '',
        child: [
          {
            id: '2-1',
            title: '今日计划1',
            childPath: ''
          },
          {
            id: '2-2',
            title: '今日计划2',
            childPath: ''
          }
        ]
      }
    ])
      
    return {
      menuList
    }
  }
}
</script>


<style scoped>
.menu-container .el-menu {
  width: 200px;
  height: calc(100vh - 80px);
}
</style>
