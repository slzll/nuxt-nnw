<template>
  <div class="tmHeader">
    <div class="header">
      <div class="header_banner container_24">
        <div class="grid_9">
          <a class="set_home" @click="setHome($event.target)">
            <img src="~/assets/images/set_home.png" alt="设为首页">
          </a>
          <span>|</span>
          <a class="wechat_logo">
            <img src="~/assets/images/wechat_logo.png" alt="微信图标">
            <div class="img_container">
              <img src="~/assets/images/weiXinImg.jpg" class="app_img" alt="wechat">
            </div>
          </a>
          <a class="app_logo">
            <img src="~/assets/images/app_logo.png" alt="APP图标">
            <div class="img_container">
              <img src="~/assets/images/appImg.png" class="app_img" alt="app" style="border: 8px solid #fff;">
            </div>
          </a>
        </div>
        <div class="grid_6 text-center">
          <div class="logo">
            <img src="~/assets/images/logo.png" alt="logo">
          </div>
          <div class="logo_text">
            <img src="~/assets/images/logo_text.png" alt="logoText">
          </div>
        </div>
        <div v-if="showLogin" class="grid_9 text-right">
          <img class="user_icon" src="~/assets/images/user_icon.png" alt="头像">
          <a class="user_login_btn" @click="showLoginModal = true">用户登录</a>
          <span>/</span>
          <nuxt-link class="user_register_btn" to="/userRegister">
            注册
          </nuxt-link>
        </div>
        <div v-if="!showLogin" class="grid_9 text-right login_info">
          欢迎来到延安南泥湾学院，{{ userInfo.Name }},
          <a class="user_login_btn" v-if="userInfo.UserType === '管理员'" href="/admin" target="_blank">进入控制台</a>
          <a class="log_out_btn" @click="loginOut">退出</a>
        </div>
      </div>
      <div class="nav_bars clearfix container_24">
        <ul class="pull-left">
          <nuxt-link role="presentation" tag="li" exact-active-class="active" to="/" exact>
            <a>网站首页</a>
          </nuxt-link>
          <li role="presentation">
            <a>关于学院</a>
            <div class="hover_nav_list">
              <ul>
                <nuxt-link role="presentation" tag="li" active-class="active" to="/collegeInfo">
                  <a>学院简介</a>
                </nuxt-link>
                <nuxt-link role="presentation" tag="li" active-class="active" to="/collegeFeature">
                  <a>学院特色</a>
                </nuxt-link>
                <nuxt-link role="presentation" tag="li" active-class="active" to="/promotionalFilm">
                  <a>宣传片</a>
                </nuxt-link>
                <nuxt-link
                  role="presentation"
                  tag="li"
                  exact-active-class="active"
                  exact
                  :to="{name: 'newsCenter', query:{categoryCode: '领导关怀'}}"
                >
                  <a>领导关怀</a>
                </nuxt-link>
              </ul>
            </div>
          </li>
          <nuxt-link
            role="presentation"
            tag="li"
            exact-active-class="active"
            :to="{name: 'newsCenter'}"
            exact
          >
            <a>新闻中心</a>
            <div class="hover_nav_list">
              <ul>
                <nuxt-link
                  role="presentation"
                  tag="li"
                  exact-active-class="active"
                  exact
                  :to="{name: 'newsCenter', query:{categoryCode: '新闻资讯'}}"
                >
                  <a>新闻资讯</a>
                </nuxt-link>
                <nuxt-link
                  role="presentation"
                  tag="li"
                  exact-active-class="active"
                  exact
                  :to="{name: 'newsCenter', query:{categoryCode: '培训动态'}}"
                >
                  <a>培训动态</a>
                </nuxt-link>
              </ul>
            </div>
          </nuxt-link>
          <li role="presentation">
            <a>教育安排</a>
            <div class="hover_nav_list">
              <ul>
                <nuxt-link role="presentation" tag="li" exact-active-class="active" exact to="/#plan1">
                  <a>党员干部培训</a>
                </nuxt-link>
                <nuxt-link role="presentation" tag="li" exact-active-class="active" exact to="/#plan2">
                  <a>企业家培训</a>
                </nuxt-link>
                <nuxt-link role="presentation" tag="li" exact-active-class="active" exact to="/#plan3">
                  <a>营地教育</a>
                </nuxt-link>
                <nuxt-link role="presentation" tag="li" exact-active-class="active" exact to="/#plan4">
                  <a>老年教育</a>
                </nuxt-link>
              </ul>
            </div>
          </li>
        </ul>
        <ul class="pull-right">
          <li role="presentation">
            <a>学员风采</a>
            <div class="hover_nav_list">
              <ul>
                <nuxt-link role="presentation" tag="li" exact-active-class="active" exact to="/learningExperience">
                  <a>学习心得</a>
                </nuxt-link>
              </ul>
            </div>
          </li>
          <nuxt-link role="presentation" tag="li" exact-active-class="active" exact to="/successfulCase">
            <a>成功案例</a>
          </nuxt-link>
          <li role="presentation">
            <a>联系我们</a>
            <div class="hover_nav_list">
              <ul>
                <nuxt-link role="presentation" tag="li" exact-active-class="active" exact
                           :to="{name: 'newsDetail', query: {Id: 304}}">
                  <a>招聘信息</a>
                </nuxt-link>
                <nuxt-link role="presentation" tag="li" exact-active-class="active" exact to="/contactUs">
                  <a>培训预约</a>
                </nuxt-link>
              </ul>
            </div>
          </li>
          <nuxt-link role="presentation" tag="li" exact-active-class="active" exact
                     :to="{name: 'newsDetail', query: {Id: 345}}">
            <a>合作单位</a>
          </nuxt-link>
        </ul>
      </div>
    </div>
    <Modal
      ref="userLoginModal"
      v-model="showLoginModal"
      class="user_login_modal"
      width="702"
      footer-hide
      :closable="false"
    >
      <img class="close_img" src="~/assets/images/close.png" alt="" @click="showLoginModal=false">
      <div class="user_login_container clearfix">
        <form class="user_login_form">
          <div class="title">
            用户登录
          </div>
          <div class="form-group clearfix">
            <label>
              <Input
                @on-focus="inputFocus()"
                @on-change="inputChange()"
                v-model="login.Account"
                placeholder="请输入用户名"
              />
            </label>
            <span class="error" :class="showError?'is-visible':''">帐号或密码错误</span>
            <span class="error" :class="showError2?'is-visible':''">用户名密码不能为空</span>
          </div>
          <div class="form-group clearfix">
            <label>
              <Input
                v-model="login.PassWord"
                type="password"
                autocomplete="off"
                placeholder="请输入密码"
                @on-focus="inputFocus()"
                @on-change="inputChange()"
              />
            </label>
          </div>
          <div class="checkbox clearfix">
            <div class="forgetPassword pull-right">
              <a @click="forgetPassword">忘记密码？</a>
            </div>
          </div>
          <Button @click="clickLogin" type="primary" class="btn btn-primary">
            登录
          </Button>
          <p class="register_block text-center">
            没有账号？
            <nuxt-link to="/userRegister" class="highlight">注册</nuxt-link>
          </p>
        </form>
        <div class="divide_line"></div>
        <div class="qr_code_container">
          <p>扫码进入南泥湾移动专区</p>
          <div class="img_block">
            <img src="~/assets/images/appImg.png" alt="">
          </div>
        </div>
      </div>
      <Spin fix v-if="showSpin"/>
    </Modal>
    <BackTop :bottom="100" :right="30">
      <img src="~/assets/images/top.png" alt="">
    </BackTop>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Base64 } from 'js-base64'
  import { setHome, getCookie, setCookie, delCookie } from '~/plugins/utils'
  import { LoginCode, LoginOut } from '~/service/api'

  export default {
    name: 'PageHeader',
    data () {
      return {
        showLogin: true,
        showLoginModal: false,
        showError: false,
        showError2: false,
        showSpin: false,
        login: {
          Account: '',
          PassWord: '',
          RememberMe: true
        },
        userMessage: {
          Name: ''
        }
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    created () {
      this.showLogin = !this.userInfo.Name
    },
    mounted () {
      if (getCookie('RM')) {
        const userCookies = Base64.decode(getCookie('RM')).split('|')
        this.login.Account = userCookies[1]
        this.login.PassWord = userCookies[2]
        this.login.RememberMe = true
      } else {
        this.login = {
          Account: '',
          PassWord: '',
          RememberMe: true
        }
      }
    },
    methods: {
      setHome (obj, url) {
        setHome(obj, url)
      },
      inputChange () {
        this.showError = false
        this.showError2 = !this.login.Account || !this.login.PassWord
      },
      inputFocus () {
        this.showError = false
        this.showError2 = false
      },
      async loginOut () {
        await LoginOut()
        window.location.reload()
      },
      forgetPassword () {
      },
      setUserCookie () {
        if (this.login.RememberMe) {
          let rmString = this.login.RememberMe + '|' + this.login.Account + '|' + this.login.PassWord
          setCookie('RM', Base64.encode(rmString), 7)
        } else {
          delCookie('RM')
        }
      },
      async clickLogin () {
        const { Account, PassWord } = this.login
        if (!Account || !PassWord) {
          this.showError = true
          this.showError2 = false
          return
        }
        this.showSpin = true
        let res = await LoginCode(this.login)
        this.showSpin = false
        switch (res.Type) {
          case 0:
            this.$Message.error(res.Message)
            this.showError = true
            this.showError2 = false
            break
          case 1:
            this.$Message.success('登录成功，将刷新页面')
            this.setUserCookie()
            window.location.reload()
            break
          case 2:
            this.setUserCookie()
            this.$Modal.warning({
              title: '警告',
              content: '用户首次登录，请设置密保!',
              onOk: () => {
                this.$router.push('/securitySetting')
              }
            })
            break
          case 3:
            this.$Modal.confirm({
              title: '警告',
              content: '帐号在别的地方登录，是否踢出？',
              onOk: async () => {
                let data = await LoginOut({ kickUserId: res.Message })
                if (data.Type === 1) {
                  this.clickLogin()
                }
              }
            })
            break
          case 4:
            this.$Modal.error({
              title: '警告',
              content: '此电脑已经有用户登录，您不能用其他帐号再次登录！'
            })
            break
          case 5:
            this.$Modal.error({
              title: '警告',
              content: '平台当前在线人数到达上限，请稍后再试！'
            })
            break
          case 10:
            this.$Modal.info({
              title: '提示',
              content: `您还不是本平台成员，将为您转向您所在的平台：${res.Message}`
            })
            break
          default:
            this.$Modal.info({
              title: '提示',
              content: res.Message
            })
            break
        }
      }
    }
  }
</script>

<style lang="less">
  @import "~assets/styles/mixins";

  .tmHeader {
    .header {
      position: relative;
      width: 100%;
      height: 150px;
      line-height: 100px;
      background: url("~assets/images/header_banner.png") repeat-x top center;
      color: #fdd0d4;

      .header_banner {
        .set_home {
          margin-right: 19px;
        }

        .wechat_logo {
          margin-left: 26px;
          margin-right: 16px;
        }

        .app_logo, .wechat_logo {
          position: relative;

          .img_container {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #fff;
            .square(150px);
            z-index: 1000;

            img {
              .wh(100%, 100%);
            }
          }

          &:hover {
            .img_container {
              display: block;
            }
          }
        }

        .logo {
          line-height: 1;
          padding-top: 16px;
          padding-bottom: 8px;
        }

        .logo_text {
          line-height: 1;
        }

        .user_icon {
          margin-top: -4px;
          margin-right: 9px;
        }

        .user_login_btn, .user_register_btn, .login_info, .login_info > a {
          color: #fdd0d4;
          font-size: 16px;
        }

        .user_login_btn, .user_register_btn, .login_info, .login_info > a {
          &:hover {
            color: #fff;
          }
        }

        .login_info {
          .log_out_btn {
            color: #fdd0d4;
          }
        }

        .user_login_btn {
          margin-right: 7px;
        }

        .user_register_btn {
          margin-left: 7px;
        }
      }

      .nav_bars {
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -600px;
        height: 50px;
        line-height: 50px;

        & > ul {
          .clearFix();

          & > li {
            position: relative;
            float: left;
            width: 112px;
            text-align: center;
            font-size: 16px;

            & > a {
              width: 100%;
              height: 100%;
              color: #ffffff;
            }

            &:hover, &.active {
              & > a {
                color: #ffd800;
              }

              &:after {
                position: absolute;
                top: 46px;
                left: 50%;
                margin-left: -5px;
                content: '';
                border-bottom: 4px solid #ffd800;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: none;
              }
            }

            &:hover {
              & > .hover_nav_block, & > .hover_nav_list {
                display: block;
              }
            }

            & + li {
              &:before {
                content: '';
                display: block;
                float: left;
                width: 1px;
                height: 50px;
                background: url("~assets/images/nav_devide_line.png");
              }
            }
          }
        }

        .hover_nav_block {
          display: none;
          position: absolute;
          left: -112px;
          background-color: rgba(255, 255, 255, .9);
          .wh(1200px, 260px);
          .clearFix();
          z-index: 1000;

          ul {
            float: left;
            margin-top: 20px;
            .wh(225px, 225px);
            border-right: 1px solid #ccc;

            li {
              margin-bottom: 35px;
              line-height: 1;
              font-size: 16px;

              &:hover, &.active {
                color: @primary-color;
              }
            }
          }

          .hover_nav_desc {
            position: absolute;
            top: 0;
            right: 0;
            .wh(970px, 204px);
            padding: 28px 26px;
            .clearFix();

            p {
              float: left;
              margin-top: 20px;
              width: 587px;
              line-height: 2;
              color: #555;
              text-align: left;
              text-indent: 2em;
              font-size: 14px;
            }

            img {
              float: left;
              margin-left: 87px;
              .wh(219px, 148px);
            }
          }
        }

        .hover_nav_list {
          width: 112px;
          display: none;
          position: absolute;
          left: 0;
          .clearFix();
          z-index: 1000;

          ul {
            background: #b2000c;

            li {
              font-size: 16px;
              color: #fff;

              a {
                color: #fff;
              }

              &:hover, &.active {
                background-color: #eb6a3e;
              }
            }
          }
        }
      }
    }
  }

  .user_login_modal {

    .ivu-modal-body {
      padding: 49px 15px 15px 75px;

      .close_img {
        position: absolute;
        top: 15px;
        right: 15px;
        cursor: pointer;
      }
    }

    .user_login_container {
      position: relative;

      .user_login_form {
        float: left;
        width: 300px;

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
            .wh(300px, 1px);
            background-color: @gray-f4;
          }

          &:after {
            left: 15px;
            bottom: 0;
            .wh(30px, 2px);
            background-color: @primary-color;
          }
        }

        .form-group {
          position: relative;
          margin-top: 21px;

          .error {
            visibility: hidden;
            position: absolute;
            right: -85px;
            top: 0;
            padding: 0 8px;
            line-height: 32px;
            color: @error-color;
            opacity: 0;
            .transition();

            &.is-visible {
              visibility: visible;
              opacity: 1;
              right: 0;
              top: 0;
              .transition();
            }
          }
        }

        .checkbox {
          margin-top: 25px;
        }

        .btn {
          margin-top: 18px;
          width: 100%;
        }

        .register_block {
          margin-top: 27px;
        }
      }

      .divide_line {
        float: left;
        margin: 35px 0 0 57px;
        .wh(1px, 249px);
        background-color: @gray-f4;
      }

      .qr_code_container {
        float: left;
        padding: 0 30px;
        color: @primary-color;
        font-size: 16px;
        line-height: 1;
        text-align: center;

        .img_block {
          margin-top: 50px;
          padding: 0 15px;

          img {
            .wh(159px, 159px);
          }
        }
      }
    }
  }
</style>
