<template>
  <div>
    <!-- 组织架构 -->
    <el-card class="tree-card">
      <TreeTools :treeNode="company" :isRoot="true" @addDepts="addDepts"></TreeTools>
        <el-tree :data="departs" :props="defaultProps" default-expand-all >
          <TreeTools slot-scope="{data}" :treeNode="data" @delDepts=" getDepartments" @addDepts="addDepts" @editDepts="editDepts"></TreeTools>
        </el-tree>
    </el-card>
    <AddDept ref="addDept" :showDialog.sync="showDialog" :treeNode="node" @addDepts='getDepartments'></AddDept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments.js'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept'
export default {
  props: {

  },
  components: {
    TreeTools,
    AddDept
  },
  data () {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: 'name'
      },
      showDialog: false,
      node: null
    }
  },
  computed: {

  },
  watch: {

  },
  created () {
    this.getDepartments()
  },
  methods: {
    async getDepartments () {
      const result = await getDepartments()
      // console.log(result)
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(result.depts, '')
    },
    addDepts (val) {
      this.showDialog = true
      this.node = val
    },
    editDepts (val) {
      this.showDialog = true
      this.node = val
      this.$refs.addDept.getDepartDetail(val.id)
    }
  }
}
</script>

<style scoped lang="less">
.tree-card {
  padding:30px 100px;
  font-size: 14px;
}
</style>
