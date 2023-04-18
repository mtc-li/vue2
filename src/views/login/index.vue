<template>
  <div class="login-container">
    <el-form :model="form" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
       <el-form-item>
          <img src="../../assets/common/login-logo.png" alt="">
      </el-form-item>
      <el-form-item  prop="mobile">
        <el-input v-model="form.mobile" prefix-icon="el-icon-user-solid" maxlength='11'></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" prefix-icon="el-icon-platform-eleme" :type="ispassword"  @keyup.enter.native="submitForm"></el-input>
         <div class="abc" @click="abc()">
             <i v-if="isshow" class="iconfont icon-yanjing_xianshi"></i>
            <i v-else class="iconfont icon-biyanjing"></i>
         </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
      </el-form-item>
        <div class="tips">
          <span style="margin-right:20px;">账号：13800000002</span>
          <span> 密码：123456</span>
        </div>
</el-form>
  </div>
</template>

<script>
import { validMobile, validPassword } from '@/utils/validate'
// import { login } from '@/api/user'
import { mapActions } from 'vuex'
export default {
  props: {

  },
  components: {

  },
  data () {
    return {
      form: {
        mobile: '13800000002',
        password: '123456'
      },
      rules: {
        mobile: [
          { validator: validMobile, trigger: 'blur' }
        ],
        password: [{ validator: validPassword, trigger: 'blur' }]
      },
      ispassword: 'password',
      isshow: false
    }
  },
  computed: {

  },
  watch: {

  },
  created () {
    // login(this.form).then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    ...mapActions('user', ['getlogin']),
    submitForm () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          await this.getlogin(this.form)
          this.$router.push('/')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    abc () {
      this.isshow = !this.isshow
      if (this.isshow === true) {
        this.ispassword = 'text'
      } else {
        this.ispassword = 'password'
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  height: 100%;
  width: 100%;
  background-image: url('~@/assets/common/login.jpg');
  background-size: cover;
  padding-top: 300px;
 /deep/ .demo-ruleForm {
    width: 500px;
    margin: 0 auto;
    .el-input__inner{
      border:0;
      padding-left:50px;
      height: 50px;
      color:aqua;
    }
    .el-button {
      width: 500px;
      height: 50px;
    }
  }
 /deep/ .el-input__icon {
   line-height:50px;
    font-size: 20px;
     color: #726262;
  }
  /deep/.el-form-item__error {
    color:#fff;
  }
  img {
    width: 500px;
    height: 50px;
  }
  .tips {
    color:antiquewhite;
  }
  .abc {
    position: absolute;
    top:5px;
    right:10px;
  }
}
</style>
