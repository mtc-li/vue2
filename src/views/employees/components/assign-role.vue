<template>
<!-- 非配角色权限 -->
    <el-dialog title="非配角色" :visible="showRoleDialog" @close="btnCancel">
        <el-checkbox-group v-model="roleIds">
          <!-- label: 是用来存储选中AD的 -->
            <el-checkbox :label="item.id" v-for="item in list" :key="item.id">
              {{item.name}}
            </el-checkbox>
          </el-checkbox-group>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
          <el-button  size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserId } from '@/api/user'
import { assignRoles } from '../../../api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      required: true
    }
  },
  components: {

  },
  data () {
    return {
      list: [], // 角色列表数组
      roleIds: [] // 储存用户所有的角色ID
    }
  },
  computed: {

  },
  watch: {

  },
  created () {
    this.getRoleList()
  },
  methods: {
    async getRoleList () {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 })
      this.list = rows
    },
    async getUserId (id) {
      const { roleIds } = await getUserId(id)
      this.roleIds = roleIds
    },
    async btnOk () {
      this.$emit('update:showRoleDialog', false)
      // this.showRoleDialog = false
      await assignRoles({ id: this.userId, roleIds: this.roleIds })
    },
    btnCancel () {
      this.roleIds = [] // 重置数组,还原成一个空对象
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style scoped lang="less">

</style>
