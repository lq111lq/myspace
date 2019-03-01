// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'codemirror'
import 'codemirror/mode/javascript/javascript'

import 'normalize.css'
import 'animate.css'
import '@/assets/index.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/darcula.css'
import CodeMirrorComponent from '@/components/common/CodeMirror.vue'

Vue.config.productionTip = false
Vue.component('CodeMirror', CodeMirrorComponent)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
