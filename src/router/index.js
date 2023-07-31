import { createRouter, createWebHashHistory } from 'vue-router';
import toyApp from '../views/toy-app.vue';
import toyDetails from '../views/toy-details.vue';
import toyEdit from '../views/toy-edit.vue';
import home from '../views/home.vue';
import dashboard from '../views/dashboard.vue';
import about from '../views/about.vue';
import loginPage from '@/views/login-page.vue';
import signupPage from '@/views/signup-page.vue';
import userDetails from '@/views/user-details.vue';
import reviewPage from '@/views/review-page.vue';

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/toy',
      name: 'toy-app',
      component: toyApp,
    },
    {
      path: '/toy/:_id',
      name: 'toy-details',
      component: toyDetails,
    },
    {
      path: '/toy/edit/:id?',
      name: 'toy-edit',
      component: toyEdit,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
    },
    {
      path: '/login',
      name: 'login-page',
      component: loginPage,
    },
    {
      path: '/signup',
      name: 'signup-page',
      component: signupPage,
    },
    {
      path: '/user',
      name: 'user-details',
      component: userDetails,
    },
    {
      path: '/about',
      name: 'about',
      component: about,
    },
    {
      path: '/review',
      name: 'review-page',
      component: reviewPage,
    },
  ],
});

export default router;
