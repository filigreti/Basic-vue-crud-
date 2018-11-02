import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import addAnime from '@/components/addAnime'
import editanime from '@/components/editanime'

Vue.use(Router)
 
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-anime',
      name: 'addAnime',
      component: addAnime
    },
    {
      path: '/edit-anime/:anime_slug',
      name: 'editanime',
      component: editanime
    }
  ]
})
