<template>
  <div class="college_info_page">
    <PageHeader/>
    <div class="college_info_page_container">
      <div class="container_24">
        <PageNav current="学院简介" :logo="require('~/assets/images/company_profile.png')"/>
        <div class="content">
          <div class="night_scene">
            <img src="~/assets/images/college_info_1.png" alt="">
            <span class="float_text">学院夜景</span>
          </div>
          <div class="college_pingmian">
            <img src="~/assets/images/college_info_2.png" alt="">
            <span class="float_text">基地平面图</span>
            <p>
              延安南泥湾学院是经中共延安市委、延安市人民政府批准成立的新时代创新研究型教育培训基地。延安是中华民族的发祥地，南泥湾是军垦、农垦事业的发源地。延安南泥湾学院坚持以习近平新时代中国特色社会主义思想为指导，充分运用党中央在延安十三年历史和延安精神的宝贵教学资源，借助南泥湾丰富的革命旧址资源和自然生态资源，以弘扬“自力更生、艰苦奋斗”的南泥湾精神为宗旨，深挖黄土高原文化和黄河母亲河文化的深厚内涵，立足中华第一陵“黄帝陵”、黄河壶口大瀑布、南泥湾机场等独特地理位置，以“求是、创新、知行、卓越”为办学理念，坚持政治性、开放性、实践性、创新性特色定位，将党的理论教育、党性教育与专业化能力培训有机结合，做到学以致用、用以促学、知行合一，建设成党政领导干部、广大党员及社会各界人士开阔眼界、提高修养、增强本领的优秀平台。
            </p>
          </div>
          <div class="education_base">
            <div class="paragraph_container">
              <p>
                “肩负使命，心系责任”。学院坚持走“内涵式”探讨、“研究型”发展和“与时俱进”办学方针，引进VR、AI等先进教学技术，与全国省、市、县数百家党委干部教育部门建立线上线下学习相结合的创新模式，聘请了一大批专家学者，打造了一支高素质、高质量、高水平的师资队伍。通过模块化组课、菜单式选学与个性化定制相结合的特色教学服务，以及专家面授、深度现场教学、仿真体验式教学、访谈式教学、行动学习、户外拓展等方法相结合的特色教学设计，从理论和实践相结合、历史和现实相结合、现在和未来相结合、中国与世界相结合的不同维度，推动教育培训内容往深里走、方式往实处用、效果往心里去，保证培训效果的科学性和实效性。
              </p>
              <p>
                “惟希望也，故进取。惟进取也，故曰新”。学院共分三期建设，总占地面积近千亩，学院内既有上世纪30、40年代的古建筑、古窑洞，又有60、70年代的大礼堂、书吧，还有融田野、江南园林风格于一体的现代教学中心、会议中心，以及军事拓展训练、稻田体验场地等。目前，学院一期已建成投用，可同时满足500人在校培训。2021年学院全部建成后，可同时容纳3000人在校培训。
              </p>
            </div>
            <span class="float_text">教育基地</span>
            <img class="img_3" src="~/assets/images/college_info_3.png" alt="">
            <img class="img_4" src="~/assets/images/college_info_4.png" alt="">
          </div>
          <div class="core_value">
            <img src="~/assets/images/college_info_5.png" alt="">
          </div>
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
      title: '学院简介'
    },
    components: { PageNav, PageFooter, PageHeader },
    mixins: [userInfo]
  }
</script>

<style lang="less">
  @import "~assets/styles/mixins";

  .college_info_page {
    .college_info_page_container {
      margin-top: 40px;
      background: url("~assets/images/teaching_plan_bg.png") no-repeat bottom -240px center;
      padding-bottom: 324px;

      .float_text {
        position: absolute;
        display: block;
        .wh(128px, 42px);
        background-color: @primary-color;
        text-align: center;
        font-size: 18px;
        line-height: 42px;
        color: #fff;
        z-index: 3;
      }

      .night_scene {
        position: relative;
        margin-top: 20px;

        .float_text {
          right: -10px;
          top: 28px;
        }
      }

      .college_pingmian {
        margin-top: 40px;
        position: relative;
        .clearFix();

        img {
          float: left;
        }

        .float_text {
          top: -10px;
          left: -10px;
        }

        p {
          float: left;
          margin-left: 36px;
          .wh(738px, 284px);
          overflow: hidden;
          text-indent: 2em;
          font-size: 17px;
          line-height: 1.8;
          font-weight: bold;
        }
      }

      .education_base {
        margin-top: 50px;
        position: relative;
        .clearFix();

        .paragraph_container {
          float: left;
          width: 734px;
          line-height: 1.8;
          font-size: 16px;

          p {
            text-indent: 2em;
            font-size: 17px;
            font-weight: bold;
          }

          p + p {
            margin-top: 50px;
          }
        }

        .float_text {
          top: 175px;
          right: 10px;
        }

        .img3 {
          margin-left: 36px;
          float: left;
        }

        .img_4 {
          position: absolute;
          right: 0;
          top: 200px;
          z-index: 2;
        }
      }

      .core_value {
        margin-top: 64px;
      }
    }
  }
</style>
