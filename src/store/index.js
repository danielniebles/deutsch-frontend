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
    }
  },
  actions: {
    async getExercise({ commit }){
      commit('pushExercise', await Api().get("/exercise/verbs"))
    },
    newRandomQuestion( {commit, getters}) {
      const dummyVar = getters.getUnanswered
      commit('pushNewRandom', dummyVar[Math.floor(Math.random() * dummyVar.length)])
    }
  },
  getters: {
    getUnanswered(state){
      return state.exercise.filter(question => question.answered === null)
    }
  },
  modules: {
  }
})
