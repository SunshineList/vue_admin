<template>
  <div class="account-container">

    <!--    <el-card>-->
    <!--      <el-form style="display: flex; justify-content: space-between">-->
    <!--        <el-form-item prop="is_active" label="搜索">-->
    <!--          <el-input-->
    <!--            clearable-->
    <!--            placeholder="编号/账号/姓名/手机号/身份证号"-->
    <!--            style="width:300px"-->
    <!--          />-->
    <!--        </el-form-item>-->

    <!--        <el-form-item prop="is_active" label="是否生效">-->
    <!--          <el-select clearable>-->
    <!--            <el-option :value="true" label="启用"/>-->
    <!--            <el-option :value="false" label="冻结"/>-->
    <!--          </el-select>-->
    <!--        </el-form-item>-->

    <!--        <el-form-item prop="is_active" label="创建时间">-->
    <!--          <el-date-picker-->
    <!--            type="daterange"-->
    <!--            start-placeholder="开始日期"-->
    <!--            end-placeholder="结束日期"-->
    <!--            clearable-->
    <!--            value-format="yyyy-MM-dd"-->
    <!--          />-->
    <!--        </el-form-item>-->

    <!--        <el-button type="primary">-->
    <!--          <span>查询</span>-->
    <!--        </el-button>-->

    <!--      </el-form>-->
    <!--    </el-card>-->

    <el-table
      :data="tableData"
      border
      style="width: 100%; margin-top: 10px"
    >

      <el-table-column
        prop="id"
        label="用户编号"
        width="180"
      />

      <el-table-column
        prop="username"
        label="账号"
        width="180"
      />

      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      />

      <el-table-column
        label="头像"
        width="180"
      >
        <template #default="scope">
          <el-avatar :src="scope.row.avatar" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>

      <el-table-column
        prop="mobile"
        label="手机号"
        width="180"
      />

      <el-table-column
        prop="email"
        label="邮箱"
      />

      <el-table-column
        prop="gender"
        label="性别"
        :formatter="formatterGender"
      >
        <template #default="scope">
          <el-tag
            type="success"
            disable-transitions
          >{{ formatterGender(scope.row.gender) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="get_user_type_display"
        label="用户类型"
      >
        <template #default="scope">
          <el-tag
            type="success"
            disable-transitions
          >{{ scope.row.get_user_type_display }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="is_active"
        label="状态"
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.is_active === '1' ? 'primary' : 'error'"
            disable-transitions
          >{{ formatterActive(scope.row.is_active) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="mini"
            type="primary"
            @click="errorMessageTip"
          >查看</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="errorMessageTip"
          >编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>

</template>

<script>
import { formatGender, formatActive } from '@/views/user/js/filters'
import { getAccountList } from '@/api/account'

export default {
  data() {
    return {
      tableData: []
    }
  },

  created() {
    this.getAccount()
  },
  methods: {
    formatterGender(value) {
      return formatGender(value)
    },
    formatterActive(value) {
      return formatActive(value)
    },

    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },

    // 获取用户数据
    async getAccount() {
      getAccountList().then((response) => {
        this.tableData = response.results
      })
    },

    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },

    errorMessageTip() {
      this.$alert('功能正在开发中.....', '开发中.......', {
        confirmButtonText: '确定'
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.account-container {
  margin: 30px;
  background-color: #f0f2f5;
}

</style>
