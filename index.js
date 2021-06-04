import imageZoomer from './src/Index.vue'

const duoImageZoomer = {
  install: Vue => {
    Vue.component('duo-image-zoomer', imageZoomer)
  }
}

export default duoImageZoomer