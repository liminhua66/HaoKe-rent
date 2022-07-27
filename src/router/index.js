import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from "@/views/Home";
import List from "@/views/List";
import News from "@/views/News";
import Profile from "@/views/Profile";
import Map from "@/views/Map";
import City from "@/views/City";
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: 'list',
                    component: List,
                },
                {
                    path: 'news',
                    component: News,
                },
                {
                    path: 'profile',
                    component: Profile,
                }
            ]
        },
        {
            path: 'map',
            component: Map,
        },
        {
            path: 'city',
            component: City,
        },
    ]
})

export default router