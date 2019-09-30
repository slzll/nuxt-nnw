<template>
  <div class="tmNewsInformation">
    <ul class="news_nav">
      <li v-for="item in category" :key="item.Id" :class="{active: activeCode === item.Code}">
        <a @click="activeCode = item.Code">{{item.Name}}</a>
      </li>
      <nuxt-link class="more" :to="{name: 'newsCenter',query: {categoryCode: activeCode}}"
                 target="_blank"></nuxt-link>
    </ul>
    <div class="tab-content">
      <div class="tab-panel perlist" v-for="(articleData,key) in data" :key="key" v-show="key === activeCode">
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
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NewsInformation',
    props: {
      category: { type: Array },
      data: { type: Object }
    },
    data () {
      return {
        activeCode: null
      }
    },
    mounted () {
      this.activeCode = this.category[0].Code
      console.log(this.data[this.activeCode])
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
