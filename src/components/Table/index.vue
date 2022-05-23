<template>
  <div>
    <div class="filter-container">
      <slot>
        <!-- 搜索 -->
        <el-input v-model="listQuery.title" placeholder="搜索" style="width: 200px;" class="filter-item"
                  @keyup.enter.native="handleFilter"/>
      </slot>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <slot></slot>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList" class="page"/>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: "Table",
  components: {Pagination},

  created() {
    this.closeLoading()
  },
  props:{
    list:{
      type: Array,
      default: () => []
    },
    total:{
      type: Number,
      default() {
        return 100
      }
    },
    listQuery:{
      type: Object,
      default(){
        return {
          page: 1,
          limit: 10,
        }
      }
    },
  },

  data() {
    return {
      listLoading: true
    }
  },

  methods: {
    handleFilter() {

    },

    getList() {
      return []
    },

    closeLoading(){
      if (this.list){
        this.listLoading = false
      }
    }
  }
}
</script>

<style scoped>
  .page{
    display: flex;
    justify-content: center;
  }
</style>
