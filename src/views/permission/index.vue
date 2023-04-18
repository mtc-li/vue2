<template>
  <div>
<!-- 权限管理 -->
  <pageTools>
      <el-button slot="after" type="primary" size="small" @click="addPermission(1,'0')">添加权限</el-button>
  </pageTools>
  <el-table border :data="list" row-key="id">
      <el-table-column label="名称"  prop="name"></el-table-column>
      <el-table-column label="标识" align="center" prop="code"></el-table-column>
      <el-table-column label="描述" align="center" prop="description"></el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="{row}">
            <el-button v-if="row.type ===1" type="text" @click="addPermission(2,row.id)">添加</el-button>
            <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
        </template>
      </el-table-column>
  </el-table>

  <el-dialog :visible="showDialog" :title="showText" @close="btnCancel">
      <el-form label-width="120px" :model="formData" :rules="rules" ref="permForm">
          <el-form-item label="名称" prop="name">
            <el-input style="width:90%" v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="标识" prop="code">
            <el-input style="width:90%" v-model="formData.code"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input style="width:90%" v-model="formData.description"></el-input>
          </el-form-item>
          <el-form-item label="开起">
              <el-switch v-model="formData.enVisible"
              inactive-value="0"
              active-value="1"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
          </el-form-item>
      </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
              <el-button type="primary" size="small" @click="btnOk">确定</el-button>
              <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
  </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, delPermission, addPermission, updatePermission, getPermissionDetail } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
export default {
  props: {

  },
  components: {

  },
  data () {
    return {
      list: [],
      showDialog: false,
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    showText () {
      return this.formData.id ? '编辑权限' : '新增权限'
    }
  },
  watch: {

  },
  created () {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList () {
      this.list = tranListToTreeData(await getPermissionList(), '0')
      console.log(this.list)
    },
    delPermission (id) {
      this.$confirm('确认删除该权限点吗').then(() => {
        return delPermission(id)
      }).then(() => {
        this.$message.success('删除成功')
      })
    },
    addPermission (type, pid) {
      // 访问权 type =1 ,按钮操作权type=2
      this.formData.type = type
      this.formData.pid = pid
      this.showDialog = true
    },
    btnOk () {
      this.$refs.permForm.validate().then(() => {
        if (this.formData.id) {
          return updatePermission(this.formData)
        }
        return addPermission(this.formData)
      }).then(() => {
        this.$message.success('操作成功')
        this.getPermissionList()
        this.showDialog = false
      })
    },
    btnCancel () {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      this.$refs.permForm.resetFields()
      this.showDialog = false
    },
    async editPermission (id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    }

  }
}
</script>

<style scoped lang="less">

</style>
