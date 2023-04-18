<template>
  <div class="header-container">
     <span  @click="setiscollapse" class="header-icon">
          <i v-if="isCollapse" class="el-icon-s-unfold"></i>
          <i v-else class="el-icon-s-fold"></i>
        </span>
      <h2>人力资源管理系统</h2>
      <div class="right">
        <LangSelect></LangSelect>
        <ScreenFull></ScreenFull>
         <img src="@/assets/common/bigUserHeader.png" >
        <span class="text">{{name}}</span>
        <el-button type="primary" @click="gologin">退出登录</el-button>
      </div>

  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  props: {

  },
  components: {

  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['isCollapse', 'name'])
  },
  watch: {

  },
  created () {

  },
  methods: {
    ...mapMutations('user', ['setiscollapse']),
    ...mapActions('user', ['logout']),
    gologin () {
      this.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
.header-container {
  height: 56px;
  color:#fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);
  .header-icon {
    i {
      font-size: 30px;
      color:#fff;
    }
  }
  .right {
    display: flex;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      margin-left: 20px;
    }
    .text {
      margin: 0 20px;
      color: #fff;
    }
  }
}
</style>
