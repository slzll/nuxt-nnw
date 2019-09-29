<template>
  <div class="promotional_film_page">
    <PageHeader/>
    <div class="container_24">
      <div class="text-center mar_top_15">
        <video src="~/assets/images/nnwfg.mp4" controls width="1000" preload="auto"></video>
      </div>
    </div>
    <PageFooter/>
  </div>
</template>

<script>
  import { PageHeader, PageFooter } from '~/components'
  import { userInfo } from '~/service/mixin'

  export default {
    name: 'index',
    head: {
      title: '宣传片'
    },
    components: { PageHeader, PageFooter },
    mixins: [userInfo]
  }
</script>

<style lang="less">
  .promotional_film_page {

  }
</style>
