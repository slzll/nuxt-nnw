<template>
  <div class="not_found_page">
    <PageHeader/>
    <div class="not_found_container">
      <h1 class="text-center">没有该页面</h1>
      <p class="text-center mar_top_20">
        <nuxt-link to="/">返回首页</nuxt-link>
      </p>
    </div>
    <PageFooter/>
  </div>
</template>

<script>
  import { PageHeader, PageFooter } from '~/components'

  export default {
    name: 'error',
    components: { PageHeader, PageFooter }
  }
</script>

<style lang="less">
  .not_found_page {
    .not_found_container {
      margin-top: 40px;
      background: url("~assets/images/teaching_plan_bg.png") no-repeat bottom -240px center;
      padding-bottom: 324px;
    }
  }
</style>
