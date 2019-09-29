<template>
  <div class="teaching_plan_container">
    <div class="container_24">
      <div>
        <img class="teaching_plan_img" src="~/assets/images/teaching_plan.png" alt="">
        <ul class="plan_list">
          <li class="plan_item"
              v-for="(item,index) in navigation"
              :key="item.Id"
              :class="{active: activePlanId === item.Id}"
              :id="'plan'+(index+1)"
          >
            <a @click="getPlanData(item)">
              <div class="plan_item_img_block">
                <img :src="item.img" :title="item.text" :alt="item.text">
              </div>
              <p>{{item.text}}</p>
            </a>
          </li>
        </ul>
      </div>
      <div>
        <img class="teaching_plan_line" src="~/assets/images/teaching_plan_line.png" alt="">
      </div>
      <div>
        <ul class="plan_data_list">
          <li class="plan_data_item" v-for="item in listData" :key="item.Id">
            <nuxt-link :to="{name: 'trainSchedule', query: {Id: item.Id}}" target="_blank">
              {{item.Name}}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { TeachClassList } from '../service/api'

  export default {
    name: 'TeachingPlan',
    data () {
      return {
        activePlanId: 5,
        listData: [],
        navigation: [
          { Id: 5, img: require('~/assets/images/mock_img/teaching_plan_1.png'), text: '常规教学方案' },
          { Id: 6, img: require('~/assets/images/mock_img/teaching_plan_2.png'), text: '企业培训方案' },
          { Id: 7, img: require('~/assets/images/mock_img/teaching_plan_3.png'), text: '青少年教育方案' },
          { Id: 8, img: require('~/assets/images/mock_img/teaching_plan_4.png'), text: '老年教育方案' }
        ]
      }
    },
    watch: {
      '$route' () {
        const { hash } = this.$route
        if (hash) {
          const index = /plan(\d)/.exec(hash)[1] || 1
          this.getPlanData(this.navigation[index - 1])
        }
      }
    },
    mounted () {
      const { hash } = this.$route
      let index = hash ? /plan(\d)/.exec(hash)[1] || 1 : 1
      this.getPlanData(this.navigation[index - 1])
    },
    methods: {
      async getPlanData (item) {
        this.activePlanId = item.Id
        if (item.Id === 5) {
          let res = await TeachClassList({ TrainingTypeId: item.Id })
          this.listData = res.Data.ListData
        }
      }
    }
  }
</script>

<style scoped>

</style>
