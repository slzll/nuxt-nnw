<template>
  <div class="news_center_page">
    <PageHeader/>
    <div class="news_center_page_container">
      <div class="container_24">
        <PageNav current="新闻中心" :logo="require('~/assets/images/news_center_logo.png')" :show-divide="true"/>
        <div class="news_center_nav">
          <a class="news_center_nav_tab"
             v-for="item in newsCategory"
             :key="item.Code"
             :class="{active: activeCode === item.Code}"
             @click="activeCode = item.Code">
            {{item.Name}}
          </a>
        </div>
        <div class="news_list_container">
          <template v-for="data in newsData">
            <NewsList :key="data.Code" :news-list="data.newsList" :img-src="data.imgSrc"
                      v-show="activeCode === data.Code"/>
            <Page v-show="activeCode === data.Code" :key="data.Code+'page'" :current="data.page"
                  :page-size="pageSize" :total="data.total" @on-change="getList" show-total show-elevator/>
            <Spin :key="data.Code+'spin'" fix v-if="data.showSpin"/>
          </template>
        </div>
      </div>
    </div>
    <PageFooter/>
  </div>
</template>

<script>
  import { NewsList, PageFooter, PageHeader, PageNav } from '~/components'
  import { ALLAPI, ArticleList } from '~/service/api'
  import { userInfo } from '~/service/mixin'

  export default {
    name: 'Index',
    head () {
      return {
        title: this.activeCode || '新闻中心'
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
    watch: {
      '$route' (newVal, oldVal) {
        if (newVal.name === oldVal.name) {
          let code = newVal.query.categoryCode
          let codes = Object.keys(this.newsData)
          this.activeCode = codes.includes(code) ? code : codes[0]
        }
      }
    },
    async asyncData ({ app, isDev }) {
      let prefix = !isDev && process.server ? 'http://localhost' : ''
      const newsCategory = [
        { Code: '新闻资讯', Name: '新闻资讯' },
        { Code: '培训动态', Name: '培训动态' },
        { Code: '学院公告', Name: '学院公告' },
        { Code: '培训公告', Name: '培训公告' },
        { Code: '领导关怀', Name: '领导关怀' }
      ]
      let newsData = {}
      let pageSize = 5
      try {
        const articleParams = { page: 1, rows: pageSize, sort: 'sort', order: 'desc' }
        for (const category of newsCategory) {
          let res = await app.$axios.$post(prefix + ALLAPI.ArticleList,
            { ...articleParams, CategoryCode: category.Code })
          newsData[category.Code] = {
            Code: category.Code,
            newsList: res.Data.ListData,
            total: res.Data.Count,
            page: 1,
            imgSrc: res.Data.Path,
            showSpin: false
          }
        }
        return {
          newsCategory,
          newsData,
          pageSize
        }
      } catch (e) {
        console.log('请求出错啦')
      }
    },
    created () {
      this.activeCode = this.$route.query.categoryCode || this.newsCategory[0].Code
    },
    methods: {
      async getList (page) {
        this.newsData[this.activeCode].showSpin = true
        let res = await ArticleList({
          rows: this.pageSize,
          categoryCode: this.activeCode,
          page
        })
        this.newsData[this.activeCode].showSpin = false
        if (res.Data) {
          this.newsData[this.activeCode].newsList = res.Data.ListData
          this.newsData[this.activeCode].total = res.Data.Count
          this.newsData[this.activeCode].page = page
        }
      }
    }
  }
</script>

<style lang="less">
  @import "~assets/styles/mixins";
  /* 新闻中心样式 */
  .news_center_page {
    .news_center_page_container {
      margin-top: 40px;
      background: url("~assets/images/teaching_plan_bg.png") no-repeat bottom -240px center;
      padding-bottom: 324px;

      .news_center_nav {
        margin-top: 23px;
        text-align: right;

        .news_center_nav_tab {
          display: inline-block;
          margin-left: 22px;
          padding: 0 12px;
          .ht-lineHt(34px);
          background-color: @gray-f4;
          color: #999;

          &:hover {
            background-color: @primary-4;
            color: #eee;
          }

          &.active {
            background-color: @primary-color;
            color: #fff;
          }
        }
      }

      .news_list_container {
        position: relative;
      }
    }
  }
</style>
