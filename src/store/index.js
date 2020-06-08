import Vue from 'vue'
import Vuex from 'vuex'
import { Api } from "../utilities/Api";

Vue.use(Vuex)

export default new Vuex.Store({
  
  state: {
    exercise: [],
    currentQuestion: null
  },
  mutations: {
    pushExercise: (state, payload) => {
      payload.data.data.forEach(element => {
        state.exercise.push(element)
      });
    },
    pushNewRandom(state, payload){
      state.currentQuestion = payload
    },
    setProperty(state, payload){
      state.exercise[payload.position][payload.prop] = payload.value
    },
    updateStateProp(state, payload){
      state[payload.prop] = payload.value
    }

  },
  actions: {
    async getExercise({ commit }){
      commit('pushExercise', await Api().get("/exercise/verbs"))
    },
    newRandomQuestion( {commit, getters}) {
      const dummyVar = getters.getUnanswered
      commit('pushNewRandom', dummyVar[Math.floor(Math.random() * dummyVar.length)])
    },
    markAnswered({ commit }, options){
      commit('setProperty', options)
    }
  },
  getters: {
    getUnanswered(state){
      return state.exercise.filter(question => question.answered === false)
    },
    getRemaining(state){
      return state.exercise.filter(question => question.answered === false).length
    }
  },
  modules: {
  }
})
