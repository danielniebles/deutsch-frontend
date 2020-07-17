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
      state.exercise.length = 0
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
    },
    cleanExercise(state){
      state.exercise.length = 0
      state.currentQuestion = null
    }

  },
  actions: {
    async getExercise({ commit }, options){
      const url = `/exercise/${options}`
      console.log(url)
      commit('pushExercise', await Api().get(url))
    },
    newRandomQuestion( {commit, getters}) {
      const dummyVar = getters.getUnanswered
      commit('pushNewRandom', dummyVar[Math.floor(Math.random() * dummyVar.length)])
    },
    markAnswered({ commit }, options){
      commit('setProperty', options)
    },
    changeStatus({ commit }, options){
      commit('setProperty', options)
    }
  },
  getters: {
    getUnanswered(state){
      return state.exercise.filter(question => question.answered === false)
    },
    getAnsweredCount(state){
      return state.exercise.filter(question => question.answered === true).length
    },
    getRemaining(state){
      return state.exercise.filter(question => question.answered === false).length
    },
    getCorrectCount(state){
      console.log("Correctas:", state.exercise.filter(question => question.correct === true).length)
      return state.exercise.filter(question => question.correct === true).length
    }
  },
  modules: {
  }
})
