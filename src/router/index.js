import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CurrentUser from '../pages/CurrentUser'
import HelloPage from '../pages/HelloPage'
import AddUserForm from '../components/AddUserForm'
import EditUserPage from '../pages/EditUserPage'

Vue.use(VueRouter);


const routes = [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/current-user/:user_id',
    name: 'CurrentUser',
    component: CurrentUser
  },
  {
    path: '/hello-page',
    name: 'HelloPage',
    component: HelloPage
  },
  {
    path: '/add-user/new',
    name: 'AddUserForm',
    component: AddUserForm
    
},
{
    path: '/add-user/:user_id',
    name: 'UpdateUserForm',
    component: AddUserForm
    
},
{
  path: '/edit-user-page',
  name: 'EditUserPage',
  component: EditUserPage
  
},
]


const router = new VueRouter({
  mode: "history",
  routes
})

export default router
