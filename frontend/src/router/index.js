import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/movies/Home.vue";
import MoviesAll from "../views/movies/MoviesAll.vue";
import MovieDetail from "../views/MovieDetail.vue";
import Signup from "../views/accounts/Signup.vue";
import Login from "../views/accounts/Login.vue";
import Logout from "../views/accounts/Logout.vue";
import ReviewDelete from "../views/ReviewDelete.vue";
import ReviewCreate from "../views/ReviewCreate.vue";
import ReviewEdit from "../views/ReviewEdit.vue";
import CommentCreate from "../views/CommentCreate.vue";
import CommentEdit from "../views/CommentEdit.vue";
import CommentDelete from "../views/CommentDelete.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "Home" },
  },
  {
    path: "/movies/recommend",
    name: "Home",
    component: Home,
  },
  {
    path: "/movies/all",
    name: "MoviesAll",
    component: MoviesAll,
  },
  {
    path: "/movies/:moviePK(\\d+)",
    name: "MovieDetail",
    component: MovieDetail,
  },
  {
    path: "/movies/:moviePK(\\d+)/reviews",
    name: "MovieReviews",
    component: MovieDetail,
  },
  {
    path: "/movies/:moviePK(\\d+)/reviews/:reviewPK(\\d+)",
    name: "ReviewDetail",
    component: MovieDetail,
  },
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
      "/movies/:moviePK(\\d+)/reviews/:reviewPK(\\d+)/edit",
    name: "ReviewEdit",
    component: ReviewEdit,
  },
  {
    path:
      "/comments/create/movie/:moviePK/review/:reviewPK",
    name: "CommentCreate",
    component: CommentCreate,
  },
  {
    path: "/comment/1/edit/movie/:moviePK/review/:reviewPK",
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
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
];

const router = new VueRouter({
  // mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = [
    "Home",
    "MoviesAll",
    "MovieDetail",
    "MovieReviews",
    "ReviewDetail",
    "Signup",
    "Login",
  ];
  const authPages = ["Signup", "Login"];

  const authRequired = !publicPages.includes(to.name); // 로그인 해야 함.
  const unauthRequired = authPages.includes(to.name); // 로그인 해서는 안됨
  const isLoggedIn = !!Vue.$cookies.isKey("auth-token");

  if (unauthRequired && isLoggedIn) {
    next("/");
  }
  authRequired && !isLoggedIn
    ? next({ name: "Login" })
    : next();
});

export default router;
