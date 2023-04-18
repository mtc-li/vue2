<template>
   <el-row type="flex" justify="space-between" align="middle"  style="width:100%;height: 40px">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 -->
          <el-dropdown  @command="handleCommand">
            <!-- 下拉菜单内容 -->
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add" >添加子部门</el-dropdown-item>
              <el-dropdown-item  v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item  v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    treeNode: {
      required: true,
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  components: {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  methods: {
    async handleCommand (type) {
      if (type === 'add') {
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        this.$emit('editDepts', this.treeNode)
        console.log(this.treeNode)
      } else {
        // console.log(this.treeNode.id)
        await delDepartments(this.treeNode.id)
        this.$emit('delDepts')
        this.$message.success('删除成功')
      }
    }

  }
}
</script>

<style scoped lang="less">
/deep/.abc {
  background-color: pink !important;
}
.abcd {
  width: 100%;
  justify-content: space-between !important;
  background-color: pink;
}
</style>
