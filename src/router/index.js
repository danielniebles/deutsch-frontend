import Vue from 'vue'
import VueRouter from 'vue-router'
import ViewAllVerbs from '../components/verbs/ViewAllVerbs.vue'
import ViewVerb from '../components/verbs/ViewVerb.vue'
import AddVerb from '../components/verbs/AddVerb.vue'
import ViewAllNouns from '../components/nouns/ViewAllNouns.vue'
import AddNoun from '../components/nouns/AddNoun.vue'
import Grid from '../views/Grid.vue'

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
    path: '/verbs/addverb',
    name: 'add-verb',
    component: AddVerb
  },
  {
    path: '/verbs/addnoun',
    name: 'add-noun',
    component: AddNoun
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
