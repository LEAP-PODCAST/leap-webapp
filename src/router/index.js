import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "@/routes/Home";
import Room from "@/routes/Room";
import SignUp from "@/routes/SignUp";

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/signup",
      name: "Sign Up",
      component: SignUp
    },
    {
      path: "/:roomId",
      name: "Room",
      component: Room
    }
  ]
});
