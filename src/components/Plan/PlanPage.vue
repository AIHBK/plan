<template>
  <div class="weather-container">
    <span>{{ obj?.province}}.{{ obj?.city}}</span>
    <div class="weather-data-container" v-for="(item, index) in obj.casts" :key="item.date">
        <div style="display: inline-block; position: relative; top: -15px; margin-right: 10px;">
          <div v-if="index === 0">今天</div>
          <div v-else-if="index === 1">明天</div>
          <div v-else-if="index === 2">后天</div>
          <div v-else>大后天</div>
        </div>

        <el-tooltip
          class="box-item"
          effect="dark"
          :content="'白天：'+item.dayweather + ' - ' + item.daywind + item.nightpower + '   ' + '夜晚：'+item.nightweather + ' - ' + item.nightwind + item.nightpower "
          placement="top-start"
        >
          <div style="width: 100px; display: inline-block;">
            <div class="iconfont-container">
              <span v-if="item.dayweather === '多云'" class="iconfont iconfont-item-container icon-tianqi-duoyun"/>
              <span v-else-if="item.dayweather === '晴'" class="iconfont iconfont-item-container icon-tianqi-qingtian"/>
              <span v-else-if="item.dayweather === '阴'" class="iconfont iconfont-item-container icon-tianqi-yintian"/>
              <span v-else-if="item.dayweather === '小雨'" class="iconfont iconfont-item-container icon-tianqi-xiaoyu"/>
              <span v-else-if="item.dayweather === '中雨'" class="iconfont iconfont-item-container icon-tianqi-zhongyu"/>
              <span v-else-if="item.dayweather === '大雨'" class="iconfont iconfont-item-container icon-tianqi-dayu"/>
              <span v-else-if="item.dayweather === '阵雨'" class="iconfont iconfont-item-container icon-tianqi-zhenyu"/>
              <span v-else class="iconfont iconfont-item-container icon-tianqi-yangsha"/>
            </div>
            <span style="position: relative; top: -15px;">{{ item.nighttemp}}℃ ~ {{ item.daytemp }}℃</span>
          </div>
        </el-tooltip>
        

    </div>
  </div>
  <div class="plan-container">
    <el-calendar ref="calendar" v-model="dateValue">  
      <template #header="{ date }">      
        <span>我的计划</span>
        <span>{{ date }}</span>
        <el-button-group>
          <el-button size="small" @click="selectDate('prev-year')">上一年</el-button>
          <el-button size="small" @click="selectDate('prev-month')">上一月</el-button>
          <el-button size="small" @click="selectDate('today')">今天</el-button>
          <el-button size="small" @click="selectDate('next-month')">下一月</el-button>
          <el-button size="small" @click="selectDate('next-year')">下一年</el-button>
        </el-button-group>
      </template>
      <template #date-cell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }}
          <!-- {{ data.isSelected ? '✔️' : '' }} -->
        </p>
        <div v-for="(item, index) in obj.planList" :key="index">
          <div v-if="item.planStartTime === data.day" style="position: relative;">
            <span style="font-size: 13px; color: #ff6700; font-weight: 700;">{{ item.title }}</span>
            <i v-if="item.status === -1" class="iconfont-color icon-weiwancheng weiwancheng-container"></i>
            <i v-if="item.status === 0" class="iconfont-color icon-jinhangzhong jinxingzhong-container"></i>
            <i v-if="item.status === 1" class="iconfont-color icon-yiwancheng yiwancheng-container"></i>
          </div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
// import { useRouter } from 'vue-router'
// import { formatDate } from '../../util/index'
import { getWeather } from '@/api/weather'
import { getPlanData } from '@/api/plan'
import { ref, reactive, toRaw } from 'vue'
import { useStore } from 'vuex' // 引入useStore 方法
export default {
  name: 'PlanPage',

   setup() {
    /************************* 变量 ************************/ 
    const calendar = ref() // 日历ref
    const dateValue = ref(new Date()) // 当前选中日期
    let store = useStore() // store
    let userData = toRaw(store.state.userData) // 获取vuex中数据
    let cityCode = `${userData?.address?.split('-')[2]}`

    const obj = reactive({
      planList: [],
    })
    /************************* 接口调用 ************************/
    /**
     * 获取用户计划
     */
    getPlanData(userData.id).then((value) => {
      obj.planList = value.data?.result
      for (const item in obj.planList) {
        obj.planList[item].planStartTime = obj.planList[item].planStartTime.split('T')[0]
      }
    })
    /**
     * 高德获取天气接口
     */
    getWeather(cityCode).then((value) => {
      obj.city = value.data?.forecasts[0].city
      obj.adcode = value.data?.forecasts[0].adcode 
      obj.casts = value.data?.forecasts[0].casts
      obj.province = value.data?.forecasts[0].province
      obj.reporttime = value.data?.forecasts[0].reporttime
    })
    console.log('-----', obj);
    const methods = {

      /**
       * 日期切换
       * @param {*} value 'prev-year'|'prev-month'|'next-month'|'next-year'|'today'
       */
      selectDate(value) {
        calendar.value.selectDate(value)
      }

    }
    return {
      obj,
      dateValue,
      calendar,
      ...methods
    }
  }
}
</script>


<style>
.weather-container {
  width: calc(100% - 30px);
  height: 70px;
  line-height: 70px;
  border-radius: 8px 8px;
  margin-bottom: 15px;
  background: linear-gradient(145deg, #D8E0FF, #CFE5F7);
  padding: 0 15px;
  display: flex;
  justify-content: space-around;
}
.weather-data-container {
  width: 200px;
  height: 100%;
  /* border: 1px solid; */
}
.iconfont-container {
  width: 100%;
  height: 20px;
  font-size: 20px;
  text-align: center;
  position: relative;
}
.iconfont-item-container {
  font-size: 25px;
  position: relative;
  top: -15px;
}
.plan-container {
  /* border: 1px solid; */
  width: 100%;
  height: calc(100vh - 220px);
  overflow-y: scroll;
}
.jinxingzhong-container {
  color: #67C23A;
  font-size: 50px;
  position: absolute;
  right: -10px;
  top: -60px;
}
.weiwancheng-container {
  color: #E6A23C;
  font-size: 50px;
  position: absolute;
  right: -10px;
  top: -60px;
}
.yiwancheng-container {
  color: #F56C6C;
  font-size: 50px;
  position: absolute;
  right: -10px;
  top: -60px;
}
</style>