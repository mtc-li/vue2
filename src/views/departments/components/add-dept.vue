<template>
    <el-dialog
      :title="showTitle"
      :visible="showDialog"
      @close="btncancel"
      width="50%">
      <el-form label-width="120px" :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="部门名称" prop="name">
            <el-input style="width:80%" v-model="form.name">

            </el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
            <el-input style="width:80%" v-model="form.code">

            </el-input>
          </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
             <el-select  @focus ="get" style="width:80%" v-model="form.manager">
                <el-option
                  v-for="item in peoples"
                  :key="item.id"
                  :label="item.username"
                  :value="item.username">
                </el-option>
              </el-select>

          </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
            <el-input style="width:80%" type="textarea" :rows="3" v-model="form.introduce">

            </el-input>
          </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6" >
          <el-button size="small" @click="btncancel">取消</el-button>
          <el-button  size="small" type="primary" @click="submitForm">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
</template>

<script>
import { getDepartments, addDepartments, getDepartDetail } from '@/api/departments'
import { getEmployeeSimple } from '../../../api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  components: {

  },
  data () {
    const aaa = async (rule, value, callback) => {
      const { depts } = await getDepartments()
      // 1.找到同级所有部门  2. 在同级部门下，有没有相同的名字，
      const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      // 如果为true,表示已有相同的名字，验证不通过
      isRepeat ? callback(new Error(`同级部门已有${value}`)) : callback()
      // console.log(isRepeat)
    }
    const bbb = async (rule, value, callback) => {
      const { depts } = await getDepartments()
      const isRepeat = depts.some(item => item.code === value)
      // 如果为true,表示已有相同的名字，验证不通过
      isRepeat ? callback(new Error(`已有${value}`)) : callback()
    }
    return {
      form: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [{ required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 3 到 18 个字符', trigger: 'blur' },
          { validator: aaa }
        ],
        code: [{ required: true, message: '请输入部门编码', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 3 到 18 个字符', trigger: 'blur' },
          { validator: bbb, trigger: 'blur' }
        ],
        manager: [{ required: true, message: '请输入部门负责人', trigger: 'blur' }, { min: 1, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍', trigger: 'blur' }, { min: 1, max: 10, message: '长度在 3 到 300 个字符', trigger: 'blur' }]
      },
      peoples: []

    }
  },
  computed: {
    showTitle () {
      return this.form.id ? '编辑部门' : '新增部门'
    }
  },
  watch: {
    // treeNode (value) {
    //   this.form = { ...this.treeNode }
    // }
  },
  created () {
  },
  methods: {
    async get () {
      const result = await getEmployeeSimple()
      this.peoples = result
      console.log(this.peoples)
    },
    submitForm () {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          await addDepartments({ ...this.form, pid: this.treeNode.id })
          this.$emit('addDepts')
          // updata: props名称
          // 关闭dialog 的时候会触发el-dialog的close事件，这里就不用清空数据了
          this.$emit('update:showDialog', false)
        }
      })
    },
    btncancel () {
      this.form = {}
      this.$emit('update:showDialog', false)
      this.$refs.ruleForm.resetFields()
    },
    async getDepartDetail (id) {
      this.form = await getDepartDetail(id)
      // console.log(this.form)
    }
  }
}
</script>

<style scoped lang="less">

</style>
