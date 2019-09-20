<template>
  <div class="beautiful_nanniwan container_24">
    <ModuleTitle name="走进南泥湾" ename="NANNIWAN SCENERY"/>
    <div class="beautiful_nanniwan_container">
      <div class="img_shown_block"
           v-for="item in listData"
           :key="item.Id"
           v-if="activeId === item.Id"
      >
        <img v-if="!item.isVideo" :src="imgPath+'/'+item.Img" v-err-src :alt="item.Name">
        <video v-else :src="item.Video" :poster="item.Img" controls></video>
      </div>
      <div class="img_thumb_list_container" v-swiper:mySwiper="options">
        <div class="control_btn control_up">
          <img src="~/assets/images/arrow-up-grey.png" alt=""/>
        </div>
        <!--<div class="list_container">-->
        <ul class="img_thumb_list swiper-wrapper">
          <li class="img_thumb_item swiper-slide"
              v-for="item in listData"
              :key="item.Id"
              :class="{active: activeId === item.Id}"
              @click="changeActiveId(item)"
              :data-info="item"
          >
            <img v-if="!item.isVideo" :src="imgPath+'/'+item.Img" v-err-src :alt="item.Name">
            <img v-else :src="item.Img" v-err-src :alt="item.Name">
            <div class="item_info">
              <div class="name">{{item.Name}}</div>
              <div class="desc">{{item.Description||'无'}}</div>
            </div>
          </li>
        </ul>
        <!--</div>-->
        <div class="control_btn control_down">
          <img src="~/assets/images/arrow-down-grey.png" alt=""/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ModuleTitle from './ModuleTitle'

  export default {
    name: 'BeautifulNnw',
    components: { ModuleTitle },
    props: {
      listData: { type: Array },
      imgPath: { type: String }
    },
    data () {
      return {
        activeId: 0,
        options: {
          direction: 'vertical',
          slidesPerView: 3,
          spaceBetween: 0,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          // loop: true,
          navigation: {
            nextEl: '.control_btn.control_up',
            prevEl: '.control_btn.control_down'
          }
        }
      }
    },
    created () {
      this.activeId = this.listData[0].Id
    },
    methods: {
      changeActiveId (item) {
        this.activeId = item.Id
      }
    }
  }
</script>

<style scoped>

</style>
