<template>
<!-- 员工管理 -->
  <div class="employees-container">
        <pageTools :showBefore="true">
              <!-- 左侧内容 -->
              <template v-slot:before>
                  <span>共{{page.total}}条数据</span>
              </template>
              <!-- 右侧内容 -->
              <template v-slot:after>
                  <el-button type="success" size="small" @click="$router.push('/import')">excel导入</el-button>
                  <el-button type="danger" size="small" @click="exportData">excel导出</el-button>
                  <el-button :disabled="!checkPermission('point-user-delete')" type="primary" size="small" @click="showDialog = true">新增员工</el-button>
              </template>
        </pageTools>

        <el-card>

        <el-table border :loading="loading" :data="list">
          <el-table-column type="index" label="序号" sortabl  align="center" />
          <el-table-column  prop="username" label="姓名"  sortable>
            <template slot-scope="{row}">
              <div @click="showa(row.username)">{{row.username}}</div>
            </template>
          </el-table-column>
          <el-table-column  prop="workNumber" label="工号"/>
          <el-table-column prop="formOfEmployment" label="聘用形式" :formatter="aaa" sortable="" />
          <el-table-column  prop="departmentName" label="部门" sortable=""  />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable>
              <template slot-scope="{row}">
                {{row.timeOfEntry |  formatDate }}
              </template>
          </el-table-column>
          <el-table-column prop="enableState" label="账户状态" sortable>
              <template v-slot="{row}">
                  <el-switch
                      :value="row.enableState === 1 ? true : false"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                    </el-switch>
                     <!-- <el-switch :value="row.enableState === 1" /> -->
              </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{row}">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="editRole(row.id)">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination :current-page="page.page" :total="page.total" :page-size="page.size" layout="prev, pager, next"  @current-change="handleCurrentChange" />
        </el-row>
      </el-card>

      <!-- sync ，不用子传父，更改此属性 -->
      <AddDialog :showDialog.sync="showDialog"></AddDialog>
      <el-dialog title="二维码" :visible.sync="showCodeDialog">
        <el-row type="flex" justify="center">
          <canvas ref="myCanvas"></canvas>
        </el-row>
      </el-dialog>

      <AssignRole ref="assignRole" :showRoleDialog.sync="showRoleDialog" :userId="userId"></AssignRole>
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '../../api/employees'
import EmployeesEnum from '../../api/constant/employees' // 表格内容的格式化文件
import AddDialog from './components/addDialog'
import { formatDate } from '@/filters'
import QrCode from 'qrcode'
import AssignRole from './components/assign-role'
export default {
  props: {

  },
  components: {
    AddDialog,
    AssignRole
  },
  data () {
    return {
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      loading: false,
      showDialog: false,
      showCodeDialog: false,
      showRoleDialog: false,
      userId: ''
    }
  },
  computed: {

  },
  watch: {

  },
  created () {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList () {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      console.log(this.list)

      this.loading = false
    },
    handleCurrentChange (val) {
      this.page.page = val
      this.getEmployeeList()
    },
    aaa (row, column, cellValue, index) { // 格式化  聘用形式  的方法
      const obj = EmployeesEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async delEmployee (id) {
      try {
        await this.$confirm('确定删除该员工吗？')
        await delEmployee(id)
        this.$message.success('删除成功')
        this.getEmployeeList()
      } catch (error) {
        this.$message.info('取消')
      }
    },

    // 导出EXCEL
    exportData () {
      const headers = {
        姓名: 'username',
        手机号: 'mobile',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployeeList({ page: 1, size: this.page.total })
        const data = this.formatJson(headers, rows) // 返回的data就是 要导出的结构
        // rows是所有的员工列表数据
        // [{ username: '张三', mobile: 123 }]  => [[ '张三', 123 ]]

        // excel导出的默认对象
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工资料表'
        })
      })
    },
    // 改变项目表格里面的内容，比如时间，英文key换成中文，还有什么1..2换成汉字等
    formatJson (headers, rows) {
      return rows.map(item => {
        // item是一个对象  { mobile: 132111,username: '张三'  }
        // ["手机号", "姓名", "入职日期" 。。]
        return Object.keys(headers).map(key => {
          // 需要判断 字段
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            // 格式化日期
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            const obj = EmployeesEnum.hireType.find(obj => obj.id === item[headers[key]])
            return obj ? obj.value : '未知'
          }
          return item[headers[key]]
        })
      })
    },
    showa (val) {
      this.showCodeDialog = true
      if (val) {
        this.$nextTick(() => {
          QrCode.toCanvas(this.$refs.myCanvas, val)
        })
      } else {
        this.$message.warning('该用户还未上传头像')
      }
    },
    async editRole (id) {
      this.userId = id
      await this.$refs.assignRole.getUserId(id)
      this.showRoleDialog = true
    }
  }
}
</script>

<style scoped lang="less">

</style>
