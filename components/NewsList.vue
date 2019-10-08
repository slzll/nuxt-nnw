<template>
  <ul class="news_list">
    <li class="news_item" v-for="item in newsList" :key="item.Id">
      <div class="news_item_block">
        <div class="news_date_block">
          <div class="news_date_day">{{item.CreateDate | dateFilter2('dd')}}</div>
          <div class="news_date_month">{{item.CreateDate | dateFilter2('yyyy-MM')}}</div>
        </div>
        <div class="news_info" :class="{max_width: !item.Img, min_width: !!item.Img}">
          <div class="news_name" :title="item.Name">
            <nuxt-link :to="{name: 'newsDetail', query: {Id: item.Id}}">{{item.Name}}</nuxt-link>
          </div>
          <div class="news_desc">{{item.Description || '无' | wordLimit(100)}}</div>
        </div>
        <div class="news_img" v-if="item.Img">
          <img :src="imgSrc + '/' + item.Img" v-err-src>
        </div>
      </div>
      <div class="news_item_link">
        <nuxt-link :to="{name:'newsDetail', query: {Id: item.Id}}">查看详情</nuxt-link>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'NewsList',
    props: {
      newsList: { type: Array },
      imgSrc: { type: String }
    }
  }
</script>

<style lang="less">
  @import "~assets/styles/mixins";

  .news_list {
    .news_item {
      padding: 24px 0 14px 0;
      border-bottom: 1px solid @gray-f4;

      &:nth-last-child(1) {
        border-bottom: none;
      }

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
            .ellipsis();
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
</style>
