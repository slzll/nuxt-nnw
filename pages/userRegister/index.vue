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
          <Form class="form-inline" ref="form" inline :label-width="100" :model="register" :rules="rules">
            <FormItem class="form-group" label="用户名：" prop="account">
              <Input v-model="register.account" autocomplete="off" type="text" class="form-control"
                     placeholder="请输入用户名"/>
            </FormItem>
            <FormItem class="form-group" label="登录密码：" prop="password">
              <Input v-model="register.password" type="password" autocomplete="off" class="form-control"
                     placeholder="请输入登录密码"/>
            </FormItem>
            <FormItem class="form-group" label="确认密码：" prop="confirmPassword">
              <Input v-model="register.confirmPassword" type="password" autocomplete="off" class="form-control"
                     placeholder="请输入确认密码"/>
            </FormItem>
            <FormItem class="form-group" label="电子邮箱：" prop="email">
              <Input v-model="register.email" type="text" class="form-control" placeholder="例：example@email.com"/>
            </FormItem>
            <FormItem class="form-group" label="姓名：" prop="name">
              <Input v-model="register.name" type="text" class="form-control" placeholder="请输入姓名"/>
            </FormItem>
            <FormItem class="form-group" label="手机号码：" prop="mobile">
              <Input v-model="register.mobile" type="text" class="form-control" placeholder="请输入手机号码"/>
            </FormItem>
            <FormItem class="btn_block text-center" :label-width="0">
              <Button @click.native="clickRegister" :disabled="submiting" class="registerBtn btn btn-primary">提交
              </Button>
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
      const validateConfirm = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('确认密码不能为空'))
        } else if (value !== this.register.password) {
          callback(new Error('两次密码输入不一致'))
        } else {
          callback()
        }
      }
      const validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback()
        } else if (!checkType('email', value)) {
          callback(new Error('邮箱格式不正确'))
        } else {
          callback()
        }
      }
      const validateMobile = (rule, value, callback) => {
        if (value === '') {
          callback()
        } else if (!checkType('mobile', value)) {
          callback(new Error('手机号码格式有误'))
        } else {
          callback()
        }
      }
      return {
        submiting: false,
        register: {
          account: '',
          password: '',
          confirmPassword: '',
          email: '',
          name: '',
          groupid: 756,
          mobile: '',
          smg: ''
        },
        rules: {
          account: [{ required: true, message: '用户名不能为空', trigger: 'change,blur' }],
          password: [{ required: true, message: '密码不能为空', trigger: 'change,blur' }],
          confirmPassword: [{ required: true, validator: validateConfirm, trigger: 'change,blur' }],
          email: [{ validator: validateEmail, trigger: 'change,blur' }],
          name: [{ required: true, message: '姓名不能为空', trigger: 'change,blur' }],
          mobile: [{ validator: validateMobile, trigger: 'change,blur' }]
        }
      }
    },
    methods: {
      reset () {
        this.$refs.form.resetFields()
      },
      clickRegister () {
        this.$refs.form.validate(async valid => {
          if (valid) {
            this.submiting = true
            let res = await Register(this.register)
            this.submiting = false
            if (res.Type == 1) {
              this.$Modal.success({
                title: '恭喜',
                content: res.Message,
                onOk: () => {
                  this.$router.push('/')
                }
              })
            } else {
              this.$Message.error(res.Message)
            }
          } else {
            this.$Message.error('信息填写错误，请核对！')
          }
        })
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
