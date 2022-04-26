<template>
  <div class="dashboard-container">
    <div style="padding-bottom: 20px">
      <remote-js src="https://pv.sohu.com/cityjson?ie=utf-8" />
      <el-avatar :src="avatar_url" class="user-avatar" />
      <div class="title">
        <h1>{{ time_text }} 开始您一天的工作吧！ 当前IP地址：{{ ip }}</h1>
        <span>
          <span style="font-size: 18px; color: #2f74ff">{{ city }}</span>
          {{ todayTemp }}</span>
      </div>
    </div>

    <el-card class="box-card">
      <el-row>
        <el-table
          :data="temps"
          style="width: 100%; align-content: center; display: block"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="date" label="日期" width="180" />
          <el-table-column prop="fengli" label="风力" width="180">
            <template #default="scope">
              {{ scope.row.fengli | handleFengli }}
            </template>
          </el-table-column>
          <el-table-column prop="fengxiang" label="风向" />
          <el-table-column prop="high" label="高温" />
          <el-table-column prop="low" label="低温" />
          <el-table-column prop="type" label="天气情况" />
        </el-table>
      </el-row>
    </el-card>

    <el-col :span="12">
      <el-card class="box-card" style="margin-top: 25px">
        <div class="work">
          <svg-icon
            icon-class="work"
            style="
              margin-left: 50%;
              transform: translateX(-50%);
              height: 216px;
              width: auto;
            "
          />
        </div>
      </el-card>
    </el-col>

    <el-col :span="12" style="float: right">
      <el-card class="box-card" style="margin-top: 25px">
        <div class="work">
          <svg-icon
            icon-class="work"
            style="
              margin-left: 50%;
              transform: translateX(-50%);
              height: 216px;
              width: auto;
            "
          />
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import { getWeatherList } from '@/api/file'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name', 'avatar'])
  },

  components: {
    'remote-js': {
      render(createElement) {
        return createElement('script', {
          attrs: { type: 'text/javascript', src: this.src }
        })
      },
      props: {
        src: { type: String, required: true }
      }
    }
  },

  data() {
    return {
      ip: '',
      time_text: '',
      city: '',
      todayTemp: '',
      temps: [],
      avatar_url: this.avatar
        ? this.avatar
        : 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640'
    }
  },

  created() {
    setTimeout(() => {
      this.getCity()
    }, 500)
  },

  methods: {
    getTimeState() {
      const timeNow = new Date()
      const hours = timeNow.getHours()
      let text = ``
      if (hours >= 0 && hours <= 10) {
        text = `早上好`
      } else if (hours > 10 && hours <= 14) {
        text = `中午好`
      } else if (hours > 14 && hours <= 18) {
        text = `下午好`
      } else if (hours > 18 && hours <= 24) {
        text = `晚上好`
      }
      this.time_text = text
    },

    tableRowClassName({ row, rowIndex }) {
      const value = row.high
      const reg = /[1-9][0-9]*/g
      if (value.match(reg) > 28) {
        return 'warning-row'
      }
    },

    getCity() {
      this.ip = returnCitySN['cip']
      this.city = returnCitySN['cname']
      var shi = this.getCityShi(returnCitySN['cname'])
      this.getTemp(shi)
      this.getTimeState()
    },

    getCityShi(city) {
      var reg = /.+?(省|市|自治区|自治州|县|区)/g
      return city.match(reg)[1]
    },

    getTemp(city) {
      getWeatherList(city).then((response) => {
        this.temps = response.data.forecast
        this.todayTemp =
          '今日' +
          this.temps[0].type +
          ' ' +
          this.temps[0].low +
          '~' +
          this.temps[0].high
      })
    }
  }
}
</script>
<script setup>
function handleFengli(value) {
  const reg = /[1-9][0-9]*/g
  return value.match(reg) + '级'
}
</script>

<style lang="scss">
$userAvatarLength: 72px;

.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.user-avatar {
  width: $userAvatarLength;
  height: $userAvatarLength;
  line-height: $userAvatarLength;
  display: inline-block;
}

.title {
  display: inline-block;
  padding: 0 0 0 15px;
  position: relative;
  top: -5px;

  h1 {
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.75rem;
  }

  span {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
