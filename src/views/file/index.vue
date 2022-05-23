<template>
  <div class="account-container">
    <Table :list="tableData" :total="count">
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
        <template slot-scope="scope">
<!--          <el-avatar :src="scope.row.url" style="width: 100px; height: 100px"></el-avatar>-->
          <img :src="scope.row.url" class="table-column-icon"/>
        </template>
      </el-table-column>
    </Table>
  </div>

</template>

<script>
import {getFileList} from "@/api/file"
import Table from '@/components/Table'

export default {
  components: {
    Table
  },

  data() {
    return {
      tableData: [],
      count: 0
    }
  },
  methods: {
    async getFileList() {
      getFileList().then((response) => {
        this.tableData = response.results
        this.count = response.count
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

.table-column-icon {
  max-width: 100px;
  max-height: 100px;
}

</style>
