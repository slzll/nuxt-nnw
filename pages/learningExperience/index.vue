<template>
  <div class="learning_experience_page">
    <PageHeader/>
    <div class="learning_experience_page_container">
      <div class="container_24">
        <PageNav current="学习心得" :logo="require('~/assets/images/learning_experience_logo.png')" :show-divide="true"/>
        <div class="news_list_container">
          <NewsList :news-list="newsList" :img-src="imgSrc"/>
          <Page :current="page" :page-size="pageSize" :total="total" @on-change="getList" show-total show-elevator/>
          <Spin fix v-if="showSpin"/>
        </div>
      </div>
    </div>
    <PageFooter/>
  </div>
</template>

<script>
  import { PageHeader, PageFooter, NewsList, PageNav } from '~/components'
  import { ALLAPI, ArticleList } from '~/service/api'
  import { userInfo } from '~/service/mixin'

  export default {
    name: 'Index',
    head () {
      return {
        title: '学习心得'
      }
    },
    components: { PageNav, NewsList, PageHeader, PageFooter },
    mixins: [userInfo],
    data () {
      return {
        activeCode: '',
        paginationConf: {}
      }
    },
    async asyncData ({ app, isDev }) {
      let prefix = !isDev && process.server ? 'http://localhost' : ''
      let pageSize = 5
      try {
        const articleParams = { page: 1, rows: pageSize, sort: 'sort', order: 'desc' }

        let res = await app.$axios.$post(prefix + ALLAPI.ArticleList,
          { ...articleParams, CategoryCode: '学习心得' })
        let newsList = res.Data.ListData
        let total = res.Data.Count
        let page = 1
        let imgSrc = res.Data.Path
        let showSpin = false
        return {
          newsList,
          pageSize,
          total,
          page,
          imgSrc,
          showSpin
        }
      } catch (e) {
        console.log('请求出错啦')
      }
    },
    methods: {
      async getList (page) {
        this.showSpin = true
        let res = await ArticleList({
          rows: this.pageSize,
          categoryCode: '学习心得',
          page
        })
        this.showSpin = false
        if (res.Data) {
          this.newsList = res.Data.ListData
          this.total = res.Data.Count
          this.page = page
        }
      }
    }
  }
</script>

<style lang="less">
  @import "~assets/styles/mixins";

  .learning_experience_page {
    .learning_experience_page_container {
      margin-top: 40px;
      background: url("~assets/images/teaching_plan_bg.png") no-repeat bottom -240px center;
      padding-bottom: 324px;

      .news_list_container {
        position: relative;
      }
    }
  }
</style>
