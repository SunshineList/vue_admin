<template>
  <div class="account-container">
    <el-table
      :data="tableData"
      border
      style="width: 100%">

      <el-table-column
        prop="id"
        label="序号"
        width="auto"
      >
      </el-table-column>

      <el-table-column
        prop="uuid_name"
        label="文件uuid"
        width="auto"
      >
      </el-table-column>

      <el-table-column
        prop="name"
        label="文件名称"
        width="auto">
      </el-table-column>

      <el-table-column
        label="url"
        width="auto">
        <template #default="scope">
          <el-avatar :src="scope.row.url" style="width: 100px; height: 100px"></el-avatar>
        </template>
      </el-table-column>

    </el-table>
  </div>

</template>

<script>
import {getFileList} from "@/api/file"
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {

    async getFileList() {
      getFileList().then((response) => {
        this.tableData = response.results
      })
    },


  },

  created() {
    this.getFileList()
  }
}
</script>

<style lang="scss" scoped>
.account-container {
  margin: 30px;
  background-color: #f0f2f5;
}

</style>
