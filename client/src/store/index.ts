import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    woods : null,
    handle : ""
  },
  getters : {
    WOODS : state => {
      return state.woods
    },
    HANDLE : state => {
      return state.handle
    }
  },
  mutations: {
    SET_WOOD : (state,payload) => {
      state.woods = payload;
    },
    ADD_WOOD : (state,payload) => {
      // @ts-ignore
      state.woods.push(payload);
    },
    SET_HANDLE : (state,payload) => {
      state.handle = payload;
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
    },
    SET_HANDLE : (context,payload)=> {
      context.commit("SET_HANDLE",payload);
    }
  },
  modules: {
  }
})
