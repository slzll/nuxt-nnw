import Vue from 'vue'
import dateFilters from './dateFilter'
import filters from './filter'

const vueFiltersDate = {
  install: function (Vue, options) {
    Object.keys(dateFilters).forEach(name => {
      Vue.filter(name, dateFilters[name])
    })
    Object.keys(filters).forEach(name => {
      Vue.filter(name, filters[name])
    })
  }
}

Vue.use(vueFiltersDate)
