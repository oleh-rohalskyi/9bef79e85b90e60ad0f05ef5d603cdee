import Vue from 'vue'
import Vuex from 'vuex'
import packegesStore, { PACKAGES_STORE } from '@/store/packeges.store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    [PACKAGES_STORE]: packegesStore
  }
})
