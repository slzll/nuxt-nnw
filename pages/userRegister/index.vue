<template>
  <div class="register_page">
    <PageHeader/>
    <!--注册-->
    <div class="register">
      <div class="container_24">
        <div class="form-signup" name="myForm">
          <div class="register_header">
            <span class="header_title">用户注册</span>
            <span>已有账号？</span>
            <a class="highlight strong" data-target=".user_login_modal" data-toggle="modal">立即登录</a>
          </div>
          <Form class="form-inline" ref="form" inline :label-width="100" :model="register">
            <FormItem class="form-group" label="用户名：" prop="account" required :show-message="false">
              <Input @on-blur="verifyAccount" @on-change="verifyAccount" v-model="register.account"
                     autocomplete="off" type="text" class="form-control" placeholder="请输入用户名"/>
              <span class="error" v-show="accountError">用户名不能为空！</span>
            </FormItem>
            <FormItem class="form-group" label="登录密码：" prop="password" required :show-message="false">
              <Input @on-blur="verifyPassword" @on-change="verifyPassword" v-model="register.password"
                     type="password" autocomplete="off" class="form-control" placeholder="请输入登录密码"/>
              <span class="error" v-show="passwordError">登录密码不能为空！</span>
            </FormItem>
            <FormItem class="form-group" label="确认密码：" prop="confirmPassword" required :show-message="false">
              <Input @on-blur="verifyConfirm" @on-change="verifyConfirm" v-model="register.confirmPassword"
                     type="password" autocomplete="off" class="form-control" placeholder="请输入确认密码"/>
              <span class="error" v-show="confirmError">确认密码不能为空！</span>
              <span class="error" v-show="confirmError2">两次密码输入不一致！</span>
            </FormItem>
            <FormItem class="form-group" label="电子邮箱：" prop="email">
              <Input @on-blur="verifyEmail" @on-change="verifyEmail" v-model="register.email"
                     type="text" class="form-control" placeholder="例：example@email.com"/>
              <span class="error" v-show="emailError">电子邮箱不能为空！</span>
              <span class="error" v-show="emailError2">邮箱格式有误！</span>
            </FormItem>
            <FormItem class="form-group" label="姓名：" prop="name" required :show-message="false">
              <Input @on-blur="verifyName" @on-change="verifyName" v-model="register.name"
                     type="text" class="form-control" placeholder="请输入姓名"/>
              <span class="error" v-show="nameError">姓名不能为空！</span>
            </FormItem>
            <FormItem class="form-group" label="手机号码：" prop="mobile">
              <Input @on-blur="verifyMobile" @on-change="verifyMobile" v-model="register.mobile"
                     type="text" class="form-control" placeholder="请输入手机号码"/>
              <span class="error" v-show="mobileError">手机号码不能为空！</span>
              <span class="error" v-show="mobileError2">手机号码格式有误！</span>
            </FormItem>
            <FormItem class="btn_block text-center" :label-width="0">
              <Button @click.native="clickRegister" class="registerBtn btn btn-primary">提交</Button>
              <Button @click.native="reset" class="btn btn-default">重置</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>

    <PageFooter/>
  </div>
</template>

<script>
  import { PageFooter, PageHeader } from '~/components'
  import { Register } from '~/service/api'
  import { checkType } from '~/service/utils'

  export default {
    name: 'index',
    head: { title: '注册' },
    components: { PageFooter, PageHeader },
    data () {
      return {
        accountError: false,
        passwordError: false,
        confirmError: false,
        confirmError2: false,
        emailError: false,
        emailError2: false,
        nameError: false,
        mobileError: false,
        mobileError2: false,
        register: {
          account: '',
          password: '',
          confirmPassword: '',
          email: '',
          name: '',
          idcard: '',
          groupid: '',
          mobile: '',
          smgcode: ''
        }
      }
    },
    methods: {
      reset () {
        this.$refs.form.resetFields()
      },
      verifyAccount () {
        this.accountError = !this.register.account
      },
      verifyPassword () {
        this.passwordError = !this.register.password
      },
      verifyName () {
        this.nameError = !this.register.name
      },
      verifyConfirm () {
        if ((this.register.password !== this.register.confirmPassword) && this.register.password && this.register.confirmPassword) {
          this.confirmError2 = true
          this.confirmError = false
        } else if ((this.register.password === this.register.confirmPassword) && this.register.password && this.register.confirmPassword) {
          this.confirmError2 = false
          this.confirmError = false
        } else {
          this.confirmError = !this.register.confirmPassword
        }
      },
      verifyEmail () {
        if (this.register.email && !checkType('email', this.register.email)) {
          this.emailError2 = true
          this.emailError = false
        } else {
          this.emailError2 = false
          this.emailError = false
        }
      },
      verifyMobile () {
        if (this.register.mobile && !checkType('mobile', this.register.mobile)) {
          this.mobileError2 = true
          this.mobileError = false
        } else {
          this.mobileError2 = false
          this.mobileError = false
        }
      },
      async clickRegister () {
        this.register.groupid = 756
        const { account, password, name, confirmPassword } = this.register
        const { confirmError2, emailError2, mobileError2 } = this
        if (account && password && confirmPassword && !confirmError2 && name && !emailError2 && !mobileError2) {
          let res = await Register(this.register)
          if (res.Type == 1) {
            this.$Message.info(res.Message)
            this.$router.push('/')
          } else {
            this.$Message.error(res.Message)
          }
        } else {
          this.$Message.error('信息填写错误，请核对！')
        }
      }
    }
  }
</script>

<style lang="less">
  @import "~assets/styles/mixins";

  .register {
    height: 615px;
    background: url("~assets/images/register_bg.png") no-repeat bottom center;
    background-size: 100% auto;

    .myModalLabel {
      text-align: center;
      font-size: 23px;
    }

    .form-signup {
      width: 835px;
      margin: 0 auto;
      position: relative;
      padding-top: 75px;

      .register_header {
        .ht-lineHt(32px);
        color: @primary-color;

        .header_title {
          display: inline-block;
          color: #fff;
          .wh(130px, 32px);
          padding-left: 15px;
          background: url("~assets/images/register_text_bg.png") no-repeat left center;

          &:before {
            content: '';
            margin-right: 5px;
            display: inline-block;
            .square(8px);
            border-radius: 50%;
            background-color: #fff;
          }
        }

        .strong {
          font-weight: bold;
        }
      }
    }

    .ivu-form {
      margin-top: 20px;
    }

    .form-group {
      input {
        width: 300px;
      }
    }

    .btn_block {
      width: 100%;
    }

    .error {
      position: absolute;
      right: 10px;
      top: 0;
      display: inline-block;
      line-height: 36px;
      color: @error-color;
      margin-left: 10px;
    }
  }
</style>
