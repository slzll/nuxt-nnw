<template>
  <div class="main_page_container">
    <PageHeader/>
    <div class="container_24 mar_top_40">
      <div class="grid_12">
        <NoticeAnnouncement :notice-data="noticeData" :img-path="imgPath"/>
      </div>
      <div class="grid_12">
        <NewsInformation :category="newsCategory" :data="newsData"/>
      </div>
    </div>
    <TeachingModule :list-data="teachingModuleList" :img-path="articleImgPath"/>
    <TeachingPlan/>
    <ElegantDemeanor :teacher-list="teacherList" :img-path="articleImgPath"/>
    <SuccessfulCase :list-data="caseList" :img-path="articleImgPath"/>
    <BeautifulNnw :list-data="beautifulList" :img-path="articleImgPath"/>
    <PageFooter/>
  </div>
</template>

<script>
  import {
    PageHeader,
    NoticeAnnouncement,
    NewsInformation,
    TeachingModule,
    TeachingPlan,
    ElegantDemeanor,
    SuccessfulCase,
    BeautifulNnw,
    PageFooter
  } from '~/components'
  import { ALLAPI } from '~/service/api'
  import { userInfo } from '~/service/mixin'

  export default {
    head: {
      title: '红色教育-延安培训-延安南泥湾学院--首页'
    },
    components: {
      PageFooter,
      BeautifulNnw,
      SuccessfulCase,
      ElegantDemeanor,
      TeachingPlan,
      TeachingModule,
      NewsInformation,
      NoticeAnnouncement,
      PageHeader
    },
    mixins: [userInfo],
    async asyncData ({ app }) {
      try {
        const articleParams = { page: 1, rows: 3, sort: 'sort', order: 'desc' }
        let leftNotice = await app.$axios.$post(ALLAPI.LeftNotice, articleParams)
        const noticeData = leftNotice.Data.ListData
        const imgPath = leftNotice.Data.Path
        const newsCategory = [
          { Code: '新闻资讯', Name: '新闻资讯' },
          { Code: '学院公告', Name: '学院公告' },
          { Code: '培训公告', Name: '培训公告' }
        ]
        const newsData = {}
        for (let key in newsCategory) {
          let item = newsCategory[key]
          let res = await app.$axios.$post(ALLAPI.ArticleList,
            { ...articleParams, rows: 7, CategoryCode: item.Code })
          newsData[item.Code] = res.Data.ListData
        }
        let teachingData = await app.$axios.$post(ALLAPI.ArticleList,
          { ...articleParams, rows: 8, CategoryCode: '精品教学模块' })
        const teachingModuleList = teachingData.Data.ListData
        const articleImgPath = teachingData.Data.Path

        let teacherData = await app.$axios.$post(ALLAPI.ArticleList,
          { ...articleParams, rows: 6, CategoryCode: '名师风采' })
        const teacherList = teacherData.Data.ListData

        let successData = await app.$axios.$post(ALLAPI.ArticleList,
          { ...articleParams, rows: 4, CategoryCode: '成功案例' })
        const caseList = successData.Data.ListData

        let beautifulData = await app.$axios.$post(ALLAPI.ArticleList,
          { ...articleParams, rows: 6, CategoryCode: '南泥湾风光' })
        const beautifulList = beautifulData.Data.ListData
        beautifulList.push({
          Attachment: '',
          Description: '南泥湾精彩当下',
          Id: 'video_id',
          Img: require('~/assets/images/nnwfg_img.png'),
          Video: require('~/assets/images/nnwfg.mp4'),
          Name: '南泥湾VCR',
          isVideo: true
        })
        return {
          noticeData,
          imgPath,
          teachingModuleList,
          articleImgPath,
          teacherList,
          caseList,
          beautifulList,
          newsCategory,
          newsData
        }
      } catch (e) {
        console.log('请求出错')
      }
    },
    mounted () {
    },
    methods: {}
  }
</script>

<style lang="less">
  @import "~assets/styles/mixins";

</style>
