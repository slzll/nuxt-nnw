<template>
  <div class="train_schedule_page">
    <PageHeader/>
    <div class="train_schedule_page_container">
      <div class="container_24">
        <PageNav current="日程安排" :logo="require('~/assets/images/the_schedule.png')" :show-divide="true"/>
        <div class="content">
          <div class="train_schedule_info">
            <div class="info_title">青年干部标准化培训方案</div>
            <div class="clearfix">
              <div class="info_list pull-left">
                【培训对象】{{scheduleData.Model.TrainingObject}}<br>
                【培训目标】{{scheduleData.Model.TrainingObjectives}}<br>
                【培训时间】{{scheduleData.Model.StudyDay}}天（含来回）<br>
                【培训方式】{{scheduleData.Model.TrainingMode}}<br>
              </div>
              <div class="info_list pull-left">
                【培训地点】{{scheduleData.Model.Address}}<br>
                【培训费用】{{scheduleData.Model.TrainingCost}}<br>
                【课程设置】{{scheduleData.Model.CourseSet}}<br>
              </div>
            </div>
          </div>
          <div class="train_schedule_list">
            <ul>
              <li v-for="item in scheduleList" :key="item.Id">
                <div class="day_name">{{item.ScheduleName}}</div>
                <div class="day_text_block" v-if="item.ChildrenList.length <= 1">
                  {{item.ChildrenList[0].ScheduleName || '&emsp;'}}
                </div>
                <div class="day_table_block" v-if="item.ChildrenList.length > 1">
                  <table class="table table-bordered">
                    <tr>
                      <td class="text-left" v-for="data in item.ChildrenList" :key="data.Id">{{data.CourseDateStr}}</td>
                    </tr>
                    <tr>
                      <td v-for="data in item.ChildrenList" :key="data.Id">
                        <div class="text-left" v-if="data.ScheduleType == 'Course'">
                          <p><strong>{{data.CourseTypeStr}}：</strong></p>
                          <p><strong>{{data.ScheduleName}}</strong></p>
                        </div>
                        <div class="text-left" v-if="data.ScheduleType != 'Course'">
                          <p><strong>{{data.ScheduleName}}</strong></p>
                          <div v-html="data.Content"></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td v-for="data in item.ChildrenList" :key="data.Id">
                        <div class="text-left" v-if="data.ScheduleType=='Course'">
                          <p>主讲：</p>
                          <p>{{data.Teacher}}</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <PageFooter/>
  </div>
</template>

<script>
  import { PageFooter, PageHeader, PageNav } from '~/components'
  import { ALLAPI } from '~/service/api'
  import { userInfo } from '~/service/mixin'

  export default {
    name: 'index',
    head: { title: '日程安排' },
    components: { PageNav, PageFooter, PageHeader },
    mixins: [userInfo],
    async asyncData ({ app, isDev, query }) {
      let prefix = !isDev && process.server ? 'http://localhost' : ''
      try {
        let res = await app.$axios.$post(prefix + ALLAPI.TrainingScheduleList, { Id: query.Id })
        let scheduleData = res.Data
        let scheduleList = res.Data.ListData
        return {
          scheduleData,
          scheduleList
        }
      } catch (e) {
        console.log('请求出错')
      }
    }
  }
</script>

