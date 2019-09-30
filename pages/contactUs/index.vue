<template>
  <div class="contact_us_page">
    <PageHeader/>
    <div class="contact_us_page_container">
      <div class="container_24" style="line-height: 1.8;font-size: 16px;">
        <h2 style="font-size: 20px;padding: 20px 0;">联系我们</h2>
        <p>培训预约</p>
        <p>叶老师：18691195899</p>
        <p>王老师：18609295899</p>
        <p>学院地址：陕西省延安市宝塔区南泥湾开发区</p>
      </div>
    </div>
    <PageFooter/>
  </div>
</template>

<script>
  import { PageFooter, PageHeader } from '~/components'
  import { userInfo } from '~/service/mixin'

  export default {
    name: 'index',
    head: {
      title: '培训预约'
    },
    components: { PageFooter, PageHeader },
    mixins: [userInfo]
  }
</script>

<style lang="less">
  @import "~assets/styles/mixins";

  .contact_us_page {
    .contact_us_page_container {
      margin-top: 40px;
      background: url("~assets/images/teaching_plan_bg.png") no-repeat bottom -240px center;
      padding-bottom: 324px;
    }
  }
</style>
