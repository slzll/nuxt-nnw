<template>
  <div class="elegant_demeanor_page">
    <PageHeader/>
    <div class="elegant_demeanor_page_container">
      <div class="container_24">
        <PageNav current="名师风采" :logo="require('~/assets/images/elegant_demeanor.png')" :show-divide="true"/>
        <div class="content" style="position:relative;">
          <ul class="teacher_list">
            <li class="teacher_item" v-for="item in newsList" :key="item.Id">
              <div class="left_circle"></div>
              <div class="teacher_img" :style="{backgroundImage: 'url('+imgSrc+'/'+item.Img+')'}"></div>
              <div class="teacher_info_block">
                <div class="teacher_name">
                  <span>{{item.Name}}</span>
                  <span class="teacher_flag">讲师</span>
                </div>
                <p class="teacher_business">职务：{{item.Description}}</p>
              </div>
              <nuxt-link class="teacher_link" :to="{name: 'newsDetail', query:{Id: item.Id}}" target="_blank">
                查看详情
              </nuxt-link>
            </li>
          </ul>
          <div class="pagination_container">
            <Page :current="page" :page-size="pageSize" :total="total" @on-change="getList" show-total show-elevator/>
          </div>
          <Spin fix v-if="showSpin"/>
        </div>
      </div>
    </div>
    <PageFooter/>
  </div>
</template>

<script>
  import { PageHeader, PageFooter, PageNav } from '~/components'
  import { ALLAPI, ArticleList } from '~/service/api'
  import { userInfo } from '~/service/mixin'

  export default {
    name: 'index',
    head () {
      return {
        title: '名师风采'
      }
    },
    components: { PageNav, PageFooter, PageHeader },
    mixins: [userInfo],
    async asyncData ({ app, isDev }) {
      let prefix = !isDev && process.server ? 'http://localhost' : ''
      let pageSize = 12
      try {
        const articleParams = { page: 1, rows: pageSize, sort: 'sort', order: 'desc' }

        let res = await app.$axios.$post(prefix + ALLAPI.ArticleList,
          { ...articleParams, CategoryCode: '名师风采' })
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
          categoryCode: '名师风采',
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

  .elegant_demeanor_page {
    .elegant_demeanor_page_container {
      margin-top: 40px;
      background: url("~assets/images/teaching_plan_bg.png") no-repeat bottom -240px center;
      padding-bottom: 324px;

      .page_header {
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

      .content {
        .teacher_list {
          margin-top: 30px;
          .clearFix();

          .teacher_item {
            float: left;
            position: relative;
            width: 585px;
            margin-bottom: 20px;
            margin-right: 26px;

            &:nth-child(2n+2) {
              margin-right: 0;
            }

            .left_circle {
              position: relative;
              .square(160px);
              background-color: @primary-color;
              border-radius: 50%;
              z-index: 1;
              text-align: center;
              line-height: 160px;
            }

            .teacher_img {
              position: absolute;
              left: 8px;
              top: 8px;
              .square(144px);
              border-radius: 50%;
              z-index: 3;
              border-right: 1px solid #fff;
              background-size: 100% auto;
              background-repeat: no-repeat;
              background-position: center center;
            }

            .teacher_info_block {
              position: absolute;
              z-index: 2;
              .wh(480px, 130px);
              left: 106px;
              top: 15px;
              background-color: #f7f7f7;
              padding-left: 70px;
              padding-top: 20px;

              .teacher_name {
                font-size: 18px;

                .teacher_flag {
                  display: inline-block;
                  .wh(45px, 18px);
                  font-size: 12px;
                  line-height: 18px;
                  padding-left: 12px;
                  color: #fff;
                  background: url("~assets/images/elegant_demeanor_flag_img.png") no-repeat left center;
                }
              }

              .teacher_business {
                margin-top: 5px;
                padding-right: 50px;
                line-height: 2;
              }
            }

            .teacher_link {
              position: absolute;
              z-index: 3;
              right: 0;
              bottom: 30px;
              .wh(90px, 28px);
              line-height: 28px;
              background-color: @primary-color;
              color: #fff;
              text-align: center;
            }
          }
        }

        .pagination_container {
          margin-top: 40px;
          text-align: right;

          .pagination_block {
            display: inline-block;
          }
        }
      }
    }
  }
</style>
