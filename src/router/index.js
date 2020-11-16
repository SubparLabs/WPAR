import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import FourOhFour from '../views/FourOhFour.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '*',
    component: FourOhFour
  }
];

const router = new VueRouter({
  mode: 'history',
  /* eslint-disable-next-line no-undef */
  base: process.env.BASE_URL,
  routes
});

export default router;
