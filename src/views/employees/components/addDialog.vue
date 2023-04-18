<template>
    <el-dialog title="新增员工" :visible="showDialog" width="30%" center @close="btnCancel">

        <el-form ref="addEmployee" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formData.mobile"  placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry"  placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
           <el-select  v-model="formData.formOfEmployment" placeholder="请选择" >
              <el-option
                v-for="item in  EmployeesEnum.hireType"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
  </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber"  placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName"  placeholder="请选择部门" @focus="getDepartments"  />
        <el-tree @node-click="selectNode" v-loading="loading" v-if="showTree" :data="treeData" :props="{label:'name'}" default-expand-all></el-tree>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime"  placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="btnCancel">取 消</el-button>
        <el-button type="primary" @click="btnOk">确 定</el-button>
      </span>
</el-dialog>
</template>

<script>
import { getDepartments } from '../../../api/departments.js'
import { tranListToTreeData } from '@/utils'
import EmployeesEnum from '@/api/constant/employees' // 表格内容的格式化文件
import { addEmployee } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  components: {

  },
  data () {
    return {
      EmployeesEnum,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }, {
          min: 1, max: 5, message: '姓名为1-5位'
        }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }],
        formOfEmployment: [{ required: true, message: '请选择聘用形式', trigger: 'change' }],
        workNumber: [{ required: true, message: '请输入工号', trigger: 'blur' }],
        departmentName: [{ required: true, message: '请选择部门', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '请选择入职时间', trigger: 'blur' }]
      },
      treeData: [], // 树的数据
      showTree: false,
      loading: false
    }
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  methods: {
    async getDepartments () {
      this.showTree = true
      this.loading = true
      const { depts } = await getDepartments()
      this.treeData = tranListToTreeData(depts, '')
      this.loading = false
    },
    selectNode (node) {
      this.formData.departmentName = node.name
      this.showTree = false
    },
    async btnOk () {
      try {
        await this.$refs.addEmployee.validate()
        await addEmployee(this.formData)
        this.$parent.getEmployeeList && this.$parent.getEmployeeList()
        this.$parent.showDialog = false
        this.$message.success('111')
      } catch (err) {
        console.log(err)
      }
    },
    btnCancel () {
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.addEmployee.resetFields()
      // this.$parent.showDialog = false
      // update: props 名称 这么写的话可以在父组件直接用sync修饰符处理
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style scoped lang="less">

</style>
