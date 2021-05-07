import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "@/routes/Home";
import Room from "@/routes/Room";
import SignUp from "@/routes/SignUp";
import LogIn from "@/routes/LogIn";
import Episode from "@/routes/podcast/Episode";
import PasswordReset from "@/routes/PasswordReset";
import GuestLogin from "@/routes/GuestLogin";
import NewPassword from "@/routes/NewPassword";
import PageNotFound from "@/routes/PageNotFound"

export default new VueRouter({
  mode: "history",
  routes: [
    // {
    //   path: "/",
    //   name: "Home",
    //   component: Home
    // },
    // {
    //   path: "/signup",
    //   name: "Sign Up",
    //   component: SignUp
    // },
    // {
    //   path: "/login",
    //   name: "Log In",
    //   component: LogIn
    // },
    // {
    //   path: "/passwordreset",
    //   name: "Password Reset",
    //   component: PasswordReset
    // },
    // {
    //   path: "/newpassword",
    //   name: "New Password",
    //   component: NewPassword
    // },
    // {
    //   path: "/guestlogin",
    //   name: "Guest Login",
    //   component: GuestLogin
    // },
    // {
    //   path: "/room/:roomId",
    //   name: "Room",
    //   component: Room
    // },
    // {
    //   path: "/:podcastUrlName/:episodeUrlName",
    //   name: "Podcast episode",
    //   component: Episode
    // },
    // {
    //   path: "*",
    //   name: "Page Not Found",
    //   component: PageNotFound
    // }
  ]
});

// user: /user/username
// podcast /:podcastName or /podcast/:podcastName
// Episode /:podcastName/:episodeName
