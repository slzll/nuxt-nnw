<template>
  <div class="successful_case container_24 mar_top_20">
    <ModuleTitle name="成功案例" ename="SUCCESSFUL CASE" :link-url="{name: 'successfulCase'}"/>
    <ul class="successful_case_list">
      <li class="case_item" v-for="item in listData" :key="item.Id">
        <nuxt-link :to="{name: 'articleDetail', query: {Id: item.Id}}" :title="item.Name" target="_blank">
          <img :src="imgPath+'/'+item.Img" :title="item.Name" v-err-src :alt="item.Name">
          <p>{{item.Name}}</p>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import ModuleTitle from './ModuleTitle'

  export default {
    name: 'SuccessfulCase',
    components: { ModuleTitle },
    props: {
      listData: { type: Array },
      imgPath: { type: String }
    }
  }
</script>

<style scoped>

</style>
