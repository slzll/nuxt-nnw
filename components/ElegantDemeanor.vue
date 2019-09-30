<template>
  <div class="elegant_demeanor container_24">
    <ModuleTitle name="名师风采" ename="ELEGANT DEMEANOR" :link-url="{name: 'elegantDemeanor'}"/>
    <ul class="teacher_list">
      <li class="teacher_item" v-for="item in teacherList" :key="item.Id">
        <nuxt-link :to="{name:'newsDetail',query: {Id: item.Id}}" target="_blank">
          <div class="img_block">
            <img :src="imgPath+'/'+item.Img" :title="item.Name" v-err-src :alt="item.Name">
          </div>
          <div class="teacher_info">
            <div class="teacher_name">{{item.Name}}</div>
            <div class="teacher_business">{{item.Description||'无'}}</div>
            <div class="line"></div>
            <div class="teacher_course">
              <p>代表课程：</p>
              <ul>
                <li>{{item.Keywords | wordLimit(55)}}</li>
              </ul>
            </div>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import ModuleTitle from './ModuleTitle'

  export default {
    name: 'ElegantDemeanor',
    components: { ModuleTitle },
    props: {
      teacherList: { type: Array },
      imgPath: { type: String }
    }
  }
</script>

<style scoped>

</style>
