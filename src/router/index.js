import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/routes/index';
import User from '@/routes/index/user.vue';
import NotFoundComponent from '@/routes/common/404.vue';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/404', component: NotFoundComponent
        },
        {
            path: '/',
            name: 'index',
            component: Index
        },
        { path: '/user/:id', component: User },
        {
            path: '*', redirect: '/404'
        }
    ]
})
