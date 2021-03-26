import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "@/routes/Home";
import Room from "@/routes/Room";
import SignUp from "@/routes/SignUp";
import LogIn from "@/routes/LogIn";

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
      path: "/login",
      name: "Log In",
      component: LogIn
    },
    {
      path: "/room/:roomId",
      name: "Room",
      component: Room
    }
  ]
});

// user: /user/username
// podcast /:podcastName or /podcast/:podcastName
// Episode /:podcastName/:episodeName
