<template>
  <div class="footer">
    <div class="footerBg">
      <div class="container_24 footer_container">
        <a class="contact_us_btn">联系我们</a>
        <div class="footer_top">
          <img class="left" src="~/assets/images/footer_img_2.png" alt="">
          <img class="right" src="~/assets/images/footer_img_3.png" alt="">
          <p>陈老师：18058177277&emsp;沈老师：15868150506&emsp;朱老师：18981995975<br/>
            官网电话：0911-8267777&emsp;4009030309</p>
          <img class="footer_text" src="~/assets/images/footer_text.png" alt="扬奋斗精神，创美好未来">
        </div>
        <div class="footer_bottom">
          版权所有：延安南泥湾学院&emsp;地址：陕西省延安市宝塔区南泥湾镇&emsp;<a href="http://www.beian.miit.gov.cn"
                                                     target="_blank">陕ICP备19016978号</a>
        </div>
      </div>
    </div>
    <div class="contact_float animated bounce">
      <a class="online_contact" href="http://wpa.qq.com/msgrd?v=3&uin=485282192&site=qq&menu=yes" target="_blank">
        <img class="img_1" src="~/assets/images/contact_us_bg_1.png" alt="">
        <img class="img_2" src="~/assets/images/contact_us_bg_2.png" alt="">
      </a>
      <div class="bottom_bg">
        <img src="~/assets/images/contact_us_bg_3.png" alt="">
        <div class="contact_phones">
          <p>学院电话</p>
          <p class="phone">0911-8267777</p>
          <p>叶老师</p>
          <p class="phone">18691195899</p>
          <p>王老师</p>
          <p class="phone">18609295899</p>
          <p>张老师</p>
          <p class="phone">13038579956</p>
        </div>
        <a class="contact_us_btn" @click="showContactModal = true">
          <img src="~/assets/images/contact_us_bg_4.png" alt="">
        </a>
      </div>
    </div>
    <Modal class="contact_us_modal" v-model="showContactModal" width="702" footer-hide :closable="false"
           @on-visible-change="toggleModalShow">
      <img class="close_img" @click="showContactModal = false" src="~/assets/images/close.png" alt="">
      <div class="title">培训预约</div>
      <div class="list contact_phones">
        <div class="list2-5"><p>学院电话:</p>
          <p class="phone">0911-8267777</p></div>
        <div class="list2-5"><p>叶老师:</p>
          <p class="phone">18691195899</p></div>
        <div class="list2-5"><p>王老师:</p>
          <p class="phone">18609295899</p></div>
        <div class="list2-5"><p>张老师:</p>
          <p class="phone">13038579956</p></div>
      </div>
      <Form class="appoint_form" :model="appointData" :label-width="80" inline>
        <FormItem prop="TrainTitle" label="培训主题：" class="form-group train_topic">
          <Input class="form-control" v-model="appointData.TrainTitle"/>
        </FormItem>
        <FormItem prop="CompanyName" label="预约单位：" class="form-group">
          <Input class="form-control" v-model="appointData.CompanyName"/>
        </FormItem>
        <FormItem prop="TrainNumber" label="培训人数：" class="form-group">
          <Input class="form-control" v-model="appointData.TrainNumber"/>
        </FormItem>
        <FormItem prop="TrainStartDate" label="培训日期：" class="form-group">
          <DatePicker class="form-control" v-model="appointData.TrainStartDate"/>
        </FormItem>
        <FormItem prop="TrainDay" label="培训天数：" class="form-group">
          <Input class="form-control" v-model="appointData.TrainDay"/>
        </FormItem>
        <FormItem prop="Contacts" label="预约人：" class="form-group appoint_people">
          <Input class="form-control" v-model="appointData.Contacts"/>
        </FormItem>
        <FormItem prop="ContactsNumber" label="联系电话：" class="form-group appoint_phone">
          <Input class="form-control" v-model="appointData.ContactsNumber"/>
        </FormItem>
        <FormItem prop="Remarks" label="补充说明：" class="form-group appoint_desc">
          <Input type="textarea" v-model="appointData.Remarks"/>
        </FormItem>
        <FormItem class="form-group">
          <Button class="btn create_appoint_btn" :class="hasSubmited?'btn-success':'btn-primary'"
                  :loading="loading" @click="createAppoint">
            {{hasSubmited?'预约成功':'立即预约'}}
          </Button>
        </FormItem>
      </Form>
    </Modal>
  </div>

</template>

