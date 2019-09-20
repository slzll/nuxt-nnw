<template>
  <div class="module_title">
    <span class="module_name">{{name}}</span>
    <span class="module_name_en">&nbsp;/&nbsp;{{ename}}</span>
    <nuxt-link v-if="showMore" class="more" :to="linkUrl">
      <img src="~/assets/images/more.png" alt="更多">
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    name: 'ModuleTitle',
    props: {
      name: { type: String },
      ename: { type: String },
      showMore: { type: Boolean, default: true },
      linkUrl: { type: [Object, String], default: () => ({}) }
    }
  }
</script>

<style scoped>

</style>
