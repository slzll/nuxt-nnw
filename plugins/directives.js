import Vue from 'vue'
import noPhoto from '~/assets/images/notFound.jpeg'

Vue.directive('err-src', {
  bind (el, binding, vnode, oldVnode) {
    if (!el.src) {
      el.src = binding.value || noPhoto
    }
    el.onerror = (e) => {
      el.src = binding.value || noPhoto
    }
  },
  update (el, binding) {
    if (!el.src) {
      el.src = binding.value || noPhoto
    }
  }
})
