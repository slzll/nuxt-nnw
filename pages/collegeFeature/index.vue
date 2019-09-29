<template>
  <div class="college_feature_page">
    <PageHeader/>
    <div class="college_feature_page_container">
      <div class="container_24">
        <PageNav current="学院特色" :logo="require('~/assets/images/college_characteristics.png')"/>
        <div class="content">
          <div class="header_banner">
            学院将延安红色革命精神与绿色发展理念相结合，将线上先进的信息化技术手段与教学设备设施和线下的教学创新相结合，
            将教育培训和其他产业如文化创意产业相结合，打造了独特的核心优势：
          </div>
          <ul class="feature_list">
            <li class="feature_item" v-for="(item,$index) in featureList" :key="$index">
              <img class="feature_img" :src="item.img" alt="">
              <div class="feature_name">{{item.name}}</div>
              <p class="feature_desc">{{item.desc | wordLimit(100)}}</p>
              <div class="feature_hover_desc">
                <div class="hover_feature_name">{{item.name}}</div>
                <p class="hover_feature_desc">{{item.desc}}</p>
              </div>
              <div class="item_index">{{$index+1}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <PageFooter/>
  </div>
</template>

<script>
  import { PageHeader, PageFooter, PageNav } from '~/components'
  import { userInfo } from '~/service/mixin'

  export default {
    name: 'index',
    head: {
      title: '学院特色'
    },
    components: { PageNav, PageFooter, PageHeader },
    mixins: [userInfo],
    data () {
      return {
        featureList: [
          {
            img: require('~/assets/images/college_feature_2.png'),
            name: '“两黄两圣”的丰富内涵',
            desc: '立足黄河壶口大瀑布、中华第一陵“黄帝陵”独特地理位置，深挖“文化圣地”、“革命圣地”的精神内涵，整合延安丰富的现场教学资源、革命旧址，并借助临近南泥湾机场等便利交通等优势，创建新时代研究型教育培训实践基地。'
          },
          {
            img: require('~/assets/images/college_feature_3.png'),
            name: '优秀的师资队伍',
            desc: '专兼结合、教研并重、学以致用，学院有全国知名高校专家教授、富有创新精神和丰富经验的政府官员、具备极强实操经验的名企高管以及知名社会培训师组成的优秀师资600多位，打造了一支高素质、高质量、高水平的师资队伍。'
          },
          {
            img: require('~/assets/images/college_feature_4.png'),
            name: '先进的教学技术和设施',
            desc: '学院引进VR、AI等先进教学技术，打造大数据智慧校园、智能化课堂、管理全程无纸化操作等以及采用大量的人工智能技术，力争成为中国最先进的智慧校园平台。'
          },
          {
            img: require('~/assets/images/college_feature_5.png'),
            name: ' 一流的服务管理',
            desc: '人性化管家式服务、24小时餐饮配套、智慧化个性化管理体系，全程跟踪反馈、关键点管理，让学员精力充沛地参与学习，提高教学成效。'
          },
          {
            img: require('~/assets/images/college_feature_6.png'),
            name: '创新的研究型教学体系',
            desc: '充分挖掘革命圣地延安红色文化资源，坚持走“内涵式”探讨、“研究型”发展和“与时俱进”办学方针，推动教育培训内容往深里走、方式往实处用、效果往心里去。'
          },
          {
            img: require('~/assets/images/college_feature_7.png'),
            name: '360度教学体系',
            desc: '为提升学员的思想素质与综合能力，我院整合多方资源，提供由线下学习、PC端学习、手机移动端学习、平板学习、微信社群交流等方式相结合的终身教育模式；在线下培训部分，为提高培训的针对性和实效性、助力学员培训成果的转化，我院采用专题面授、现场教学、案例教学、体验式教学、访谈式教学、情境模拟教学、结构化研讨、沙盘模拟和团队拓展组成的全方位、沉浸式教学模式。'
          }
        ]
      }
    }
  }
</script>

<style lang="less">
  @import "~assets/styles/mixins";

  /* 学院优势样式 */
  .college_feature_page {
    .college_feature_page_container {
      margin-top: 40px;
      background: url("~assets/images/teaching_plan_bg.png") no-repeat bottom -240px center;
      padding-bottom: 324px;

      .content {
        .header_banner {
          margin-top: 24px;
          .wh(100%, 82px);
          background: url("~assets/images/college_feature_1.png") no-repeat center;
          padding: 30px 283px 14px 137px;
          line-height: 1.5;
        }

        .feature_list {
          margin-top: 30px;
          .clearFix();

          .feature_item {
            float: left;
            position: relative;
            margin-bottom: 40px;
            margin-right: 19px;
            .wh(387px, 428px);

            &:nth-child(3n+3) {
              margin-right: 0px;
            }

            .feature_img {
              .wh(387px, 230px);
            }

            .feature_name {
              position: absolute;
              top: 192px;
              right: 0;
              .wh(260px, 39px);
              background: url("~assets/images/college_feature_text_bg.png") no-repeat right center;
              padding-right: 20px;
              font-size: 17px;
              text-align: right;
              line-height: 39px;
              color: #fff;
              z-index: 1;
            }

            .feature_desc {
              .wh(387px, 200px);
              padding: 19px 22px;
              background: #f4f4f4;
              text-indent: 2em;
              line-height: 2;
              overflow: hidden;
            }

            .feature_hover_desc {
              display: none;
              position: absolute;
              top: 0;
              left: 0;
              .wh(387px, 428px);
              background: url("~assets/images/college_feature_block_bg.png") no-repeat center center;
              color: #fff;
            }

            .item_index {
              position: absolute;
              bottom: -20px;
              left: 50%;
              margin-left: -15px;
              .wh(30px, 40px);
              text-align: center;
              line-height: 40px;
              color: #fff;
              font-size: 20px;
              background: url("~assets/images/college_feature_index_bg.png") no-repeat center center;
              z-index: 5;
            }

            &:hover {
              .feature_hover_desc {
                display: block;
                z-index: 3;
                padding: 35px 28px 20px 28px;

                .hover_feature_name {
                  color: #ffd800;
                  font-size: 28px;
                  padding-left: 25px;

                  &:after {
                    content: '';
                    display: block;
                    margin-top: 25px;
                    .wh(36px, 4px);
                    background-color: #ffd800;
                  }
                }

                .hover_feature_desc {
                  margin-top: 25px;
                  color: #fff;
                  line-height: 2;
                  text-indent: 2em;
                }
              }
            }
          }
        }
      }

    }
  }
</style>
