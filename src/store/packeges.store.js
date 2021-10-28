const API_ROUTE = 'https://registry.npmjs.org'
const API_PACKEGES_MODULE = '-/v1/search'
const API_JSDELIVER = 'https://data.jsdelivr.com/v1/package/npm/'

export const PACKAGES_STORE = 'PACKAGES_STORE'

export default {
  name: PACKAGES_STORE,
  namespaced: true,
  state: () => ({
    list: [],
    total: 0,
    proccess: false,
    current: {}
  }),
  mutations: {
    fillList(state, objects) {
      state.list = objects
    },
    setCurrent(state, data) {
      state.current = data
    },
    setTotal(state, total) {
      state.total = total
    },
    setProccess(state, booleanValue) {
      state.proccess = booleanValue
    }
  },
  actions: {
    fetchAdditionalPackageData({ commit }, name) {
      commit("setProccess", true);
      fetch(API_JSDELIVER + name)
        .then((response) => {
          return response.json();
        }).then((data) => {
          commit('setCurrent', data);
          commit("setProccess", false);
        }).catch(() => { commit("setProccess", false); })
    },
    searchPackeges({ commit }, { searchValue = "", limit = 10, page }) {
      commit("setProccess", true);
      const from = ((page - 1) * limit) + 1;
      fetch(`${API_ROUTE}/${API_PACKEGES_MODULE}?text=${searchValue}&size=${limit}&from=${from}`)
        .then((response) => {
          return response.json()
        }).then((data) => {
          commit("setProccess", false);
          commit('setTotal', data.total);
          commit('fillList', data.objects);
        }).catch(() => { commit("setProccess", false); })
    }
  },
}
