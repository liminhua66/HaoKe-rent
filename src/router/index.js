import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Home from "@/views/Home";
import List from "@/views/List";
import News from "@/views/News";
import Profile from "@/views/Profile";
import Map from "@/views/Map";
import City from "@/views/City";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Favorate from "@/views/Favorate";
import Rent from "@/views/Rent";

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写 push及replace方法
// 考虑需要传递哪些参数 （1）需接受原来push方法的所有参数（2）要保持this指向不变
// call和apply的异同点
// 相同点 (1)均能改变this指向(2)均会调用函数一次
// 不同点 (2)call方法传递参数使用逗号隔开，apply使用数组传递参数
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: Home,
      meta: { show: true },
      children: [
        {
          path: "list",
          component: List,
          name: "List",
          meta: { show: false },
        },
        {
          path: "news",
          component: News,
          meta: { show: false },
        },
        {
          path: "profile",
          component: Profile,
          meta: { show: false },
        },
      ],
    },
    {
      path: "/map",
      component: Map,
      name: "Map",
      meta: { show: false },
    },
    {
      path: "/city",
      component: City,
      name: "City",
      meta: { show: false },
    },
    {
      path: "/login",
      component: Login,
      name: "Login",
      meta: { show: false },
    },
    {
      path: "/register",
      component: Register,
      name: "Register",
      meta: { show: false },
    },
    {
      path: "/favorate",
      component: Favorate,
      name: "Favorate",
      meta: { show: false },
    },
    {
      path: "/rent",
      component: Rent,
      name: "Rent",
      meta: { show: false },
    },
  ],
});

export default router;
