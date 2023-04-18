<template>
  <div class="main-container">
    <Header></Header>
    <Content></Content>
  </div>
</template>

<script>
import Header from './Header'
import Content from './Content'
export default {
  props: {

  },
  components: {
    Header,
    Content
  },
  data () {
    return {

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
.main-container {
  flex:1;
  height: 100%;
  background-color: skyblue;
}
</style>
