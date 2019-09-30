<template>
  <div class="teaching_module container_24 mar_top_20">
    <ModuleTitle name="精品教学模块" ename="BOUTIQUE TEACHING MODULE"
                 :link-url="{name: 'article', query: {categoryCode: '精品教学模块'}}"/>
    <div class="teaching_module_carousel">
      <div class="carousel_list" v-swiper:mySwiper="options">
        <div class="swiper-wrapper">
          <div class="carousel_item swiper-slide" v-for="item in listData" :key="item.Id">
            <nuxt-link :to="{name: 'newsDetail', query: {Id: item.Id}}" target="_blank">
              <img :src="imgPath+'/'+item.Img" :title="item.Name" v-err-src :alt="item.Name">
              <p>{{item.Name}}</p>
            </nuxt-link>
          </div>
        </div>
        <img class="swiper-left-button left" src="~/assets/images/left.png" slot="button-prev">
        <img class="swiper-right-button right" src="~/assets/images/right.png" slot="button-next">
      </div>
    </div>
  </div>
</template>

<script>
  import ModuleTitle from './ModuleTitle'

  export default {
    name: 'TeachingModule',
    components: { ModuleTitle },
    props: {
      listData: {
        type: Array
      },
      imgPath: {
        type: String
      }
    },
    data () {
      return {
        isBrowser: process.browser,
        options: {
          slidesPerView: 4,
          spaceBetween: 20,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          loop: true,
          navigation: {
            nextEl: '.swiper-right-button',
            prevEl: '.swiper-left-button'
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
