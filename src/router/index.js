import Vue from 'vue'
import VueRouter from 'vue-router'
import ViewAllVerbs from '@/components/ViewAllVerbs.vue'
import ViewVerb from '@/components/ViewVerb.vue'
import AddVerb from '@/components/AddVerb.vue'
import Grid from '@/views/Grid.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/verbs/all',
    name: 'view-all-verbs',
    component: ViewAllVerbs
  },
  {
    path: '/verbs/addverb',
    name: 'add-verb',
    component: AddVerb
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
