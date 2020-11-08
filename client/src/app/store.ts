import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { User } from '@/models/User'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    woods: [],
    users: []
  },
  getters: {
    USERS: state => {
      return state.users
    },
    WOODS: state => {
      return state.woods
    }
  },
  mutations: {
    SET_WOOD: (state, payload) => {
      state.woods = payload
    },
    ADD_WOOD: (state, payload) => {
      // @ts-ignore
      state.woods.push(payload)
    },
    SET_USER: (state, payload) => {
      state.users = payload
    },
    ADD_USER: (state, payload) => {
      // @ts-ignore
      state.users.push(payload)
    },
    PUT_USER: (state, payload) => {
      // @ts-ignore
      const i = state.users.findIndex(element => element._id === payload._id)
      console.log(i)
      console.log(payload)
      // @ts-ignore
      state.users[i] = payload
      console.log(state.users[i])
    },
    DELETE_USER: (state, payload) => {
      console.log(payload)
      // @ts-ignore
      const i = state.users.findIndex(element => element._id === payload.documentKey._id)
      console.log(i)
      // @ts-ignore
      state.users.splice(i, 1)
    }
  },
  actions: {
    SET_WOOD: async (context, payload) => {
      const { data } = await Axios.get('http://localhost:5000/wood')
      context.commit('SET_WOOD', data)
    },
    ADD_WOOD: async (context, payload) => {
      context.commit('ADD_WOOD', payload)
    }
  },
  modules: {
  }
})
