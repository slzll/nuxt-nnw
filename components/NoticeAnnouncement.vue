<template>
  <div class="noticeAnnouncement">
    <div class="notice">
      <!--轮播-->
      <div class="noticeSlide pull-left">
        <div class="noticeSlideList"
             v-for="(list, index) in noticeData"
             :key="index"
             v-show="index === noticeActiveIndex">
          <nuxt-link :to="{name: 'noticeDetail',query: {Id:list.Id}}" target="_blank">
            <img :src="imgPath+'/'+list.Img" :title="list.Name" :alt="list.Name" v-err-src>
          </nuxt-link>
        </div>
      </div>
      <!--列表-->
      <div class="notice-body pull-left">
        <ul>
          <li v-for="(list,$index) in noticeData"
              :key="$index"
              :class="{active: $index === noticeActiveIndex}"
              @mouseenter="changeActiveIndex($index)"
              @mouseleave="startTimer"
          >
            <nuxt-link class="title" :to="{name: 'noticeDetail',query: {Id:list.Id}}" target="_blank">
              <span class="notice_index"><strong>0{{$index+1}}</strong></span>
              <span class="notice_name">{{list.Name}}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NoticeAnnouncement',
    props: {
      imgPath: {
        type: String
      },
      noticeData: {
        type: Array
      }
    },
    data () {
      return {
        noticeActiveIndex: 0,
        timer: null
      }
    },
    mounted () {
      this.startTimer()
    },
    methods: {
      changeActiveIndex ($index) {
        clearInterval(this.timer)
        this.noticeActiveIndex = $index
      },
      startTimer () {
        this.timer = setInterval(() => {
          this.noticeActiveIndex++
          if (this.noticeActiveIndex >= this.noticeData.length) {
            this.noticeActiveIndex = 0
          }
        }, 5000)
      }
    }
  }
</script>

<style lang="less">
  @import "~assets/styles/mixins";

  .noticeAnnouncement {
    .wh(100%, 330px);

    .noticeSlide {
      width: 440px;

      img {
        .wh(100%, 330px);
      }
    }

    .notice-body {
      ul {
        li {
          position: relative;
          .wh(160px, 110px);
          background-color: #f4f4f4;
          color: #888888;
          padding: 20px 0;

          .title {
            .clearFix();
          }

          .notice_index {
            position: relative;
            display: block;
            float: left;
            .wh(46px, 100%);
            line-height: 70px;
            color: #bfc0c0;
            font-size: 20px;
            text-align: center;
            font-weight: bold;

            &:before, &:after {
              position: absolute;
              content: '/';
              z-index: 1;
              line-height: 1;
              font-size: 16px;
            }

            &:before {
              left: 12px;
              bottom: 5px;
            }

            &:after {
              right: 12px;
              top: 5px;
            }
          }

          .notice_name {
            display: block;
            float: left;
            .wh(100px, 100%);
            overflow: hidden;
            line-height: 1.5;
            font-size: 16px;
          }

          &.active {
            background-color: #b2000c;
            color: #fff;

            .notice_index, .notice_name {
              color: #fff;
            }

            &:before {
              position: absolute;
              content: '';
              display: block;
              left: -10px;
              top: 50%;
              border-right: 10px solid #b2000c;
              border-top: 8px solid transparent;
              border-bottom: 8px solid transparent;
              border-left: none;
              margin-top: -8px;
            }
          }
        }
      }
    }
  }
</style>
