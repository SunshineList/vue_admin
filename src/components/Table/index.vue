<template>
<div>
  <div class="filter-container">
      <slot>
        <!-- 搜索 -->
        <el-input v-model="listQuery.title" placeholder="搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      </slot>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
    <slot></slot>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
</div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: "Table",
  components: { Pagination },
  data(){
    return {
      listLoading: true,
      tableKey: 0,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
    }
  },

  methods : {
    handleFilter(){

    }
  }
}
</script>

<style scoped>

</style>
