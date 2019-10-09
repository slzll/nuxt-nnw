<template>
  <div class="article_page">
    <PageHeader/>
    <div class="article_page_container">
      <div class="container_24">
        <div class="grid_6 mar_top_15">
          <div class="categoryTree">
            <div class="com-header">
              <p class="title">
                <span class="text">文章分类</span>
              </p>
            </div>
            <div class="tmBorder">
              <Tree class="expander_tree" :data="categoryData" @on-select-change="changeCategory"/>
            </div>
          </div>
        </div>
        <div class="grid_18 mar_top_15 pad_left_10">
          <!--文章列表-->
          <div class="articleList">
            <div class="com-header">
              <p class="title">
                <span class="text">{{articleTitle}}</span>
              </p>
            </div>
            <div class="tmBorder">
              <Breadcrumb class="breadcrumb">
                <BreadcrumbItem>
                  <Icon type="md-settings" size="18"/>
                  您的当前位置
                </BreadcrumbItem>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem>{{articleTitle}}</BreadcrumbItem>
              </Breadcrumb>
              <Form class="search_form" inline>
                <FormItem class="search_input">
                  <Input v-model="searchTitle" type="text" class="form-control" placeholder="请输入搜索关键词"/>
                </FormItem>
                <FormItem>
                  <Button class="btn btn-primary" ng-click="refreshList({page:1,search:searchTitle})">搜索
                  </Button>
                </FormItem>
              </Form>
              <div class="article_list mar_top_20">
                <ul class="list" style="width: 100%">
                  <li class="clearfix list_header">
                    <div class="titleName list7">文章名称</div>
                    <div class="titleDate list3">发布日期</div>
                  </li>
                  <li class="clearfix" v-for="item in articleListData" :key="item.Id">
                    <div class="name list7">
                      <span class="arrow"></span>
                      <nuxt-link :to="{name: 'newsDetail', query: {Id:item.Id}}" :title="item.Name" target="_blank">
                        {{item.Name}}
                      </nuxt-link>
                    </div>
                    <div class="listDate list3">{{item.CreateDate | dateFilter2('yyyy/MM/dd-hh:mm:ss')}}</div>
                  </li>
                </ul>
                <Page class-name="pagination" :current="page" :page-size="pageSize" :total="total" @on-change="getList"
                      show-total
                      show-elevator/>
                <Spin fix v-if="showSpin"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PageFooter/>
  </div>
</template>

<script>
  import { PageHeader, PageFooter } from '~/components'
  import { ALLAPI, ArticleList } from '~/service/api'
  import { convertTree } from '~/service/utils'

  export default {
    name: 'index',
    head () {
      return {
        title: this.articleTitle || '文章列表'
      }
    },
    components: { PageHeader, PageFooter },
    data () {
      return {
        searchTitle: '',
        page: 1,
        pageSize: 15,
        showSpin: false
      }
    },
    watch: {},
    async asyncData ({ app, query }) {
      const { categoryCode } = query
      const articleParams = { page: 1, rows: 15, sort: 'sort', order: 'desc', categoryCode }
      let categoryData = []
      let articleListData = []
      let articleTitle = ''
      let total = 0
      let CategoryId = 0
      try {
        let cateRes = await app.$axios.$post(ALLAPI.ArticleCategory)
        categoryData = cateRes.Data.ListData
        categoryData = convertTree(categoryData)
        let listRes = await app.$axios.$post(ALLAPI.ArticleList, articleParams)
        articleListData = listRes.Data.ListData
        total = listRes.Data.Count
        CategoryId = listRes.Data.CategoryId
        articleTitle = listRes.Data.CategoryName || listRes.Data.TitleNav || '文章列表'
        return { categoryData, articleListData, articleTitle, total, CategoryId }
      } catch (e) {
        return { categoryData, articleListData, articleTitle, total, CategoryId }
      }
    },
    methods: {
      changeCategory (node, current) {
        this.getList(1, current.id)
      },
      async getList (page, categoryId = this.CategoryId) {
        this.page = page
        this.showSpin = true
        this.CategoryId = categoryId
        let res = await ArticleList({ page, rows: this.pageSize, categoryId })
        this.showSpin = false
        this.articleTitle = res.Data.CategoryName || res.Data.TitleNav
        this.articleListData = res.Data.ListData
        this.total = res.Data.Count
      }
    }
  }
</script>

<style lang="less">
  @import "~assets/styles/mixins";

  .article_page {
    .article_page_container {
      background: url("~assets/images/teaching_plan_bg.png") no-repeat bottom -240px center;
      padding-bottom: 324px;
    }

    .com-header {
      .wh(100%, 50px);
      .clearFix();
      border-bottom: 1px solid @primary-color;

      .more {
        .ht-lineHt(50px);
        .pull-right();
        background: @common-header-more no-repeat center;
        width: 60px;
      }

      .title {
        .ht-lineHt(50px);
        color: @text-color;
        font-size: 18px;
        font-weight: 600;
        .pull-left();
        background: @common-header-icon no-repeat left;

        .text {
          padding-left: 45px;
        }
      }
    }

    .expander_tree {
      padding: 5px;

      .ivu-tree-title {
        font-size: 14px;
      }
    }

    .breadcrumb {
      padding: 0 15px;
      .ht-lineHt(36px);
      background-color: #f5f5f5;
    }

    .search_form {
      padding: 20px 40px;

      .ivu-form-item {
        margin: 0;
      }

      .search_input {
        width: 80%;
      }
    }

    .arrow {
      margin: 0 10px;
      .wh(11px, 20px);
      display: inline-block;
      vertical-align: middle;
      background: @common-arrow-right no-repeat center;
    }

    .article_list {
      position: relative;

      .list_header {
        background-color: @blue-2;
        text-align: center;
      }

      .list {
        li {
          border-bottom: 1px solid @border-color-base;
        }
      }

      .listDate {
        text-align: center;
      }
    }

    .pagination {
      margin: 20px;
    }
  }
</style>
