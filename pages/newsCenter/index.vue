<template>
  <div class="news_center_page">
    <PageHeader/>
    <div class="news_center_page_container">
      <div class="container_24">
        <div class="header">
          <img src="~/assets/images/news_center_logo.png" alt="">
          <div class="header_nav">
            <span>您所在的位置：</span>
            <nuxt-link to="/"><img src="~/assets/images/shouye.png" alt="">首页</nuxt-link>
            <span>-></span>
            <span class="active">新闻中心</span>
          </div>
        </div>
        <div class="header_divide_line"></div>
        <div class="news_center_nav">
          <a class="news_center_nav_tab"
             v-for="item in newsCategory"
             :key="item.Code"
             :class="{active: activeCode == item.Code}"
             @click="getList({ categoryCode:item.Code})">
            {{item.Name}}
          </a>
        </div>
        <ul class="news_list">
          <li class="news_item" v-for="item in newsList" :key="item.Id">
            <div class="news_item_block">
              <div class="news_date_block">
                <div class="news_date_day">{{item.CreateDate | dateFilter2('dd')}}</div>
                <div class="news_date_month">{{item.CreateDate | dateFilter2('yyyy-MM')}}</div>
              </div>
              <div class="news_info" :class="{max_width: !item.Img, min_width: !!item.Img}">
                <div class="news_name">
                  <nuxt-link :to="{name: 'newsDetail', query: {Id: item.Id}}">{{item.Name}}</nuxt-link>
                </div>
                <div class="news_desc">{{item.Description || '无' | wordLimit(100)}}</div>
              </div>
              <div class="news_img" v-if="item.Img">
                <img :src="newsImgSrc + '/' + item.Img" v-err-src>
              </div>
            </div>
            <div class="news_item_link">
              <nuxt-link :to="{name:'newsDetail', query: {Id: item.Id}}">查看详情</nuxt-link>
            </div>
          </li>
        </ul>
        <div class="pagination_container clearfix"
             :class="{'text-center': paginationConf.totalItems==0, 'text-right':paginationConf.totalItems>0}">
          <div tm-pagation conf="paginationConf"></div>
        </div>
      </div>
    </div>
    <PageFooter/>
  </div>
</template>

<script>
  import { PageHeader, PageFooter } from '~/components'
  import { ArticleList } from '~/service/api'

  export default {
    name: 'Index',
    components: { PageHeader, PageFooter },
    data () {
      return {
        activeCode: '',
        paginationConf: {},
        newsCategory: [
          { Code: '新闻资讯', Name: '新闻资讯' },
          { Code: '培训动态', Name: '培训动态' },
          { Code: '学院公告', Name: '学院公告' },
          { Code: '培训公告', Name: '培训公告' },
          { Code: '领导关怀', Name: '领导关怀' }
        ]
      }
    },
    asyncData () {
    },
    created () {
      this.activeCode = this.$route.query.categoryCode || this.newsCategory[0].Code
    },
    methods: {
      async getList (options) {
        let res = await ArticleList({
          rows: 5,
          categoryCode: this.activeCode,
          page: this.paginationConf.currentPage,
          ...options
        })
        this.activeCode = options.categoryCode || this.activeCode
        if (res.Data) {
          this.newsList = res.Data.ListData
          this.newsImgSrc = res.Data.Path
          this.paginationConf.totalItems = res.Data.Count
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

      .header {

        .header_nav {
          float: right;
          line-height: 76px;

          img {
            margin-top: -2px;
            margin-right: 4px;
          }

          .active {
            color: @primary-color;
          }
        }
      }

      .header_divide_line {
        margin-top: 19px;
        position: relative;
        .wh(100%, 2px);
        background-color: @gray-f4;

        &:after {
          content: "";
          display: block;
          position: absolute;
          .wh(221px, 4px);
          background-color: @primary-color;
          top: -1px;
          left: 0;
        }
      }

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

      .news_list {
        .news_item {
          padding: 24px 0 14px 0;
          border-bottom: 1px solid @gray-f4;

          .news_item_block {
            .clearFix();

            .news_date_block {
              float: left;
              .wh(48px, 100%);

              .news_date_day {
                .wh(48x, 48px);
                border: 1px solid @primary-color;
                text-align: center;
                line-height: 48px;
                font-size: 29px;
                color: @primary-color;
              }

              .news_date_month {
                font-size: 12px;
                color: #999;
                line-height: 2;
              }
            }

            .news_info {
              float: left;
              margin-left: 20px;

              &.max_width {
                width: 1125px;
              }

              &.min_width {
                width: 850px;
              }

              .news_name {
                .ht-lineHt(48px);
                font-size: 16px;
              }

              .news_desc {
                margin-top: 10px;
                color: #999;
              }
            }

            .news_img {
              float: right;
              margin-left: 47px;

              img {
                .wh(204px, 125px);
              }
            }
          }

          .news_item_link {
            margin-top: 25px;
            text-align: right;

            a {
              display: inline-block;
              padding: 0 12px;
              .ht-lineHt(34px);
              background-color: @gray-f4;
              color: #999;
              text-align: center;

              &:hover {
                background-color: @primary-color;
                color: #fff;
              }
            }
          }
        }
      }

      .pagination_container {
        margin-top: 80px;

        & > div[tm-pagation] {
          display: inline-block;
        }
      }
    }
  }
</style>
