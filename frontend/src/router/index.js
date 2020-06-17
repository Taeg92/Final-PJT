import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MovieDetail from "../views/MovieDetail.vue";
import Signup from "../views/accounts/Signup.vue";
import Login from "../views/accounts/Login.vue";
import Logout from "../views/accounts/Logout.vue";
import Reviews from "../views/Reviews.vue";
import ReviewDelete from "../views/ReviewDelete.vue";
import ReviewCreate from "../views/ReviewCreate.vue";
import ReviewEdit from "../views/ReviewEdit.vue";
import CommentCreate from "../views/CommentCreate.vue";
import CommentEdit from "../views/CommentEdit.vue";
import CommentDelete from "../views/CommentDelete.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/movies/:moviePK(\\d+)/reviews/create",
    name: "ReviewCreate",
    component: ReviewCreate,
  },
  {
    path:
      "/movies/:moviePK(\\d+)/reviews/:reviewPK(\\d+)/delete",
    name: "ReviewDelete",
    component: ReviewDelete,
  },
  {
    path:
      "/movies/:moviePK(\\d+)/reviews/:reviewPK(\\d+)/Edit",
    name: "ReviewEdit",
    component: ReviewEdit,
  },
  {
    path: "/movies/:moviePK(\\d+)/reviews/:reviewPK(\\d+)",
    name: "ReviewDetail",
    component: MovieDetail,
  },
  {
    path: "/movies/:moviePK(\\d+)/reviews",
    name: "MovieReviews",
    component: MovieDetail,
  },
  {
    path: "/movies/:moviePK(\\d+)",
    name: "MovieDetail",
    component: MovieDetail,
  },
  {
    path: "/reviews",
    name: "Reviews",
    component: Reviews,
  },
  {
    path:
      "/comments/create/movie/:moviePK/review/:reviewPK",
    name: "CommentCreate",
    component: CommentCreate,
  },
  {
    path: "/comment/1/edit",
    name: "CommentEdit",
    component: CommentEdit,
  },
  {
    path: "/comment/:commentPK(\\d+)/delete",
    name: "CommentDelete",
    component: CommentDelete,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
];

const router = new VueRouter({
  routes,
});

export default router;
