import Vue from 'vue'
import notFound from '~/assets/images/notFound.jpeg'

Vue.directive('err-src', {
  inserted: el => {
  },
  bind (el, binding, vnode, oldVnode) {
    el.onerror = () => {
      el.src = binding.value || notFound
    }
  }
})
