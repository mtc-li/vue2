<template>
<!-- 公司设置 -->
  <div class="setting-container">
    <el-card>
       <el-tabs @tab-click="handleClick">
          <el-tab-pane label="角色管理" name="first">
            <el-row style="height:60px">
                <el-button type="primary" icon="el-icon-plus" @click="showDialog = true">添加</el-button>
            </el-row>
              <el-table :data="list" style="width: 100%" border>
                  <el-table-column type="index" label="序号" width="120" align="center"></el-table-column>
                  <el-table-column prop="name" label="名称" width="240"  align="center"></el-table-column>
                  <el-table-column prop="description" label="描述"  align="center"></el-table-column>
                  <el-table-column  label="操作"  align="center">
                    <template slot-scope="{row}">
                        <el-button size='small' type="success" @click="assignPerm(row.id)">分配权限</el-button>
                        <el-button size='small' type="success" @click="editRole(row.id)">编辑</el-button>
                        <el-button size='small' type="success" @click="deleteRole(row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="page.page"
                      :page-sizes="[1, 2, 3]"
                      :page-size="page.pagesize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="page.total">
                    </el-pagination>
          </el-tab-pane>

          <el-tab-pane label="公司信息" name="second" >
              <el-alert title="消息提示的文案" type="info" :closable="false" show-icon></el-alert>
                <el-form  label-width="120px" style="margin-top:50px">
                  <el-form-item label="企业名称" prop="">
                    <el-input v-model="formData.name" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="公司地址" prop="">
                    <el-input  v-model="formData.companyAddress" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="电话" prop="">
                    <el-input   v-model="formData.companyPhone" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="">
                    <el-input v-model="formData.mailbox" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="备注" prop="">
                    <el-input type="textarea"   v-model="formData.remarks"  :rows="3" disabled></el-input>
                  </el-form-item>
                </el-form>
          </el-tab-pane>
        </el-tabs>
    </el-card>

    <el-dialog title="编辑部门" :visible="showDialog" @close="btnCancel">
      <el-form label-width="120px" :model="roleForm" :rules="rules" ref="roleForm">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色名称">
            <el-input v-model="roleForm.description"></el-input>
          </el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="8">
              <el-button size="small" @click="btnCancel">取消</el-button>
              <el-button type="primary" size="small" @click="btnOk">确定</el-button>
            </el-col>
          </el-row>
      </el-form>
    </el-dialog>

    <el-dialog title="非配权限" :visible="showPermDialog" @close="btnPermCancel">
      <el-tree :data="permData" :props="defaultProps" :default-expand-all="true" show-checkbox
        :check-strictly="true" node-key="id" :default-checked-keys="selectCheck" ref="permTree">

      </el-tree>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :sapn="6">
              <el-button type="primary" size="small" @click="btnPermOk">确定</el-button>
              <el-button type="primary" size="small" @click="btnPermCancel">取消</el-button>
          </el-col>
        </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole, getRoleDetail, updateRole, addRole, assignPerm } from '@/api/setting'
import { mapGetters } from 'vuex'
import { getPermissionList } from '../../api/permission'
import { tranListToTreeData } from '@/utils'
export default {
  props: {

  },
  components: {

  },
  data () {
    return {
      list: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      formData: {},
      showDialog: false,
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      showPermDialog: false,
      permData: [],
      defaultProps: {
        label: 'name'
      },
      roleId: null,
      selectCheck: [] // 默认勾选节点KEY的数组
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  watch: {

  },
  created () {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    handleClick () {

    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.page.pagesize = val
      this.getRoleList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page.page = val
      this.getRoleList()
    },
    async getRoleList () {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    async getCompanyInfo () {
      this.formData = await getCompanyInfo(this.companyId)
      console.log(this.formData)
    },
    async deleteRole (id) {
      try {
        await this.$confirm('确认删除该角色吗')
        await deleteRole(id)
        this.getRoleList()
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
        this.$message.info('删除失败')
      }
    },
    async editRole (id) {
      this.roleForm = await getRoleDetail(id)
      this.showDialog = true
    },
    btnCancel () {
      this.roleForm = {
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    async btnOk () {
      try {
        await this.$refs.roleForm.validate()
        if (this.roleForm.id) {
          await updateRole(this.roleForm)
        } else {
          await addRole(this.roleForm)
        }
        this.getRoleList()
        this.$message.scurress('编辑成功')
      } catch (err) {
        this.$message.info('编辑失败')
      }
      this.showDialog = false
    },
    async assignPerm (id) {
      this.permData = tranListToTreeData(await getPermissionList(), '0')
      this.roleId = id
      const { permIds } = await getRoleDetail(id)
      // console.log(await getRoleDetail(id))
      this.selectCheck = permIds // 将当前角色所拥有的权限ID赋值，给到对应的数组上，回显
      this.showPermDialog = true
    },
    async btnPermOk () {
      // console.log(this.$refs.permTree.getCheckedKeys())
      this.showPermDialog = false
      await assignPerm({ permIds: this.$refs.permTree.getCheckedKeys(), id: this.roleId })
      this.$message.success('成功')
    },
    btnPermCancel () {
      this.selectCheck = []
      this.showPermDialog = false
    }

  }
}
</script>

<style scoped lang="less">

</style>
