<template>
  <div class="loading-page" v-if="loading">
    <Spin fix>
      <Icon type="ios-loading" size="34" class="demo-spin-icon-load"></Icon>
      <div>loading...</div>
    </Spin>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loading: false
      }
    },
    methods: {
      start () {
        this.loading = true
      },
      finish () {
        this.loading = false
      }
    }
  }
</script>
<style lang="less" scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
    z-index: 10000;

    .demo-spin-icon-load {
      animation: ani-demo-spin 1s linear infinite;
    }

    @keyframes ani-demo-spin {
      from {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .demo-spin-col {
      height: 100px;
      position: relative;
      border: 1px solid #eee;
    }
  }
</style>
