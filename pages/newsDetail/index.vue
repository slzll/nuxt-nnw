<template>
  <section class="news_detail_page">
    <PageHeader/>
    <div class="news_detail_page_container">
      <div class="container_24">
        <PageNav current="新闻中心" :logo="require('~/assets/images/news_center_logo.png')" :show-divide="true"/>
        <div class="news_detail_content_container container_24">
          <Affix :offset-top="-135" @on-change="affixChange">
            <div class="news_operation">
              <div class="news_date_block" v-if="articleData.CreateDate">
                <div class="news_date_day">{{articleData.CreateDate | dateFilter2('dd')}}</div>
                <div class="news_date_month">{{articleData.CreateDate | dateFilter2('yyyy-MM')}}</div>
              </div>
              <div class="news_date_block" v-if="articleData.CreatedDate">
                <div class="news_date_day">{{articleData.CreatedDate | dateFilter2('dd')}}</div>
                <div class="news_date_month">{{articleData.CreatedDate | dateFilter2('yyyy-MM')}}</div>
              </div>
              <div>
                <p class="gray_text">--其他--</p>
                <a class="favorite_add"
                   @click="favoriteAdd"
                   v-show="!articleData.FavoriteId">
                  <img src="~/assets/images/favorite_normal.png" alt="">
                </a>
                <a class="favorite_del" @click="favoriteDelete"
                   v-show="articleData.FavoriteId">
                  <img src="~/assets/images/favorite_active.png" alt="">
                </a>
                <a class="print" @click="print"></a>
              </div>
            </div>
          </Affix>
          <div class="article-detail" ref="detail">
            <div class="article-detail-title-bar">
              <p class="article-detail-title">{{articleData.Name}}</p>
              <p class="article-detail-info">
                <span v-if="articleData.Author">作者：{{articleData.Author}}</span>
                <span v-if="!articleData.Author">作者：{{articleData.Creator}}</span>
                <span v-show="articleData.ClickCount">浏览次数：{{articleData.ClickCount}}</span>
                <a class="set_font_btn" @click="reduceFont">[缩小字体]</a>
                <a class="set_font_btn" @click="increaseFont">[放大字体]</a>
              </p>
              <div v-share:share="config"></div>
            </div>
            <div id="setFont" ref="content" class="article-detail-content justify" v-html="articleData.Content"></div>
            <div class="article-detail-footer clearfix">
              <div class="up_and_down_link pull-left">
                <p class="ellipsis">
                  <nuxt-link v-show="articleData.UpName" :title="articleData.UpName"
                             :to="{name: 'newsDetail', query:{Id:articleData.UpId}}">
                    上一篇：{{articleData.UpName}}
                  </nuxt-link>
                  <a v-show="!articleData.UpName">上一篇：无</a>
                </p>
                <p class="ellipsis">
                  <nuxt-link v-show="articleData.DownName" :title="articleData.DownName"
                             :to="{name: 'newsDetail', query:{Id:articleData.DownId}}">
                    下一篇：{{articleData.DownName}}
                  </nuxt-link>
                  <a v-show="!articleData.DownName">下一篇：无</a>
                </p>
              </div>
              <div class="pull-right article_source text-right">
                来源：{{articleData.Source || '无'}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PageFooter/>
  </section>
</template>

<script>
  import { PageFooter, PageHeader, PageNav } from '~/components'
  import { ALLAPI, FavoriteAdd, FavoriteDelete } from '~/service/api'
  import { userInfo, wxAuth } from '~/service/mixin'

  let wx = {}
  if (process.client) {
    wx = require('weixin-js-sdk')
  }
  export default {
    name: 'index',
    head () {
      return {
        title: this.articleData.Name || '新闻详情'
      }
    },
    components: { PageNav, PageFooter, PageHeader },
    mixins: [wxAuth, userInfo],
    data () {
      return {
        config: {}
      }
    },
    watch: {
      '$route' (newVal, oldVal) {
        if (newVal.name === oldVal.name && newVal.query.Id !== oldVal.query.Id) {
          window.location.reload()
        }
      }
    },
    async asyncData ({ app, query, isDev, redirect }) {
      let prefix = !isDev && process.server ? 'http://localhost' : ''
      try {
        let res = await app.$axios.$post(prefix + ALLAPI.ArticleContent, { Id: query.Id })
        let articleData = res.Data
        return {
          articleData
        }
      } catch (e) {
      }
    },
    mounted () {
      this.config = {
        url: this.url, // 网址，默认使用 window.location.href
        source: window.location.origin, // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        title: this.articleData.Name, // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description: this.articleData.Description || this.articleData.Name, // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image: this.articleData.ArticleImg ? 'https://www.yannw.cn' + this.articleData.ArticleImg : 'https://www.yannw.cn/webapp/logo.png', // 图片, 默认取网页中第一个img标签
        sites: ['qzone', 'qq', 'weibo', 'wechat', 'douban'], // 启用的站点
        disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
        wechatQrcodeTitle: '微信扫一扫：分享', // 微信二维码提示文字
        wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
      }
    },
    methods: {
      // 微信签名mixin中已混入，已有url
      checkJsaApi () {
        let shareData = {
          title: this.articleData.Name, // 分享标题
          desc: this.articleData.Name, // 分享描述
          link: this.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: this.articleData.ArticleImg ? 'https://www.yannw.cn' + this.articleData.ArticleImg : 'https://www.yannw.cn/webapp/logo.png',
          success: () => console.log('success'),
          cancel: () => console.log('cancel')
        }
        wx.ready(() => {
          console.log('ready')
          wx.checkJsApi({
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: res => {
            }
          })
          // 朋友圈
          wx.onMenuShareTimeline(shareData)
          // 朋友
          wx.onMenuShareAppMessage(shareData)
          // QQ
          wx.onMenuShareQQ(shareData)
          // 腾讯微博
          wx.onMenuShareWeibo(shareData)
          // QQ空间
          wx.onMenuShareQZone(shareData)
        })
        wx.error(() => console.log('error'))
      },
      async favoriteAdd () {
        const { Id, Name } = this.articleData
        let res = await FavoriteAdd({ mainId: Id, type: 'Article', title: Name, remark: '0' })
        if (res.Type === 1) {
          this.articleData.FavoriteId = res.Value
          this.$Message.info(res.Message)
        } else if (res.Type === 0) {
          this.$Message.error(res.Message)
        }
      },
      async favoriteDelete () {
        let res = await FavoriteDelete({ id: this.articleData.FavoriteId })
        if (res.Type === 1) {
          this.articleData.FavoriteId = 0
          this.$Message.info(res.Message)
        } else if (res.Type === 0) {
          this.$Message.error(res.Message)
        }
      },
      print () {
        this.$htmlToPaper('setFont')
      },
      setFont (flag) {
        const { content } = this.$refs
        const elements = content.querySelectorAll('p,span,div')
        for (let i = 0, len = elements.length; i < len; i++) {
          let el = elements[i]
          let fontSize = el.style.fontSize
          fontSize = parseInt(fontSize) || 14
          fontSize = flag ? Math.min(++fontSize, 42) : Math.max(--fontSize, 12)
          el.style.fontSize = fontSize + 'px'
        }
      },
      reduceFont () {
        this.setFont(false)
      },
      increaseFont () {
        this.setFont(true)
      },
      affixChange (flag) {
        if (flag) {
          this.$refs.detail.style.marginLeft = 160 + 'px'
        } else {
          this.$refs.detail.style.marginLeft = 0 + 'px'
        }
      }
    }
  }
</script>

<style lang="less">
  @import "~assets/styles/mixins";

  .news_detail_page {
    .news_detail_page_container {
      margin-top: 40px;
      background: url("~assets/images/teaching_plan_bg.png") no-repeat bottom -240px center;
      padding-bottom: 324px;

      .news_detail_content_container {
        position: relative;

        .news_operation {
          float: left;
          width: 160px;
          padding-left: 28px;
          padding-top: 135px;

          .news_date_block {
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

          .gray_text {
            margin-top: 47px;
            color: #999;
          }

          .favorite_add, .favorite_del {
            display: block;
            margin-top: 18px;
            text-align: center;
            .wh(48px, 38px);
          }

          .print {
            margin-top: 14px;
            display: block;
            .wh(48px, 38px);
            background: url("~assets/images/print_normal.png") no-repeat center center;

            &:hover {
              background: url("~assets/images/print_hover.png") no-repeat center center;
            }
          }
        }

        .article-detail {
          float: left;
          width: 1040px;
          padding: 0 5px;

          .article-detail-title-bar {
            text-align: center;
          }

          .article-detail-title {
            word-spacing: 0px;
            margin-top: 69px;
            font-size: 32px;
            font-weight: normal;
            white-space: pre-wrap;
          }

          .article-detail-info {
            margin-top: 24px;
            color: @text-color-3;
            line-height: 25px;

            span {
              margin: 0 15px;
            }

            a {
              margin: 0 5px;
              color: @text-color-3;

              &:hover {
                color: @text-color-2;
              }
            }

            .set_font_btn {
              user-select: none;
            }
          }

          .article-detail-content {
            min-height: 500px;
            margin-top: 50px;
            width: 100%;
            overflow: hidden;

            img {
              max-width: 100%;
            }
          }

          .article-detail-footer {
            margin-top: 80px;

            .up_and_down_link {
              font-size: 16px;
              line-height: 2;
            }

            .article_source {
              line-height: 64px;
            }
          }
        }
      }
    }

    #setFont {
      word-wrap: break-word;

      img {
        max-width: 100%;
      }
    }
  }
</style>