<script>
  import { TrainingAppointmentCreate } from '~/service/api'

  export default {
    name: 'PageFooter',
    data () {
      return {
        showContactModal: false,
        hasSubmited: false,
        appointData: {
          TrainTitle: '',
          CompanyName: '',
          TrainNumber: '',
          TrainDay: '',
          TrainStartDate: '',
          Contacts: '',
          ContactsNumber: '',
          Remarks: ''
        },
        loading: false
      }
    },
    methods: {
      resetData () {
        this.hasSubmited = true
        this.appointData = {
          TrainTitle: '',
          CompanyName: '',
          TrainNumber: '',
          TrainDay: '',
          TrainStartDate: '',
          Contacts: '',
          ContactsNumber: '',
          Remarks: ''
        }
      },
      toggleModalShow (flag) {
        if (!flag) {
          this.resetData()
        }
      },
      async createAppoint () {
        if (!this.appointData.CompanyName) {
          this.$Message.error('请输入预约单位')
          return
        }
        if (!this.appointData.TrainStartDate) {
          this.$Message.error('请输入培训日期')
          return
        }
        if (!this.appointData.Contacts) {
          this.$Message.error('请输入预约人')
          return
        }
        if (!this.appointData.ContactsNumber) {
          this.$Message.error('请输入联系电话')
          return
        }
        this.loading = true
        let res = await TrainingAppointmentCreate(this.appointData)
        this.loading = false
        if (res.IsSuccess) {
          this.hasSubmited = true
        } else {
          this.$Modal.error({ title: '提示', content: res.Message })
        }
      }
    }
  }
</script>

<style lang="less">
  @import "~assets/styles/mixins";

  .footer {
    .footerBg {
      height: 134px;
      background: url("~assets/images/footer_bg.png") repeat-x top center;
      overflow: hidden;

      .footer_container {
        position: relative;
        height: 100%;

        .contact_us_btn {
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          background: url("~assets/images/footer_img.png") no-repeat center center;
          .wh(119px, 60px);
          font-size: 16px;
          color: #fff;
          text-align: center;
          padding-top: 20px;
          line-height: 40px;
        }

        .left {
          position: absolute;
          left: 0;
          top: 15px;
        }

        .right {
          position: absolute;
          left: 670px;
          top: 15px;
        }

        p {
          margin-left: 70px;
          padding-top: 15px;
          line-height: 32px;
          color: #a1a1a1;
        }

        .footer_text {
          position: absolute;
          right: 0;
          top: 27px;
        }

        .footer_bottom {
          position: absolute;
          bottom: 0;
          right: 0;
          text-align: right;
          color: #a1a1a1;
          line-height: 44px;

          a {
            color: #a1a1a1;
          }
        }
      }
    }

    .contact_float {
      position: fixed;
      top: 100px;
      right: 8px;
      z-index: 1000;

      .online_contact {
        display: block;
        position: relative;
        cursor: pointer;
        width: 100%;
        height: 148px;
        text-align: center;

        .img_2 {
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-left: -61px;
          z-index: -1;
        }
      }

      .contact_phones {
        position: absolute;
        top: 190px;
        width: 100%;
        padding: 0 0 0 10px;
        line-height: 1.75;

        .phone {
          font-weight: bold;
          font-size: 15px;
          word-break: break-all;
        }
      }

      .contact_us_btn {
        display: block;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -62.5px;
        width: 100%;
        height: 48px;
      }
    }
  }

  .contact_us_modal {
    .ivu-modal-body {
      padding: 49px 65px 15px 65px;

      .close_img {
        position: absolute;
        top: 15px;
        right: 15px;
        cursor: pointer;
      }
    }

    .title {
      position: relative;
      font-size: 16px;
      line-height: 1;
      color: @primary-color;
      padding-bottom: 11px;

      &:before, &:after {
        position: absolute;
        content: '';
        display: block;
      }

      &:before {
        bottom: -1px;
        .wh(100%, 2px);
        background-color: @gray-eee;
      }

      &:after {
        left: 15px;
        bottom: 0;
        .wh(30px, 2px);
        background-color: @primary-color;
      }
    }

    .contact_phones {
      margin-top: 20px;
      font-size: 15px;
      font-weight: bold;

      p {
        line-height: 1.75;
      }

      .phone {
        font-size: 16px;
      }
    }

    .appoint_form {
      .ivu-form-item {
        margin-right: 0;
        margin-bottom: 0;
      }

      .form-group {
        margin-top: 20px;

        &:nth-child(odd) {
          margin-left: 34px;
        }

        .form-control {
          width: 180px;
        }

        &.appoint_desc, &.train_topic {
          margin-left: 0;
          width: 100%;

          .ivu-input {
            width: 480px;
          }

          textarea.ivu-input {
            width: 480px;
            height: 68px;
            resize: none;
          }
        }

        &.contact_method {
          .form-control {
            overflow: hidden;
          }
        }

        .form-control[readonly] {
          background-color: #f4f4f4;
          //color: #afafaf;
        }

        .create_appoint_btn {
          margin-left: 70px;
          width: 190px;
        }
      }

      .ivu-form-item-label {
        color: #999;
        width: 80px;
        font-weight: normal;
        text-align: justify;
        text-align-last: justify;

        &.required {
          &:before {
            content: '*';
            display: inline;
            color: @primary-color;
          }
        }
      }
    }
  }
</style>