<style lang="less">
  @import "~assets/styles/mixins";

  .train_schedule_page {
    .train_schedule_page_container {
      margin-top: 40px;
      padding-bottom: 96px;

      .table {
        border-collapse: collapse;
      }

      .table-bordered tr > td, .table-bordered > tr > th {
        border: 1px solid #ddd;
      }

      .table tr > td, .table tr > th {
        padding: 8px;
        line-height: 1.42857143;
        vertical-align: top;
      }

      .content {
        .train_schedule_info {
          margin-top: 30px;
          padding-top: 20px;
          .wh(100%, 200px);
          background-color: @gray-f4;
          background-image: url("~assets/images/train_schedule_bg_1.png");
          background-position: right bottom;
          background-repeat: no-repeat;
          overflow: hidden;

          .info_title {
            position: relative;
            background-color: @primary-color;
            .wh(240px, 32px);
            line-height: 32px;
            font-size: 16px;
            color: #fff;
            padding-left: 30px;

            &:before {
              position: absolute;
              left: 13px;
              top: 50%;
              display: block;
              content: '';
              .square(8px);
              border-radius: 50%;
              margin-top: -4px;
              background-color: #fff;
            }

            &:after {
              position: absolute;
              right: 0;
              top: 0;
              content: '';
              display: block;
              border-right: 12px solid @gray-f4;
              border-top: 16px solid @primary-color;
              border-bottom: 16px solid @primary-color;
              border-left: none;
            }
          }

          .info_list {
            margin-left: 30px;
            line-height: 1.5;
            padding: 20px 60px 20px 0;
            border-right: 1px dashed #cdcdcd;

            &:nth-child(1) {
              margin-right: 30px;
            }

            &:nth-child(2) {
              border-right: none;
            }
          }
        }

        .train_schedule_list {
          position: relative;
          margin-top: 50px;
          margin-left: 65px;
          border-left: 1px solid #e8e8e8;
          padding: 25px 0 25px 25px;

          ul {
            li {
              position: relative;
              margin-bottom: 25px;

              &:nth-last-child(1) {
                margin-bottom: 0;
              }

              .day_name {
                position: absolute;
                .square(40px);
                line-height: 40px;
                text-align: center;
                color: #fff;
                font-size: 16px;
                left: -93px;
                top: 25px;
                border-radius: 50%;
              }

              .day_text_block {
                width: 278px;
                padding: 18px 51px 20px 40px;
                line-height: 1.5;
                min-height: 80px;
              }

              .day_table_block {
                width: 1106px;
                padding: 25px;
              }

              &:before {
                content: '';
                display: block;
                position: absolute;
                left: -31px;
                top: 38px;
                .square(10px);
                border-radius: 50%;
              }

              &:after {
                content: '';
                display: block;
                position: absolute;
                left: -26px;
                top: 38px;
                border-left: 10px solid #e41f29;
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
                border-right: none;
              }

              &:nth-child(1n+1) {
                .day_name, &:before {
                  background-color: #e41f29;
                }

                &:after {
                  border-left-color: #e41f29;
                }

                .day_text_block, .day_table_block {
                  background-color: #fdeaeb;
                }
              }

              &:nth-child(2n+2) {
                .day_name, &:before {
                  background-color: #ee7f2c;
                }

                &:after {
                  border-left-color: #ee7f2c;
                }

                .day_text_block, .day_table_block {
                  background-color: #fffaf6;
                }
              }

              &:nth-child(3n+3) {
                .day_name, &:before {
                  background-color: #fddc01;
                }

                &:after {
                  border-left-color: #fddc01;
                }

                .day_text_block, .day_table_block {
                  background-color: #fffdf2;
                }
              }

              &:nth-child(4n+4) {
                .day_name, &:before {
                  background-color: #69ba4f;
                }

                &:after {
                  border-left-color: #69ba4f;
                }

                .day_text_block, .day_table_block {
                  background-color: #f5fff2;
                }
              }

              &:nth-child(5n+5) {
                .day_name, &:before {
                  background-color: #50c0eb;
                }

                &:after {
                  border-left-color: #50c0eb;
                }

                .day_text_block, .day_table_block {
                  background-color: #f0fafe;
                }
              }

              &:nth-child(6n+6) {
                .day_name, &:before {
                  background-color: #385ca8;
                }

                &:after {
                  border-left-color: #385ca8;
                }

                .day_text_block, .day_table_block {
                  background-color: #f2f6ff;
                }
              }

              &:nth-child(7n+7) {
                .day_name, &:before {
                  background-color: #8577ca;
                }

                &:after {
                  border-left-color: #8577ca;
                }

                .day_text_block, .day_table_block {
                  background-color: #f2efff;
                }
              }
            }
          }

          .table-bordered {
            border: none;

            tr:nth-child(1) td {
              border-top: none;
            }

            tr:nth-last-child(1) td {
              border-bottom: none;
            }

            tr > td {
              &:nth-child(1) {
                border-left: none
              }

              &:nth-last-child(1) {
                border-right: none;
              }
            }
          }
        }
      }
    }
  }
</style>
