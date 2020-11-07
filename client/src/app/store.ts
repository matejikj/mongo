import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    woods : null
  },
  getters : {
    WOODS : state => {
      return state.woods
    }
  },
  mutations: {
    SET_WOOD : (state,payload) => {
      state.woods = payload;
    },
    ADD_WOOD : (state,payload) => {
      // @ts-ignore
      state.woods.push(payload);
    }
  },
  actions: {
    SET_WOOD : async (context,payload) => {
      let {data} = await Axios.get('http://localhost:8081/wood');
      console.log(data);
      context.commit("SET_WOOD",data);
    },
    ADD_WOOD : (context,payload)=> {
      context.commit("ADD_WOOD",payload);
    }
  },
  modules: {
  },
})
