<template>
  <div>
    <el-card>
        <el-tabs>
            <el-tab-pane label="登录账户设置">
                <el-form :model="userInfo" :rules="rules" ref="form" label-width="120px" style="margin-top:30px;margin-left:120px">
                  <el-form-item label="用户名" prop="username">
                      <el-input v-model="userInfo.username" style="width:300px"></el-input>
                  </el-form-item >
                  <el-form-item label="密码" prop="password2">
                      <el-input v-model="userInfo.password2" style="width:300px" type="password"></el-input>
                  </el-form-item >

                <el-form-item>
                        <el-button type="primary" @click="saveUser">保存</el-button>
                </el-form-item>
                    </el-form>
            </el-tab-pane>
            <el-tab-pane label="个人详情">
                  <el-row type="flex" justify="end">
                      <el-tooltip content="打印个人基本信息">
                          <router-link :to="`/employees/print/${userId}?type=personal`">
                            <i class="el-icon-printer" />
                          </router-link>
                      </el-tooltip>
                    </el-row>
              <component :is="userComponent"></component>
            </el-tab-pane>
            <el-tab-pane label="岗位信息">
               <el-row type="flex" justify="end">
                            <el-tooltip content="打印岗位信息">
                              <router-link :to="`/employees/print/${userId}?type=job`">
                                <i class="el-icon-printer"  />
                              </router-link>
                            </el-tooltip>
                  </el-row>
              <component :is="JobComponent"></component>
            </el-tab-pane>
        </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { saveUserDetailById } from '../../api/employees'
import userInfo from '../../views/employees/components/user-info'
import JobInfo from '../../views/employees/components/job-info'
export default {
  props: {

  },
  components: {
    userInfo,
    JobInfo
  },
  data () {
    return {
      userId: this.$route.params.id,
      userInfo: {
        username: '',
        password2: ''
      },
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password2: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
      },
      userComponent: userInfo,
      JobComponent: JobInfo
    }
  },
  computed: {

  },
  watch: {

  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      this.userInfo = await getUserInfo(this.userId)
      console.log(this.userInfo)
    },
    saveUser () {
      this.$refs.form.validate().then(async () => {
        await saveUserDetailById({ ...this.userInfo, password: this.userInfo.password2 })
        this.$message.success('成功')
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
