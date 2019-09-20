<template>
  <div class="tmNewsInformation">
    <ul class="news_nav">
      <li v-for="(item,$index) in newsCategory" :key="item.Id" :class="{active: activeTab === $index}">
        <a @click="getNewsContent($index,item.Code)">{{item.Name}}</a>
      </li>
      <nuxt-link class="more" :to="{name: 'newsCenter',query: {categoryCode: activeCode}}"
                 target="_blank"></nuxt-link>
    </ul>
    <div class="tab-content">
      <div class="tab-panel perlist">
        <ul class="clearfix">
          <li class="pull-left" v-for="articleList in articleData" :key="articleList.Id">
            <span class="square_4"></span>
            <span class="title" :title="articleList.Name">
              <nuxt-link :to="{name: 'newsDetail', query: {Id:articleList.Id}}"
                         target="_blank">{{articleList.Name}}</nuxt-link>
            </span>
            <span class="time">{{articleList.CreateDate | dateFilter2('yyyy-MM-dd')}}</span>
          </li>
        </ul>
      </div>
      <Spin fix v-if="showSpin"/>
    </div>
  </div>
</template>

<script>
  import { ArticleList } from '../service/api'

  export default {
    name: 'NewsInformation',
    props: {},
    data () {
      return {
        activeTab: 0,
        activeCode: null,
        showSpin: false,
        newsCategory: [
          { Code: '新闻资讯', Name: '新闻资讯' },
          { Code: '学院公告', Name: '学院公告' },
          { Code: '培训公告', Name: '培训公告' }
        ],
        articleData: []
      }
    },
    mounted () {
      this.getNewsContent(0, this.newsCategory[0].Code)
    },
    methods: {
      async getNewsContent ($index, CategoryCode) {
        this.showSpin = true
        this.activeTab = $index
        this.activeCode = CategoryCode
        let res = await ArticleList({ rows: 7, CategoryCode })
        this.showSpin = false
        this.articleData = res.Data.ListData
      }
    }
  }
</script>

<style lang="less">
  @import "~assets/styles/mixins";

  .tmNewsInformation {
    width: 100%;
    padding-left: 30px;

    .news_nav {
      .clearFix();
      border-bottom: 1px solid #ccc;

      li {
        float: left;
        .ht-lineHt(38px);

        a {
          font-size: 20px;
        }

        &:hover, &.active {
          a {
            color: #b2000c;
          }
        }

        & + li {
          &:before {
            content: '|';
            float: left;
            margin: 0 15px;
            color: #000;
          }
        }
      }
    }

    .tab-content {
      position: relative;
      margin-top: 10px;

      .perlist {
        ul {
          li {
            .ht-lineHt(40px);
            width: 100%;

            span {
              display: inline-block;
              .pull-left();
            }

            .square_4 {
              display: block;
              float: left;
              margin: 18px 14px 0 0;
              .square(4px);
              background-color: #bfc0c0;
            }

            &:hover {
              .square_4 {
                background-color: #b2000c;
              }
            }

            .title {
              width: 70%;
              .text-left();
              .ellipsis();
            }

            .time {
              .pull-right();
              margin-right: 10px;
              color: @text-color-3;
            }
          }
        }
      }
    }

    .more {
      .ht-lineHt(38px);
      .pull-right();
      background: @common-header-more no-repeat center;
      width: 60px;
    }
  }
</style>
