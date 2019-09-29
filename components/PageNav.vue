<template>
  <div class="header">
    <img :src="logo" alt="">
    <div class="header_nav">
      <span>您所在的位置：</span>
      <nuxt-link to="/"><img src="~/assets/images/shouye.png" alt="">首页</nuxt-link>
      <span>-></span>
      <span class="active">{{current}}</span>
    </div>
    <div v-if="showDivide" class="header_divide_line"></div>
  </div>
</template>

<script>
  export default {
    name: 'PageNav',
    props: {
      logo: { type: String },
      current: { type: String },
      showDivide: { type: Boolean, default: false }
    }
  }
</script>

<style lang="less">
  @import "~assets/styles/mixins";

  .header {

    .header_nav {
      float: right;
      line-height: 76px;

      img {
        margin-top: -2px;
        margin-right: 4px;
      }

      .active {
        color: @primary-color;
      }
    }
  }

  .header_divide_line {
    margin-top: 19px;
    position: relative;
    .wh(100%, 2px);
    background-color: @gray-f4;

    &:after {
      content: "";
      display: block;
      position: absolute;
      .wh(221px, 4px);
      background-color: @primary-color;
      top: -1px;
      left: 0;
    }
  }
</style>
