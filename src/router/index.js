import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Tournament from "../views/Tournament.vue";
import Leaderboard from "../views/Leaderboard.vue";
import LeaderboardDetail from "../views/LeaderboardDetail.vue";
import Setting from "../views/Setting.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Verify from "../views/Verify.vue";
import ForgetPassword from "../views/ForgetPassword.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/tournament",
    name: "Tournament",
    component: Tournament,
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    component: Leaderboard,
  },
  {
    path: "/setting",
    name: "Setting",
    component: Setting,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/forget-password",
    name: "Forget Password",
    component: ForgetPassword,
  },
  {
    path: "/verify",
    name: "Verify",
    component: Verify,
  },
  {
    name: "leaderboard_detail",
    path: "/leaderboard/:id/:gw",
    component: LeaderboardDetail,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
