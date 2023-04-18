<template>
  <div class="home-container">
    <Aside :isCollapse="isCollapse"></Aside>
    <Main></Main>
  </div>
</template>

<script>
import Aside from './Aside/index'
import Main from './Main/index'
export default {
  props: {

  },
  components: {
    Aside,
    Main
  },
  data () {
    return {
      isCollapse: true
    }
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.home-container {
  display: flex;
  height: 100%;
}
</style>
