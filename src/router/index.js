import Vue from 'vue'
import VueRouter from 'vue-router'
import ViewAllVerbs from '../components/verbs/ViewAllVerbs.vue'
import ViewVerb from '../components/verbs/ViewVerb.vue'
import AddVerb from '../components/verbs/AddVerb.vue'
import ViewAllNouns from '../components/nouns/ViewAllNouns.vue'
import AddAdj from '../components/adjectives/AddAdj.vue'
import ViewAllAdjs from '../components/adjectives/ViewAllAdj.vue'
import AddNoun from '../components/nouns/AddNoun.vue'
//import Grid1 from '../components/exercise/InputArticle.vue'
import Grid from '../views/Grid.vue'
import Exercise from '../components/exercise/Exercise.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/verbs/all',
    name: 'view-all-verbs',
    component: ViewAllVerbs
  },
  {
    path: '/nouns/all',
    name: 'view-all-nouns',
    component: ViewAllNouns
  },
  {
    path: '/adjs/all',
    name: 'view-all-adjs',
    component: ViewAllAdjs
  },
  {
    path: '/verbs/addverb',
    name: 'add-verb',
    component: AddVerb
  },
  {
    path: '/nouns/addnoun',
    name: 'add-noun',
    component: AddNoun
  },
  {
    path: '/adj/addadj',
    name: 'add-adj',
    component: AddAdj
  },
  {
    path: '/verbs/:docId',
    name: 'view-verb',
    component: ViewVerb
  },
  {
    path: '/',
    name: 'grid',
    component: Grid
  },
  {
    path: '/exercise',
    name: 'exercise',
    component: Exercise
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
